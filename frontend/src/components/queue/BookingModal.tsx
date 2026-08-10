import React, { useState } from 'react';
import { fetchApi } from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import { QueueCategory } from '../../types';
import { X, Ticket, AlertCircle, HeartPulse, Stethoscope, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { refreshQueue } = useSocket();
  const [symptoms, setSymptoms] = useState('');
  const [patientAge, setPatientAge] = useState('34');
  const [patientName, setPatientName] = useState('');
  const [categoryOverride, setCategoryOverride] = useState<string>('AUTO');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms) return;

    setIsSubmitting(true);
    try {
      await fetchApi('/queue/book', {
        method: 'POST',
        body: JSON.stringify({
          symptoms,
          patientAge,
          patientNameOverride: patientName || undefined,
          categoryOverride: categoryOverride === 'AUTO' ? undefined : categoryOverride,
        }),
      });

      refreshQueue();
      onClose();
    } catch (err) {
      console.error('Failed to book appointment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg glass-card rounded-2xl p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white shadow-md">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI Triage Classifier Active
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Book Appointment & Issue Ticket
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              Patient Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Patient Age
              </label>
              <input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Urgency Classification
              </label>
              <select
                value={categoryOverride}
                onChange={(e) => setCategoryOverride(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-teal-600 dark:text-teal-400"
              >
                <option value="AUTO">Auto AI Symptom Triage</option>
                <option value="EMERGENCY">Emergency (E-xxx)</option>
                <option value="URGENT">Urgent (U-xxx)</option>
                <option value="PRIORITY">Priority (P-xxx)</option>
                <option value="GENERAL">General (G-xxx)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              Describe Reported Symptoms
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe main symptoms (e.g. chest pain, high fever, abdominal pain, routine checkup)..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[11px] text-teal-800 dark:text-teal-300 flex items-start gap-2">
            <HeartPulse className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <span>
              The backend smart triage model will automatically compute urgency score, assign the matching available room (101-410), and issue a live ticket.
            </span>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-xs shadow-md shadow-teal-500/20 hover:from-teal-500 hover:to-emerald-500 transition"
            >
              {isSubmitting ? 'Processing Triage...' : 'Confirm & Issue Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
