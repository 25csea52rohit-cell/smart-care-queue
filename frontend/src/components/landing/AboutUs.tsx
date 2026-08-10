import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Stethoscope, Users } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5"
          >
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
              ABOUT US
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              CareQueue is a team of experienced medical professionals
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Dedicated to providing top-quality healthcare services. We believe in a holistic approach to healthcare that focuses on treating the whole person, not just the illness or symptoms.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-2xl glass-card-pro space-y-1">
                <ShieldCheck className="w-6 h-6 text-sky-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">HIPAA Certified</h4>
                <p className="text-xs text-slate-500">256-bit encrypted health data safety</p>
              </div>

              <div className="p-4 rounded-2xl glass-card-pro space-y-1">
                <Stethoscope className="w-6 h-6 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Expert Doctors</h4>
                <p className="text-xs text-slate-500">On-call specialists across 10+ wings</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column Image & Clinical Team Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="relative p-6 rounded-3xl bg-gradient-to-tr from-sky-100 to-blue-50 dark:from-slate-900 dark:to-slate-800 border border-sky-100 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-sky-200/60 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Medical Operations Team
                  </span>
                </div>
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">CareQueue Pro</span>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Dr. Sarah Jenkins', role: 'Head of Emergency & Trauma', room: 'Room 101', status: 'In Consultation' },
                  { name: 'Dr. Marcus Vance', role: 'General OPD Specialist', room: 'Room 401', status: 'Available' },
                  { name: 'Dr. Elena Rostova', role: 'Chief Pediatrician', room: 'Room 201', status: 'Available' },
                ].map((doc, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold flex items-center justify-center">
                        {doc.name.split(' ')[1]?.[0]}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{doc.name}</span>
                        <span className="text-[10px] text-slate-500 block">{doc.role}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-semibold text-[10px]">
                      {doc.room}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
