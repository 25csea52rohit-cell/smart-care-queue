import { PrismaClient } from '@prisma/client';
import { CATEGORY_CONFIG } from '../config/constants';
import { findAndAssignRoom } from './roomAllocationService';

const prisma = new PrismaClient();

export async function generateTicketNumber(category: 'EMERGENCY' | 'URGENT' | 'PRIORITY' | 'GENERAL'): Promise<string> {
  const prefix = CATEGORY_CONFIG[category].prefix;
  
  // Count tickets created today for this category
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const count = await prisma.queueTicket.count({
    where: {
      category,
      createdAt: {
        gte: todayStart,
      },
    },
  });

  const sequence = (count + 1).toString().padStart(3, '0');
  return `${prefix}-${sequence}`;
}

export async function recalculateQueuePositions() {
  // Fetch all WAITING tickets
  const waitingTickets = await prisma.queueTicket.findMany({
    where: {
      status: 'WAITING',
    },
    orderBy: [
      { priorityScore: 'desc' },
      { createdAt: 'asc' },
    ],
  });

  // Calculate active doctors count
  const activeDoctorsCount = await prisma.doctorProfile.count({
    where: { isAvailable: true },
  }) || 1;

  // Average mins per consultation based on category
  const avgMins = {
    EMERGENCY: 15,
    URGENT: 10,
    PRIORITY: 12,
    GENERAL: 8,
  };

  // Batch update positionInLine and estimatedWaitMinutes
  let currentAccumulatedWait = 0;

  for (let idx = 0; idx < waitingTickets.length; idx++) {
    const ticket = waitingTickets[idx];
    const position = idx + 1;
    
    // AI Wait Time Predictor Heuristic formula:
    // estimatedWait = Math.round((currentAccumulatedWait / activeDoctorsCount) + CATEGORY_CONFIG[ticket.category as keyof typeof CATEGORY_CONFIG].targetWaitMinutes)
    const categoryWait = avgMins[ticket.category as keyof typeof avgMins] || 10;
    const estWait = Math.max(0, Math.round((currentAccumulatedWait / Math.max(1, activeDoctorsCount))));

    await prisma.queueTicket.update({
      where: { id: ticket.id },
      data: {
        positionInLine: position,
        estimatedWaitMinutes: estWait,
      },
    });

    currentAccumulatedWait += categoryWait;
  }

  // Return updated full queue
  return await prisma.queueTicket.findMany({
    include: {
      department: true,
      doctor: { include: { user: true } },
      room: true,
    },
    orderBy: [
      { status: 'asc' },
      { priorityScore: 'desc' },
      { createdAt: 'asc' },
    ],
  });
}
