import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, CheckCircle2, Clock, MapPin, Users, HeartPulse, Sparkles } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreClick }) => {
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
    <section className="relative overflow-hidden hero-gradient dark:hero-gradient-dark text-white py-16 lg:py-24">
      {/* Background Soft Glow Spheres */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Floating Avatar Pill (Matching Reference Image) */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel-hero border border-white/20 text-xs font-semibold">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-sky-300 border-2 border-white flex items-center justify-center text-[10px] text-slate-900 font-bold">JD</div>
                <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">EW</div>
                <div className="w-6 h-6 rounded-full bg-indigo-400 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">MC</div>
              </div>
              <span className="font-bold text-white">150K+ Patients Recovered</span>
              <span className="w-4 h-4 rounded-full bg-sky-400 text-slate-900 flex items-center justify-center font-bold text-[10px]">✓</span>
            </div>

            {/* Main Headline (Exact Wording from Image) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Compassionate care, <br />
              <span className="text-sky-300">exceptional results.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Our team of experienced doctors and healthcare professionals are committed to providing quality care and personalized attention to our patients.
            </p>

            {/* Action Buttons (Book Appointment & Video CTA) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3">
              <button
                onClick={onBookClick}
                className="px-7 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm shadow-xl shadow-black/10 transition transform active:scale-95 flex items-center gap-2"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 text-sky-600" />
              </button>

              <button
                onClick={onExploreClick}
                className="flex items-center gap-3 px-6 py-4 rounded-full glass-panel-hero hover:bg-white/20 text-white font-bold text-sm transition"
              >
                <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                </div>
                <span>See how we work</span>
              </button>
            </div>

          </motion.div>

          {/* Right Column: Live Interactive Queue Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass-panel-hero rounded-3xl p-6 shadow-2xl space-y-4 border border-white/25">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                    Live Room & Queue Feed
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 font-mono">REALTIME SYNC</span>
              </div>

              {/* Serving Ticket Card */}
              <div className="p-5 rounded-2xl bg-white text-slate-900 shadow-xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest block">
                      Now Serving Ticket
                    </span>
                    <h3 className="text-4xl font-black tracking-tight text-slate-900 mt-0.5">
                      {activeTicket.ticketNumber || 'E-001'}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-700">
                    {activeTicket.category || 'EMERGENCY'}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Physician</span>
                    <span className="font-bold text-slate-900 block">Dr. Sarah Jenkins</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Room Location</span>
                    <span className="font-bold text-sky-600 block">Room 101 (Emergency)</span>
                  </div>
                </div>
              </div>

              {/* Queue List Preview */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-sky-200 uppercase tracking-wider block">
                  Upcoming Queue (Live Triage Sort)
                </span>
                {[
                  { num: 'U-001', name: 'Emily Watson', wait: '8 min', room: '201' },
                  { num: 'P-001', name: 'Michael Chang', wait: '18 min', room: '301' },
                  { num: 'G-001', name: 'Sophia Martinez', wait: '32 min', room: '402' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold text-white border border-white/15">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sky-300 font-bold">{item.num}</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-sky-300" /> {item.wait}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/20 font-bold">R-{item.room}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>

        {/* Bottom Frosted Glass Stats Strip (Exact Layout from Image) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-6 rounded-2xl glass-panel-hero grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-white/20"
        >
          <div className="space-y-1">
            <h4 className="text-3xl font-black text-white tracking-tight">20+</h4>
            <p className="text-xs text-sky-200 font-medium">Years of experience</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black text-white tracking-tight">95%</h4>
            <p className="text-xs text-sky-200 font-medium">Patient satisfaction rating</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black text-white tracking-tight">5000+</h4>
            <p className="text-xs text-sky-200 font-medium">Patients served annually</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black text-white tracking-tight">10+</h4>
            <p className="text-xs text-sky-200 font-medium">Healthcare providers on staff</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
