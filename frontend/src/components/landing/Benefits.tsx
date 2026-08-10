import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, Building, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Benefits: React.FC = () => {
  const { t } = useLanguage();
  const [activeAudience, setActiveAudience] = useState<'patients' | 'doctors' | 'hospitals'>('patients');

  const benefitsData = {
    patients: {
      title: 'For Patients: Stress-Free Medical Visits',
      icon: <User className="w-5 h-5" />,
      items: [
        'Live queue position tracking on smartphone without crowded waiting areas',
        'Transparent estimated call times powered by AI heuristic predictions',
        'Multi-lingual voice announcements and real-time push notifications',
        'Interactive 3D hospital floor map guiding directly to assigned rooms',
      ],
    },
    doctors: {
      title: 'For Doctors: Balanced Workload & Clear Schedules',
      icon: <Stethoscope className="w-5 h-5" />,
      items: [
        'Automated patient triage preventing emergency overcrowding',
        'Single-click patient calling and consultation completion',
        'Instant room availability status and consultation history access',
        'Reduced administrative friction allowing full focus on patient care',
      ],
    },
    hospitals: {
      title: 'For Hospitals: Peak Operational Efficiency',
      icon: <Building className="w-5 h-5" />,
      items: [
        '64% average reduction in patient waiting times across departments',
        'Dynamic room utilization balancing capacity across Floors 1 to 4',
        'Real-time audit logging and HIPAA-compliant data security',
        'Comprehensive analytics dashboard tracking throughput and bottle-necks',
      ],
    },
  };

  const currentData = benefitsData[activeAudience];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800">
            Proven Value
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t('benefitsTitle')}
          </h2>
        </div>

        {/* Tab Switchers */}
        <div className="flex justify-center gap-3 mb-10">
          {(['patients', 'doctors', 'hospitals'] as const).map((audience) => {
            const isActive = activeAudience === audience;
            return (
              <button
                key={audience}
                onClick={() => setActiveAudience(audience)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 capitalize ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/25 scale-105'
                    : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {audience}
              </button>
            );
          })}
        </div>

        {/* Benefit Card Display */}
        <motion.div
          key={activeAudience}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto glass-card rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-3 rounded-xl bg-teal-500 text-white shadow-md">
              {currentData.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {currentData.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentData.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
