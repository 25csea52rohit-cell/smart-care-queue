import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSocket } from '../../context/SocketContext';
import { QueueCategory, QueueTicket } from '../../types';
import { fetchApi } from '../../services/api';
import { Volume2, UserPlus, Filter, Search, Shield, UserCheck, Activity } from 'lucide-react';
import { announceQueueCall } from '../../utils/voiceAnnouncer';
import { useLanguage } from '../../context/LanguageContext';

export const ReceptionistDashboard: React.FC = () => {
  const { liveQueue, refreshQueue } = useSocket();
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [walkinName, setWalkinName] = useState('');
  const [walkinAge, setWalkinAge] = useState('');
  const [walkinSymptoms, setWalkinSymptoms] = useState('');
  const [walkinCategory, setWalkinCategory] = useState<QueueCategory>('GENERAL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIssueWalkin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinSymptoms || !walkinName) return;

    setIsSubmitting(true);
    try {
      await fetchApi('/queue/book', {
        method: 'POST',
        body: JSON.stringify({
          patientNameOverride: walkinName,
          patientAge: walkinAge,
          symptoms: walkinSymptoms,
          categoryOverride: walkinCategory,
        }),
      });

      setWalkinName('');
      setWalkinAge('');
      setWalkinSymptoms('');
      refreshQueue();
    } catch (err) {
      console.error('Failed to issue walk-in ticket:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallPatient = async (ticket: QueueTicket) => {
    try {
      await fetchApi('/queue/call', {
        method: 'POST',
        body: JSON.stringify({
          ticketId: ticket.id,
          roomId: ticket.roomId,
        }),
      });

      announceQueueCall(ticket.ticketNumber, ticket.room?.number || '101', ticket.room?.wing, language);
      refreshQueue();
    } catch (err) {
      console.error('Failed to call ticket:', err);
    }
  };

  const filteredQueue = liveQueue.filter((ticket) => {
    const matchesSearch = ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || ticket.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-3xl hero-gradient dark:hero-gradient-dark text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-hero border border-white/20 text-xs font-extrabold text-sky-200">
            <Shield className="w-3.5 h-3.5" />
            <span>RECEPTION COMMAND DESK • PROHEALTH CAREQUEUE</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Walk-in Triage & Ticket Desk
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 font-normal">
            Register walk-in patients, manage real-time queue priorities, and trigger multi-lingual voice calls.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl glass-panel-hero border border-white/20 text-xs font-extrabold text-white self-start md:self-auto">
          {liveQueue.filter(t => t.status === 'WAITING').length} Patients Waiting
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Issue Ticket Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4"
        >
          <div className="p-6 rounded-3xl glass-card-pro space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                <UserPlus className="w-5 h-5" />
              </div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Issue Walk-In Ticket
              </h2>
            </div>

            <form onSubmit={handleIssueWalkin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 42"
                    value={walkinAge}
                    onChange={(e) => setWalkinAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Urgency Triage
                  </label>
                  <select
                    value={walkinCategory}
                    onChange={(e) => setWalkinCategory(e.target.value as QueueCategory)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-extrabold text-sky-600 dark:text-sky-400"
                  >
                    <option value="GENERAL">GENERAL (G)</option>
                    <option value="PRIORITY">PRIORITY (P)</option>
                    <option value="URGENT">URGENT (U)</option>
                    <option value="EMERGENCY">EMERGENCY (E)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Reported Symptoms / Reason
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. High fever, chest discomfort, shortness of breath..."
                  value={walkinSymptoms}
                  onChange={(e) => setWalkinSymptoms(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 text-white font-extrabold text-xs shadow-lg shadow-sky-600/20 transition"
              >
                {isSubmitting ? 'Generating Ticket...' : '+ Generate & Dispatch Ticket'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Right Column: Live Queue Roster Table */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl glass-card-pro border border-slate-200 dark:border-slate-800">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search ticket # or patient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-extrabold text-sky-600 dark:text-sky-400"
              >
                <option value="ALL">All Categories</option>
                <option value="EMERGENCY">Emergency (E)</option>
                <option value="URGENT">Urgent (U)</option>
                <option value="PRIORITY">Priority (P)</option>
                <option value="GENERAL">General (G)</option>
              </select>
            </div>
          </div>

          <div className="glass-card-pro rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">Ticket #</th>
                    <th className="p-3.5">Patient</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Assigned Room</th>
                    <th className="p-3.5">Est Wait</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Voice Call</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredQueue.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-sky-50/50 dark:hover:bg-slate-900/50 transition">
                      <td className="p-3.5 font-black font-mono text-slate-900 dark:text-white">
                        {ticket.ticketNumber}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 dark:text-white block">{ticket.patientName}</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[150px] block">{ticket.symptoms}</span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded font-black text-[10px] ${
                          ticket.category === 'EMERGENCY' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                          ticket.category === 'URGENT' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                          ticket.category === 'PRIORITY' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                          'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                        }`}>
                          {ticket.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-extrabold text-sky-600 dark:text-sky-400">
                        Room {ticket.room?.number || '101'}
                      </td>
                      <td className="p-3.5 text-slate-500 font-semibold">
                        ~{ticket.estimatedWaitMinutes}m
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px]">
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCallPatient(ticket)}
                          className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-[11px] inline-flex items-center gap-1.5 transition shadow-md shadow-sky-600/20"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Call Voice</span>
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
