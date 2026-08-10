import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Stethoscope, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

export const MedicProBento: React.FC = () => {
  return (
    <section className="py-20 bg-sky-50/50 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-2"
        >
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
            EXCELLENCE IN HEALTHCARE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            The Premier Medical & Triage Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Advanced medical facilities, board-certified specialists, and friction-free patient care.
          </p>
        </motion.div>

        {/* 5-Card Bento Grid Layout (Exact Structure from Reference Image) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Left Tall ICU Equipment Card (col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="md:col-span-4 rounded-3xl overflow-hidden glass-card-pro border border-slate-200 dark:border-slate-800 shadow-xl relative group min-h-[420px] flex flex-col justify-end p-6"
          >
            <img
              src="/images/bento-icu.png"
              alt="ICU Medical Equipment"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

            <div className="relative z-10 text-white space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-sky-500/90 text-white uppercase tracking-wider">
                ICU & Surgical Technology
              </span>
              <h3 className="text-xl font-black leading-snug">Real-Time Patient Monitoring</h3>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Equipped with next-generation digital telemetry and 24/7 cardiac monitoring bays.
              </p>
            </div>
          </motion.div>

          {/* Right Bento Container (col-span-8) */}
          <div className="md:col-span-8 space-y-6">
            
            {/* Top Row: 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              
              {/* Card 2: Middle Doctor Duo (sm:col-span-5) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -6 }}
                className="sm:col-span-5 rounded-3xl overflow-hidden glass-card-pro border border-slate-200 dark:border-slate-800 shadow-xl relative group h-[200px]"
              >
                <img
                  src="/images/bento-duo.png"
                  alt="Doctor Duo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs font-black block">Clinical Team Collaboration</span>
                  <span className="text-[10px] text-sky-200 font-semibold block">Multidisciplinary Care</span>
                </div>
              </motion.div>

              {/* Card 3: Doctors Avatar Cluster Card (sm:col-span-3) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ y: -6 }}
                className="sm:col-span-3 rounded-3xl p-5 bg-sky-100 dark:bg-slate-900 border border-sky-200 dark:border-slate-800 shadow-xl flex flex-col justify-between"
              >
                <span className="text-xs font-black text-sky-700 dark:text-sky-300 uppercase tracking-wider block">
                  PHYSICIANS
                </span>

                <div className="flex -space-x-2 my-2">
                  <div className="w-8 h-8 rounded-full bg-sky-400 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-900">JD</div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[10px] font-black text-white">MV</div>
                  <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-[10px] font-black text-white">ER</div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] font-black text-white">+4k</div>
                </div>

                <p className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">
                  Over 4,000+ medical specialists available on call.
                </p>
              </motion.div>

              {/* Card 4: Pediatric High-Five (sm:col-span-4) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -6 }}
                className="sm:col-span-4 rounded-3xl overflow-hidden glass-card-pro border border-slate-200 dark:border-slate-800 shadow-xl relative group h-[200px]"
              >
                <img
                  src="/images/bento-pediatric.png"
                  alt="Pediatric Care"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs font-black block">Compassionate Care</span>
                  <span className="text-[10px] text-sky-200 font-semibold block">Pediatrics & Family Health</span>
                </div>
              </motion.div>

            </div>

            {/* Bottom Row: 2 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              
              {/* Card 5: Connect With Medical Professional (sm:col-span-7) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                whileHover={{ y: -6 }}
                className="sm:col-span-7 rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1">
                  <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    CONNECT WITH A MEDICAL PROFESSIONAL
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Practical, safe, and accessible healthcare triage at your fingertips.
                  </p>
                </div>

                <div className="pt-2">
                  <button className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 text-white font-extrabold text-xs shadow-md shadow-sky-600/20 flex items-center gap-2">
                    <span>Connect Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Card 6: Our Specialist Doctors (sm:col-span-5) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -6 }}
                className="sm:col-span-5 rounded-3xl p-6 bg-sky-100/70 dark:bg-slate-900 border border-sky-200 dark:border-slate-800 shadow-xl flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">
                    OUR SPECIALIST DOCTORS
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Highly qualified board-certified clinical team.
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all shadow-md">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

        {/* Partner / Accreditation Logo Strip (Exact Matching from Image 2) */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-around gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className="text-sm font-black tracking-widest font-mono text-slate-700 dark:text-slate-300">MEDIAFIRE</span>
          <span className="text-sm font-black tracking-widest font-mono text-slate-700 dark:text-slate-300">ACDOCTOR</span>
          <span className="text-sm font-black tracking-widest font-mono text-slate-700 dark:text-slate-300">DR.WEB®</span>
          <span className="text-sm font-black tracking-widest font-mono text-slate-700 dark:text-slate-300">NVIDIA HEALTHCARE</span>
        </div>

      </div>
    </section>
  );
};
