import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Stethoscope, HeartPulse, Building2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LiveStats: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      id: 'patients',
      label: t('patientsServed'),
      value: '1,420+',
      icon: <Users className="w-6 h-6 text-teal-500" />,
      change: '+14% vs yesterday',
    },
    {
      id: 'wait',
      label: t('avgWaitTime'),
      value: '12 min',
      icon: <Clock className="w-6 h-6 text-emerald-500" />,
      change: 'Reduced by 64%',
    },
    {
      id: 'doctors',
      label: t('doctorsAvailable'),
      value: '38 Active',
      icon: <Stethoscope className="w-6 h-6 text-indigo-500" />,
      change: '100% room occupancy sync',
    },
    {
      id: 'emergency',
      label: t('emergencyCases'),
      value: '189 Today',
      icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
      change: '< 2 min response time',
    },
    {
      id: 'hospitals',
      label: t('hospitalsConnected'),
      value: '24 Facilities',
      icon: <Building2 className="w-6 h-6 text-cyan-500" />,
      change: 'Multi-site cloud mesh',
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 rounded-2xl glass-card hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  LIVE
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                {stat.label}
              </p>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                {stat.change}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
