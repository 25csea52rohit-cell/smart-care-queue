import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findAndAssignRoom(category: string, departmentId: string) {
  // 1. Find rooms matching category and department or general fallback
  const matchingRooms = await prisma.room.findMany({
    where: {
      categoryAllowed: category,
      status: 'AVAILABLE',
    },
  });

  let selectedRoom = matchingRooms[0];

  // Fallback to any AVAILABLE room if category room is full
  if (!selectedRoom) {
    const fallbackRooms = await prisma.room.findMany({
      where: {
        status: 'AVAILABLE',
      },
    });
    selectedRoom = fallbackRooms[0];
  }

  // Find an available doctor in the department or doctor assigned to room
  const availableDoctor = await prisma.doctorProfile.findFirst({
    where: {
      departmentId: departmentId,
      isAvailable: true,
    },
    include: {
      user: true,
      room: true,
    },
  });

  return {
    room: selectedRoom || null,
    doctor: availableDoctor || null,
  };
}
