import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { QueueTicket } from '../types';
import { fetchApi } from '../services/api';
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
      const data = await fetchApi<{ tickets: QueueTicket[] }>('/queue/live');
      if (data && data.tickets && Array.isArray(data.tickets)) {
        setLiveQueue(data.tickets);
      }
    } catch (e) {
      console.error('Failed to refresh queue:', e);
    }
  };

  useEffect(() => {
    refreshQueue();

    // Setup periodic refresh (every 3 seconds)
    const pollInterval = setInterval(() => {
      refreshQueue();
    }, 3000);

    // Socket.IO attempt
    let socketClient: Socket | null = null;
    try {
      socketClient = io(window.location.origin, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 2,
        timeout: 3000,
      });

      socketClient.on('connect', () => {
        setIsConnected(true);
      });

      socketClient.on('disconnect', () => {
        setIsConnected(false);
      });

      socketClient.on('queue:updated', (data: QueueTicket[]) => {
        if (data && Array.isArray(data)) {
          setLiveQueue(data);
        }
      });

      socketClient.on('ticket:called', (data: QueueTicket) => {
        setLastCalledTicket(data);
        if (data.room?.number) {
          announceQueueCall(data.ticketNumber, data.room.number, data.room.wing, language);
        }
        refreshQueue();
      });

      setSocket(socketClient);
    } catch (err) {
      console.warn('Socket connection skipped in client mode:', err);
    }

    return () => {
      clearInterval(pollInterval);
      if (socketClient) socketClient.disconnect();
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
