import React from 'react';
import { motion } from 'framer-motion';
import { Siren, Baby, Stethoscope, HeartPulse, Brain, Activity, ArrowUpRight } from 'lucide-react';

export const DepartmentsGrid: React.FC = () => {
  const departments = [
    {
      id: 'emerg',
      name: 'Emergency Department',
      icon: <Siren className="w-8 h-8 text-rose-500" />,
      rooms: 'Rooms 101–105',
      tag: 'Immediate Triage',
    },
    {
      id: 'ped',
      name: 'Pediatric Department',
      icon: <Baby className="w-8 h-8 text-sky-500" />,
      rooms: 'Rooms 201–205',
      tag: 'Urgent Care',
    },
    {
      id: 'obgyn',
      name: 'Obstetrics & Gynecology',
      icon: <Stethoscope className="w-8 h-8 text-pink-500" />,
      rooms: 'Rooms 301–305',
      tag: 'Specialist Wing',
    },
    {
      id: 'cardio',
      name: 'Cardiology Department',
      icon: <HeartPulse className="w-8 h-8 text-red-500" />,
      rooms: 'Rooms 106–110',
      tag: 'Critical Care',
    },
    {
      id: 'neuro',
      name: 'Neurology Department',
      icon: <Brain className="w-8 h-8 text-indigo-500" />,
      rooms: 'Rooms 306–310',
      tag: 'Specialist Care',
    },
    {
      id: 'gen',
      name: 'General OPD & Psychiatry',
      icon: <Activity className="w-8 h-8 text-blue-500" />,
      rooms: 'Rooms 401–410',
      tag: 'Routine OPD',
    },
  ];

  return (
    <section id="departments" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-2"
        >
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
            OUR DEPARTMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            For Your Health
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Automated room allocation across specialized clinical departments and outpatient wings.
          </p>
        </motion.div>

        {/* 6 Department Cards Grid with Hover Spring Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, idx) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="dept-card p-6 rounded-3xl flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-sky-50 dark:bg-slate-800/80 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {dept.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {dept.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-semibold">{dept.rooms}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {dept.tag}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
