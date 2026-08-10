import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Clock, ShieldCheck, Users, Activity, CheckCircle2 } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreClick }) => {
  const { t } = useLanguage();
  const { liveQueue } = useSocket();

  const activeTicket = liveQueue[0] || {
    ticketNumber: 'E-001',
    patientName: 'John Doe',
    category: 'EMERGENCY',
    estimatedWaitMinutes: 0,
    roomNumber: '101',
    status: 'IN_CONSULTATION',
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-400/10 dark:bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Next-Gen Smart Triage & Real-Time Hospital Queuing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              {t('heroTitle').split('. ')[0]}.
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-indigo-600 dark:from-teal-400 dark:via-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {t('heroTitle').split('. ')[1] || 'Shorter Waiting Times.'}
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-teal-500/25 flex items-center gap-2 transition transform active:scale-95"
              >
                <span>{t('bookAppointment')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-xl glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition"
              >
                {t('learnMore')}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 99.4% On-Time Consultations
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-500" /> HIPAA & WCAG 2.1 Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-500" /> 50,000+ Patients Served
              </span>
            </div>
          </motion.div>

          {/* Right Live Interactive Mockup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md glass-card rounded-2xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 space-y-5">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-wider uppercase">
                    Live Room & Queue Feed
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">UPDATED NOW</span>
              </div>

              {/* Active Ticket Hero Widget */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold text-teal-100 uppercase tracking-widest">
                      Now Serving Ticket
                    </span>
                    <h3 className="text-4xl font-extrabold tracking-tight mt-1">
                      {activeTicket.ticketNumber || 'E-001'}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
                    {activeTicket.category || 'EMERGENCY'}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-teal-100 block">Assigned Doctor:</span>
                    <span className="font-semibold text-white">Dr. Sarah Jenkins</span>
                  </div>
                  <div>
                    <span className="text-teal-100 block">Room Number:</span>
                    <span className="font-semibold text-white">Room 101 (Emergency Wing)</span>
                  </div>
                </div>
              </div>

              {/* Mini Queue Stack */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Upcoming Queue (Live Triage Sort)
                </span>
                
                {[
                  { num: 'U-001', name: 'Emily Watson', cat: 'URGENT', room: '201', wait: '8 min', color: 'border-l-orange-500' },
                  { num: 'P-001', name: 'Michael Chang', cat: 'PRIORITY', room: '301', wait: '18 min', color: 'border-l-amber-500' },
                  { num: 'G-001', name: 'Sophia Martinez', cat: 'GENERAL', room: '402', wait: '32 min', color: 'border-l-blue-500' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-l-4 ${item.color} border-slate-200/80 dark:border-slate-800 text-xs`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-800 dark:text-slate-100">{item.num}</span>
                      <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {item.wait}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                        R-{item.room}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer status */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-teal-500" /> Real-time Socket.IO Connected
                </span>
                <span className="font-mono">Rooms 101-410</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
