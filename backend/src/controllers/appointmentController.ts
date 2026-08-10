import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { classifyCategoryAndScore } from '../services/triageEngine';

const prisma = new PrismaClient();

export async function getAppointments(req: AuthRequest, res: Response) {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: { include: { user: true } },
        department: true,
      },
      orderBy: { scheduledTime: 'asc' },
    });

    return res.json({ appointments });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch appointments' });
  }
}

export async function createAppointment(req: AuthRequest, res: Response) {
  try {
    const { doctorId, departmentId, scheduledTime, symptoms } = req.body;
    const patientId = req.user?.id || 'guest-user';
    const patientName = req.user?.name || 'Scheduled Patient';

    if (!doctorId || !departmentId || !scheduledTime || !symptoms) {
      return res.status(400).json({ error: 'Missing required appointment fields' });
    }

    const triage = classifyCategoryAndScore(symptoms);

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        patientName,
        doctorId,
        departmentId,
        scheduledTime: new Date(scheduledTime),
        symptoms,
        category: triage.category,
        status: 'SCHEDULED',
      },
    });

    return res.status(201).json({ appointment });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to schedule appointment' });
  }
}
