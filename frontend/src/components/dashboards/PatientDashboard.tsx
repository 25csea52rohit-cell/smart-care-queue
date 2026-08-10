import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { QueueTicket } from '../../types';
import { HospitalFloorMap } from '../map/HospitalFloorMap';
import { Ticket, Clock, MapPin, Stethoscope, AlertCircle, CheckCircle2, QrCode, ArrowUpRight, Shield, User } from 'lucide-react';

interface PatientDashboardProps {
  onOpenBooking: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ onOpenBooking }) => {
  const { user } = useAuth();
  const { liveQueue } = useSocket();
  const [myTicket, setMyTicket] = useState<QueueTicket | null>(null);

  useEffect(() => {
    const ticket = liveQueue.find((t) => t.patientId === user?.id) || liveQueue[0] || null;
    setMyTicket(ticket);
  }, [liveQueue, user]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* ProHealth Banner Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-3xl hero-gradient dark:hero-gradient-dark text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-hero border border-white/20 text-xs font-extrabold text-sky-200">
            <Shield className="w-3.5 h-3.5" />
            <span>PATIENT PORTAL • PROHEALTH CAREQUEUE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Welcome back, {user?.name || 'John Doe'}
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl font-normal leading-relaxed">
            Monitor your live queue ticket status, assigned physician, and turn-by-turn indoor map navigation in real time.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenBooking}
          className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow-xl flex items-center gap-2 self-start md:self-auto transition"
        >
          <Ticket className="w-4 h-4 text-sky-600" />
          <span>+ Issue New Ticket</span>
        </motion.button>
      </motion.div>

      {/* Ticket Status Hero Card & Floor Map Layout */}
      {myTicket ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Active Ticket Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="p-7 rounded-3xl glass-card-pro space-y-6 border border-slate-200 dark:border-slate-800 shadow-xl">
              
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                  <span className="text-[11px] font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
                    Your Active Queue Ticket
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                      {myTicket.ticketNumber}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${
                      myTicket.category === 'EMERGENCY' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                      myTicket.category === 'URGENT' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                      myTicket.category === 'PRIORITY' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                    }`}>
                      {myTicket.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 mt-1">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                    {myTicket.status}
                  </span>
                </div>
              </div>

              {/* 4 Metric Stats Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-900 border border-sky-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 font-bold block uppercase">Estimated Wait</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5 mt-1">
                    <Clock className="w-4 h-4 text-emerald-500" /> ~{myTicket.estimatedWaitMinutes} min
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-900 border border-sky-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 font-bold block uppercase">Position Ahead</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white mt-1 block">
                    #{myTicket.positionInLine} in Queue
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-900 border border-sky-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 font-bold block uppercase">Assigned Room</span>
                  <span className="text-xl font-black text-sky-600 dark:text-sky-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4" /> Room {myTicket.room?.number || '101'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-900 border border-sky-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 font-bold block uppercase">Physician</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate mt-2 block">
                    {myTicket.doctor?.user?.name || 'Dr. Sarah Jenkins'}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                  <span>Consultation Progress</span>
                  <span>{myTicket.status === 'IN_CONSULTATION' ? '100%' : '75%'}</span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: myTicket.status === 'IN_CONSULTATION' ? '100%' : '75%' }}
                  />
                </div>
              </div>

              {/* Digital QR Pass */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Digital Arrival Pass</span>
                    <span className="text-slate-500 text-[11px]">Scan at reception kiosk terminal</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{myTicket.ticketNumber}</span>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Floor Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <HospitalFloorMap
              assignedRoomNumber={myTicket.room?.number || '101'}
              assignedWing={myTicket.room?.wing || 'Emergency Wing'}
            />
          </motion.div>

        </div>
      ) : (
        <div className="p-12 rounded-3xl glass-card-pro text-center space-y-4">
          <Ticket className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">No Active Ticket Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You do not currently have an active ticket. Click below to book a new appointment or request an emergency ticket.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-2xl bg-sky-600 text-white font-extrabold text-xs hover:bg-sky-500 transition shadow-lg shadow-sky-600/20"
          >
            + Book Appointment Now
          </button>
        </div>
      )}

    </div>
  );
};
