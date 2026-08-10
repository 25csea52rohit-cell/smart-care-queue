import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Clock, MapPin, Sparkles, Activity, ShieldCheck, HeartPulse } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 14 },
    },
  };

  return (
    <section id="hero" className="relative overflow-hidden hero-gradient dark:hero-gradient-dark text-white py-16 lg:py-24">
      {/* Dynamic Animated Glow Orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-sky-400/25 rounded-full blur-[140px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] animate-pulse-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* Left Column Text & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Floating Badge Pill */}
            <motion.div variants={itemVariants} className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel-hero border border-white/30 text-xs font-semibold cursor-pointer shadow-lg"
              >
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-sky-300 border-2 border-white flex items-center justify-center text-[10px] text-slate-900 font-extrabold shadow-sm">JD</div>
                  <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">EW</div>
                  <div className="w-6 h-6 rounded-full bg-indigo-400 border-2 border-white flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">MC</div>
                </div>
                <span className="font-bold text-white tracking-wide">150K+ Patients Recovered</span>
                <span className="w-4 h-4 rounded-full bg-sky-400 text-slate-900 flex items-center justify-center font-black text-[10px]">✓</span>
              </motion.div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Compassionate care, <br />
              <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                exceptional results.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Our team of experienced doctors and healthcare professionals are committed to providing quality care and personalized attention to our patients.
            </motion.p>

            {/* Action Buttons with Spring Hover Effects */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.96 }}
                onClick={onBookClick}
                className="px-8 py-4 rounded-full bg-white text-slate-900 font-extrabold text-sm shadow-xl flex items-center gap-2.5 transition"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 text-sky-600" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
                whileTap={{ scale: 0.96 }}
                onClick={onExploreClick}
                className="flex items-center gap-3 px-7 py-4 rounded-full glass-panel-hero text-white font-bold text-sm transition"
              >
                <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                </div>
                <span>See how we work</span>
              </motion.button>
            </motion.div>

          </div>

          {/* Right Column: Floating Interactive Live Feed Widget */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 animate-float"
          >
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-panel-hero rounded-3xl p-6 shadow-2xl space-y-4 border border-white/30 relative"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                    Live Room & Queue Feed
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 font-mono font-bold">REALTIME SOCKET SYNC</span>
              </div>

              {/* Serving Ticket Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-2xl bg-white text-slate-900 shadow-2xl space-y-3 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest block">
                      Now Serving Ticket
                    </span>
                    <h3 className="text-4xl font-black tracking-tight text-slate-900 mt-0.5">
                      {activeTicket.ticketNumber || 'E-001'}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-700 animate-pulse">
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
              </motion.div>

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
                  <motion.div
                    key={idx}
                    whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold text-white border border-white/15 cursor-pointer transition-colors"
                  >
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
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </motion.div>

        </motion.div>

        {/* Bottom Frosted Glass Stats Strip with Hover Elevation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-6 rounded-2xl glass-panel-hero grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-white/25 shadow-2xl"
        >
          {[
            { num: '20+', label: 'Years of experience' },
            { num: '95%', label: 'Patient satisfaction rating' },
            { num: '5000+', label: 'Patients served annually' },
            { num: '10+', label: 'Healthcare providers on staff' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06, y: -4 }}
              className="space-y-1 p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            >
              <h4 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stat.num}</h4>
              <p className="text-xs text-sky-200 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
