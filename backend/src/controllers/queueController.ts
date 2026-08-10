import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { classifyCategoryAndScore } from '../services/triageEngine';
import { generateTicketNumber, recalculateQueuePositions } from '../services/queueEngine';
import { findAndAssignRoom } from '../services/roomAllocationService';
import { createNotification } from '../services/notificationService';
import { emitQueueUpdate, emitTicketCalled } from '../sockets/queueSocket';

const prisma = new PrismaClient();

export async function getLiveQueue(req: AuthRequest, res: Response) {
  try {
    const tickets = await prisma.queueTicket.findMany({
      include: {
        department: true,
        doctor: { include: { user: true } },
        room: true,
      },
      orderBy: [
        { priorityScore: 'desc' },
        { createdAt: 'asc' },
      ],
    });

    return res.json({ tickets });
  } catch (err: any) {
    console.error('getLiveQueue error:', err);
    return res.status(500).json({ error: 'Failed to fetch live queue' });
  }
}

export async function getMyTicket(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const ticket = await prisma.queueTicket.findFirst({
      where: {
        patientId: req.user.id,
        status: { in: ['WAITING', 'CALLED', 'IN_CONSULTATION'] },
      },
      include: {
        department: true,
        doctor: { include: { user: true } },
        room: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ ticket: ticket || null });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch ticket' });
  }
}

export async function bookTicket(req: AuthRequest, res: Response) {
  try {
    const { symptoms, categoryOverride, departmentId, patientAge, patientNameOverride } = req.body;
    const userId = req.user?.id || 'walkin-patient';
    const patientName = patientNameOverride || req.user?.name || 'Walk-in Patient';

    if (!symptoms) {
      return res.status(400).json({ error: 'Symptoms description is required' });
    }

    // 1. Get default department if not provided
    let deptId = departmentId;
    if (!deptId) {
      const defaultDept = await prisma.department.findFirst();
      deptId = defaultDept?.id || '';
    }

    // 2. Perform Smart Triage Classification
    let triage = classifyCategoryAndScore(symptoms, patientAge);
    if (categoryOverride && ['EMERGENCY', 'URGENT', 'PRIORITY', 'GENERAL'].includes(categoryOverride)) {
      triage.category = categoryOverride;
    }

    // 3. Find matching room & doctor
    const { room, doctor } = await findAndAssignRoom(triage.category, deptId);

    // 4. Generate Ticket Number (e.g., E-002)
    const ticketNumber = await generateTicketNumber(triage.category);

    // 5. Create Ticket in DB
    const newTicket = await prisma.queueTicket.create({
      data: {
        ticketNumber,
        patientId: userId,
        patientName,
        patientAge: patientAge ? parseInt(patientAge) : undefined,
        category: triage.category,
        symptoms,
        priorityScore: triage.score,
        status: 'WAITING',
        departmentId: deptId,
        doctorId: doctor?.id,
        roomId: room?.id,
        estimatedWaitMinutes: 15,
        positionInLine: 1,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticketNumber)}`,
      },
      include: {
        department: true,
        doctor: { include: { user: true } },
        room: true,
      },
    });

    // 6. Recalculate whole queue positions & wait times dynamically
    const updatedQueue = await recalculateQueuePositions();

    // 7. Notify patient & emit socket updates
    await createNotification(
      userId,
      `Ticket ${ticketNumber} Issued`,
      `Your ticket ${ticketNumber} (${triage.category}) has been issued. Assigned Room: ${room?.number || 'Pending'}.`,
      triage.category === 'EMERGENCY' ? 'EMERGENCY' : 'INFO'
    );

    emitQueueUpdate(updatedQueue);

    return res.status(201).json({
      message: 'Queue ticket generated successfully',
      ticket: newTicket,
      updatedQueue,
    });
  } catch (err: any) {
    console.error('bookTicket error:', err);
    return res.status(500).json({ error: 'Failed to create queue ticket' });
  }
}

export async function callTicket(req: AuthRequest, res: Response) {
  try {
    const { ticketId, roomId, doctorId } = req.body;

    const ticket = await prisma.queueTicket.findUnique({
      where: { id: ticketId },
      include: { room: true, doctor: { include: { user: true } } },
    });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const updatedTicket = await prisma.queueTicket.update({
      where: { id: ticketId },
      data: {
        status: 'CALLED',
        calledAt: new Date(),
        roomId: roomId || ticket.roomId,
        doctorId: doctorId || ticket.doctorId,
      },
      include: {
        department: true,
        doctor: { include: { user: true } },
        room: true,
      },
    });

    const updatedQueue = await recalculateQueuePositions();

    await createNotification(
      ticket.patientId,
      `Ticket ${ticket.ticketNumber} Called!`,
      `Please proceed to Room ${updatedTicket.room?.number || '101'} immediately. Doctor is ready.`,
      'SUCCESS'
    );

    emitTicketCalled(updatedTicket);
    emitQueueUpdate(updatedQueue);

    return res.json({ message: 'Ticket called', ticket: updatedTicket });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to call ticket' });
  }
}

export async function completeConsultation(req: AuthRequest, res: Response) {
  try {
    const { ticketId } = req.body;

    const ticket = await prisma.queueTicket.update({
      where: { id: ticketId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
      include: { room: true },
    });

    if (ticket.roomId) {
      await prisma.room.update({
        where: { id: ticket.roomId },
        data: { status: 'AVAILABLE' },
      });
    }

    const updatedQueue = await recalculateQueuePositions();

    await createNotification(
      ticket.patientId,
      'Consultation Completed',
      `Your consultation for ticket ${ticket.ticketNumber} is complete. Take care!`,
      'SUCCESS'
    );

    emitQueueUpdate(updatedQueue);

    return res.json({ message: 'Consultation completed', ticket });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to complete consultation' });
  }
}
