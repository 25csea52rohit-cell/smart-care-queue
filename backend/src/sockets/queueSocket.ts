import { Server as SocketIOServer, Socket } from 'socket.io';

let ioInstance: SocketIOServer | null = null;

export function initSocketIO(io: SocketIOServer) {
  ioInstance = io;

  io.on('connection', (socket: Socket) => {
    console.log(`⚡ [Socket.IO] Client connected: ${socket.id}`);

    socket.on('join_room', (room: string) => {
      socket.join(room);
      console.log(`[Socket.IO] ${socket.id} joined room: ${room}`);
    });

    socket.on('disconnect', () => {
      console.log(`⚡ [Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
}

export function emitQueueUpdate(queueData: any) {
  if (ioInstance) {
    ioInstance.emit('queue:updated', queueData);
  }
}

export function emitTicketCalled(ticketData: any) {
  if (ioInstance) {
    ioInstance.emit('ticket:called', ticketData);
  }
}

export function emitEmergencyAlert(alertData: any) {
  if (ioInstance) {
    ioInstance.emit('emergency:alert', alertData);
  }
}
