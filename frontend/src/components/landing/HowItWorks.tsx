import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Ticket, QrCode, Stethoscope } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: 'Book Appointment',
      desc: 'Select preferred department & report symptoms online or at hospital kiosk.',
      icon: <CalendarCheck className="w-6 h-6 text-teal-500" />,
    },
    {
      num: '02',
      title: 'Receive Queue Ticket',
      desc: 'Instant priority assignment (E-001, U-002, P-001, G-001) with live wait estimate.',
      icon: <Ticket className="w-6 h-6 text-emerald-500" />,
    },
    {
      num: '03',
      title: 'Contactless QR Check-In',
      desc: 'Scan digital ticket QR code at reception to confirm physical arrival.',
      icon: <QrCode className="w-6 h-6 text-indigo-500" />,
    },
    {
      num: '04',
      title: 'Meet Assigned Doctor',
      desc: 'Follow interactive floor map route when voice call directs you to your room.',
      icon: <Stethoscope className="w-6 h-6 text-cyan-500" />,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800">
            Frictionless Patient Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t('howItWorksTitle')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            4 simple steps connecting patient arrival to doctor consultation with zero waiting room anxiety.
          </p>
        </div>

        {/* 4-Step Visual Flow Grid with Connecting Lines */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Background Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500/20 via-emerald-500/40 to-indigo-500/20 -translate-y-6 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="relative z-10 p-6 rounded-2xl glass-card text-center border border-slate-200/80 dark:border-slate-800 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4 shadow-md relative">
                {step.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {step.num}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
