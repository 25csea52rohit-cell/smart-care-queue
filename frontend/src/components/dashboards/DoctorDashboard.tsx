import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { QueueTicket } from '../../types';
import { fetchApi } from '../../services/api';
import { announceQueueCall } from '../../utils/voiceAnnouncer';
import { Stethoscope, Volume2, CheckCircle2, UserCheck, Shield, Clock, HeartPulse, Activity } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { liveQueue, refreshQueue } = useSocket();
  const { language } = useLanguage();

  const [activeConsultation, setActiveConsultation] = useState<QueueTicket | null>(() => {
    return liveQueue.find(t => t.status === 'IN_CONSULTATION') || null;
  });

  const waitingQueue = liveQueue.filter(t => t.status === 'WAITING' || t.status === 'CALLED');

  const handleCallNext = async () => {
    const nextTicket = waitingQueue[0];
    if (!nextTicket) return;

    try {
      await fetchApi('/queue/call', {
        method: 'POST',
        body: JSON.stringify({
          ticketId: nextTicket.id,
          roomId: '101',
        }),
      });

      announceQueueCall(nextTicket.ticketNumber, '101', 'Emergency Wing', language);
      setActiveConsultation(nextTicket);
      refreshQueue();
    } catch (err) {
      console.error('Failed to call next patient:', err);
    }
  };

  const handleComplete = async () => {
    if (!activeConsultation) return;

    try {
      await fetchApi('/queue/complete', {
        method: 'POST',
        body: JSON.stringify({
          ticketId: activeConsultation.id,
        }),
      });

      setActiveConsultation(null);
      refreshQueue();
    } catch (err) {
      console.error('Failed to complete consultation:', err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Banner Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-3xl hero-gradient dark:hero-gradient-dark text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-hero border border-white/20 text-xs font-extrabold text-sky-200">
            <Shield className="w-3.5 h-3.5" />
            <span>CLINICAL SUITE • PROHEALTH CAREQUEUE</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            {user?.name || 'Dr. Sarah Jenkins'} — Room 101 (Emergency Wing)
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 font-normal">
            Active patient consultation deck, live room status controls, and department queue roster.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCallNext}
          className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow-xl flex items-center gap-2 self-start md:self-auto transition"
        >
          <Volume2 className="w-4 h-4 text-sky-600" />
          <span>Call Next Patient</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Patient Consultation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="p-7 rounded-3xl glass-card-pro space-y-6 border border-slate-200 dark:border-slate-800 shadow-xl">
            
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center font-bold shadow-md shadow-sky-600/20">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
                    CURRENT IN CONSULTATION
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {activeConsultation ? activeConsultation.patientName : 'No Active Patient'}
                  </h2>
                </div>
              </div>

              {activeConsultation && (
                <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {activeConsultation.ticketNumber} ({activeConsultation.category})
                </span>
              )}
            </div>

            {activeConsultation ? (
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-sky-50/70 dark:bg-slate-900 border border-sky-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400 font-bold uppercase tracking-wider">
                    <span>Reported Symptoms</span>
                    <span>Triage Priority Score: {activeConsultation.priorityScore}</span>
                  </div>
                  <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                    "{activeConsultation.symptoms}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-900 border border-sky-100 dark:border-slate-800">
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Patient Age</span>
                    <span className="font-black text-slate-900 dark:text-white text-lg mt-1 block">
                      {activeConsultation.patientAge || 34} years old
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-900 border border-sky-100 dark:border-slate-800">
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Arrival Time</span>
                    <span className="font-black text-slate-900 dark:text-white text-lg mt-1 block">
                      {new Date(activeConsultation.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleComplete}
                    className="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Consultation</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <UserCheck className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No patient currently inside Room 101.</p>
                <button
                  onClick={handleCallNext}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-extrabold text-xs hover:bg-sky-500 transition shadow-md shadow-sky-600/20"
                >
                  + Call First Waiting Patient
                </button>
              </div>
            )}

          </div>
        </motion.div>

        {/* Right Column: Room Queue Roster */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="p-7 rounded-3xl glass-card-pro border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Upcoming Queue Roster ({waitingQueue.length})
              </h3>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Triage Score Sorted</span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {waitingQueue.map((ticket, idx) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-50/60 dark:bg-slate-900 border border-sky-100 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-900 dark:text-white text-base">#{idx + 1}</span>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {ticket.ticketNumber} — {ticket.patientName}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[140px] block">
                        {ticket.symptoms}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded font-black text-[10px] ${
                    ticket.category === 'EMERGENCY' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                    ticket.category === 'URGENT' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                    ticket.category === 'PRIORITY' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                  }`}>
                    {ticket.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
