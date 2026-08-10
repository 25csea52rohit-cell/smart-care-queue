import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Stethoscope, Users, CheckCircle } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 inline-block">
              ABOUT US
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              ProHealth is a team of experienced medical professionals
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Dedicated to providing top-quality healthcare services. We believe in a holistic approach to healthcare that focuses on treating the whole person, not just the illness or symptoms.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-5 rounded-2xl glass-card-pro space-y-2"
              >
                <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 w-fit">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">HIPAA Certified</h4>
                <p className="text-xs text-slate-500">256-bit encrypted health data & HIPAA AAA compliance</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-5 rounded-2xl glass-card-pro space-y-2"
              >
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 w-fit">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Expert Specialists</h4>
                <p className="text-xs text-slate-500">Board-certified doctors on-call across 10 wings</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Medical Team Photo Card with Hover Zoom */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900">
              <motion.img
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.6 }}
                src="/images/about-team.png"
                alt="ProHealth Medical Team"
                className="w-full h-[420px] object-cover object-center"
              />

              {/* Gradient Overlay Shield */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating Doctor Badge Overlay (Matching Reference Image) */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel-hero border border-white/20 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Board Certified Staff</h4>
                    <p className="text-xs text-sky-200">10+ Specialized Outpatient Departments</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">
                  24/7 On-Call
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
