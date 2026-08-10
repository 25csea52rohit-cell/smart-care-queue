import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import { initSocketIO } from './sockets/queueSocket';

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

initSocketIO(io);

server.listen(PORT, () => {
  console.log(`🚀 Smart Care Queue Backend running on http://localhost:${PORT}`);
});

export { server, io };
