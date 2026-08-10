import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'EMERGENCY' = 'INFO'
) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    });

    console.log(`[Notification Service] Triggered in-app & simulated email to user ${userId}: "${title}"`);
    return notification;
  } catch (err) {
    console.error('[Notification Service Error]:', err);
    return null;
  }
}
