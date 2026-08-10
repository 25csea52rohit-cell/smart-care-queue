import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { QueueCategory, QueueTicket } from '../../types';
import { fetchApi } from '../../services/api';
import { QrCode, Volume2, UserPlus, Filter, Search, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
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
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            RECEPTION COMMAND CENTER
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Walk-in Triage & Ticket Issuance Desk
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Issue walk-in tickets, trigger voice room calls, and manage live queue priority order.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-semibold">
            {liveQueue.filter(t => t.status === 'WAITING').length} Patients Waiting
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Walk-in Ticket Form */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <UserPlus className="w-5 h-5 text-teal-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Issue Walk-In Ticket
              </h2>
            </div>

            <form onSubmit={handleIssueWalkin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 42"
                    value={walkinAge}
                    onChange={(e) => setWalkinAge(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Category Triage
                  </label>
                  <select
                    value={walkinCategory}
                    onChange={(e) => setWalkinCategory(e.target.value as QueueCategory)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                  >
                    <option value="GENERAL">GENERAL (G)</option>
                    <option value="PRIORITY">PRIORITY (P)</option>
                    <option value="URGENT">URGENT (U)</option>
                    <option value="EMERGENCY">EMERGENCY (E)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Reported Symptoms / Reason
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. High fever, chest discomfort, shortness of breath..."
                  value={walkinSymptoms}
                  onChange={(e) => setWalkinSymptoms(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs shadow-md shadow-teal-500/20 transition"
              >
                {isSubmitting ? 'Generating Ticket...' : '+ Generate & Dispatch Ticket'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Queue Table & Call Actions */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Controls & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl glass-card border border-slate-200/80 dark:border-slate-800">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search ticket # or patient name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
              >
                <option value="ALL">All Categories</option>
                <option value="EMERGENCY">Emergency (E)</option>
                <option value="URGENT">Urgent (U)</option>
                <option value="PRIORITY">Priority (P)</option>
                <option value="GENERAL">General (G)</option>
              </select>
            </div>
          </div>

          {/* Queue List Table */}
          <div className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/80 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Ticket #</th>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Assigned Room</th>
                    <th className="p-3">Est Wait</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredQueue.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition">
                      <td className="p-3 font-bold font-mono text-slate-900 dark:text-white">
                        {ticket.ticketNumber}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">{ticket.patientName}</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[150px] block">{ticket.symptoms}</span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          ticket.category === 'EMERGENCY' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                          ticket.category === 'URGENT' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                          ticket.category === 'PRIORITY' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          {ticket.category}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">
                        Room {ticket.room?.number || '101'}
                      </td>
                      <td className="p-3 text-slate-500">
                        ~{ticket.estimatedWaitMinutes}m
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[10px]">
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleCallPatient(ticket)}
                          className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-[11px] inline-flex items-center gap-1 transition shadow-sm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Call Voice</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
