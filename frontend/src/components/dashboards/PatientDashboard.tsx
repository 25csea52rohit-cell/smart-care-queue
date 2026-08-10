import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { QueueTicket } from '../../types';
import { HospitalFloorMap } from '../map/HospitalFloorMap';
import { Ticket, Clock, MapPin, Stethoscope, AlertCircle, CheckCircle2, QrCode, ArrowUpRight } from 'lucide-react';

interface PatientDashboardProps {
  onOpenBooking: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ onOpenBooking }) => {
  const { user } = useAuth();
  const { liveQueue } = useSocket();
  const [myTicket, setMyTicket] = useState<QueueTicket | null>(null);

  useEffect(() => {
    // Find ticket belonging to logged in patient or fallback to first waiting/called ticket for demo
    const ticket = liveQueue.find((t) => t.patientId === user?.id) || liveQueue[0] || null;
    setMyTicket(ticket);
  }, [liveQueue, user]);

  return (
    <div className="space-y-8">
      {/* Patient Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            PATIENT PORTAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Welcome back, {user?.name || 'John Doe'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your real-time queue ticket status, assigned consultation room, and indoor map route.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs shadow-lg shadow-teal-500/20 transition transform active:scale-95 flex items-center gap-2 self-start sm:self-auto"
        >
          <Ticket className="w-4 h-4" />
          <span>Book New Ticket</span>
        </button>
      </div>

      {/* Main Ticket Status Hero Card */}
      {myTicket ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl glass-card border-2 border-teal-500/30 dark:border-teal-500/20 shadow-xl relative overflow-hidden space-y-6">
              
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Your Live Ticket Number
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                      {myTicket.ticketNumber}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      myTicket.category === 'EMERGENCY' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                      myTicket.category === 'URGENT' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                      myTicket.category === 'PRIORITY' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {myTicket.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Current Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 mt-1">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                    {myTicket.status}
                  </span>
                </div>
              </div>

              {/* Grid detail metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Estimated Wait</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                    <Clock className="w-4 h-4 text-emerald-500" /> ~{myTicket.estimatedWaitMinutes} min
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Position Ahead</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 block">
                    #{myTicket.positionInLine} in Line
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Assigned Room</span>
                  <span className="text-lg font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-4 h-4" /> Room {myTicket.room?.number || '101'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Doctor</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate mt-1 block">
                    {myTicket.doctor?.user?.name || 'Dr. Sarah Jenkins'}
                  </span>
                </div>
              </div>

              {/* Live Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Queue Progress</span>
                  <span>{myTicket.status === 'IN_CONSULTATION' ? '100%' : '75%'}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: myTicket.status === 'IN_CONSULTATION' ? '100%' : '75%' }}
                  />
                </div>
              </div>

              {/* QR Pass Snippet */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <QrCode className="w-8 h-8 text-teal-500" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Digital Check-In QR Pass</span>
                    <span className="text-slate-400">Scan at kiosk terminal upon arrival</span>
                  </div>
                </div>
                <span className="font-mono text-slate-500">{myTicket.ticketNumber}</span>
              </div>
            </div>
          </div>

          {/* Interactive Hospital Floor Map */}
          <div className="lg:col-span-5">
            <HospitalFloorMap
              assignedRoomNumber={myTicket.room?.number || '101'}
              assignedWing={myTicket.room?.wing || 'Emergency Wing'}
            />
          </div>

        </div>
      ) : (
        <div className="p-12 rounded-2xl glass-card text-center space-y-4">
          <Ticket className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Active Ticket Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You currently do not have an active queue ticket. Click below to book a new appointment or request a walk-in triage ticket.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-semibold text-xs hover:bg-teal-500 transition"
          >
            + Book Appointment Now
          </button>
        </div>
      )}
    </div>
  );
};
