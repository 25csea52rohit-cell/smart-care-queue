import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRooms(req: Request, res: Response) {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        doctors: {
          include: { user: true },
        },
      },
      orderBy: { number: 'asc' },
    });

    return res.json({ rooms });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch rooms' });
  }
}

export async function updateRoomStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRoom = await prisma.room.update({
      where: { id },
      data: { status },
    });

    return res.json({ room: updatedRoom });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update room status' });
  }
}
