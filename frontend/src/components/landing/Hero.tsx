import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Clock, MapPin, Sparkles, Activity, ShieldCheck, HeartPulse, CheckCircle2 } from 'lucide-react';
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
    room: { number: '101' },
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
    <section id="hero" className="relative overflow-hidden hero-gradient dark:hero-gradient-dark text-white py-16 lg:py-20">
      
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
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
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
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2">
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

          {/* Right Column: Prominent Doctor Image Card & Live Queue Feed */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 flex flex-col items-center justify-center relative"
          >
            {/* Doctor Image Card Container */}
            <div className="relative w-full max-w-md">
              
              {/* Doctor Cutout Image Frame */}
              <div className="relative rounded-3xl overflow-hidden glass-panel-hero border-2 border-white/30 shadow-2xl bg-gradient-to-b from-sky-500/20 to-blue-900/40">
                <img
                  src="/images/hero-doctor-cutout.png"
                  alt="Senior Physician"
                  className="w-full h-[460px] object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                {/* Floating Doctor Info Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-panel-hero border border-white/30 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-extrabold text-sky-300 uppercase tracking-widest block">
                      CHIEF CLINICAL OFFICER
                    </span>
                    <h3 className="text-base font-black text-white">Dr. Sarah Jenkins</h3>
                    <span className="text-xs text-slate-200">Room 101 • Emergency & Trauma</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-400 text-slate-900 uppercase">
                    On Duty
                  </span>
                </div>
              </div>

              {/* Floating Live Queue Ticket Badge */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="absolute top-4 -right-4 hidden sm:block w-64 p-4 rounded-2xl glass-panel-hero border border-white/40 shadow-2xl backdrop-blur-xl text-white space-y-2"
              >
                <div className="flex justify-between items-center border-b border-white/20 pb-2 text-[10px] font-mono">
                  <span className="text-sky-300 font-bold">LIVE QUEUE</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-400 text-slate-900 font-extrabold">SERVED</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-slate-300 block">Now Serving</span>
                    <span className="text-2xl font-black text-white">{activeTicket.ticketNumber}</span>
                  </div>
                  <span className="text-xs font-bold text-sky-300">Room {activeTicket.room?.number || '101'}</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>

        {/* Bottom Frosted Glass Stats Strip */}
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
