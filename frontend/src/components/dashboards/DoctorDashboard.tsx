import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { QueueTicket } from '../../types';
import { fetchApi } from '../../services/api';
import { announceQueueCall } from '../../utils/voiceAnnouncer';
import { Stethoscope, Volume2, CheckCircle2, UserCheck, Clock, FileText, AlertTriangle, Activity } from 'lucide-react';
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
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            PHYSICIAN CLINICAL SUITE
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {user?.name || 'Dr. Sarah Jenkins'} — Room 101 (Emergency Wing)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Active patient consultation desk, live room status controls, and department queue roster.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCallNext}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>Call Next Patient</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Patient Consultation Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl glass-card border-2 border-teal-500/30 dark:border-teal-500/20 shadow-xl space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    CURRENT IN CONSULTATION
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {activeConsultation ? activeConsultation.patientName : 'No Active Patient'}
                  </h2>
                </div>
              </div>

              {activeConsultation && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {activeConsultation.ticketNumber} ({activeConsultation.category})
                </span>
              )}
            </div>

            {activeConsultation ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400 font-medium">
                    <span>Reported Symptoms:</span>
                    <span>Triage Score: {activeConsultation.priorityScore}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    "{activeConsultation.symptoms}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block">Patient Age</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {activeConsultation.patientAge || 34} years old
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block">Arrival Time</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {new Date(activeConsultation.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={handleComplete}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-2 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Consultation</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <UserCheck className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="text-sm font-medium">No patient currently inside Room 101.</p>
                <button
                  onClick={handleCallNext}
                  className="px-4 py-2 rounded-xl bg-teal-600 text-white font-semibold text-xs hover:bg-teal-500 transition"
                >
                  + Call First Waiting Patient
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Room Queue Roster */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upcoming Queue Roster ({waitingQueue.length})
              </h3>
              <span className="text-xs text-slate-400">Sorted by Triage Score</span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {waitingQueue.map((ticket, idx) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">#{idx + 1}</span>
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        {ticket.ticketNumber} — {ticket.patientName}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[140px] block">
                        {ticket.symptoms}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    ticket.category === 'EMERGENCY' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                    ticket.category === 'URGENT' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                    ticket.category === 'PRIORITY' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {ticket.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
