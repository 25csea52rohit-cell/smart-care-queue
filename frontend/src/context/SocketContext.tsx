import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { QueueTicket } from '../types';
import { announceQueueCall } from '../utils/voiceAnnouncer';
import { useLanguage } from './LanguageContext';

interface SocketContextType {
  socket: Socket | null;
  liveQueue: QueueTicket[];
  lastCalledTicket: QueueTicket | null;
  isConnected: boolean;
  refreshQueue: () => Promise<void>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [liveQueue, setLiveQueue] = useState<QueueTicket[]>([]);
  const [lastCalledTicket, setLastCalledTicket] = useState<QueueTicket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { language } = useLanguage();

  const refreshQueue = async () => {
    try {
      const res = await fetch('/api/queue/live');
      if (res.ok) {
        const data = await res.json();
        setLiveQueue(data.tickets || []);
      }
    } catch (e) {
      console.error('Failed to refresh queue:', e);
    }
  };

  useEffect(() => {
    refreshQueue();

    const socketClient = io(window.location.origin, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
    });

    socketClient.on('connect', () => {
      setIsConnected(true);
    });

    socketClient.on('disconnect', () => {
      setIsConnected(false);
    });

    socketClient.on('queue:updated', (data: QueueTicket[]) => {
      setLiveQueue(data);
    });

    socketClient.on('ticket:called', (data: QueueTicket) => {
      setLastCalledTicket(data);
      if (data.room?.number) {
        announceQueueCall(data.ticketNumber, data.room.number, data.room.wing, language);
      }
      refreshQueue();
    });

    setSocket(socketClient);

    return () => {
      socketClient.disconnect();
    };
  }, [language]);

  return (
    <SocketContext.Provider value={{ socket, liveQueue, lastCalledTicket, isConnected, refreshQueue }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within SocketProvider');
  return context;
};
