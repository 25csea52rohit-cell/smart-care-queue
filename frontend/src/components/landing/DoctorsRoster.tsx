import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Star, Calendar, MapPin, ArrowRight } from 'lucide-react';

export const DoctorsRoster: React.FC = () => {
  const doctors = [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Jenkins',
      specialty: 'Head of Emergency & Trauma',
      wing: 'Emergency Wing (1F)',
      room: 'Room 101',
      rating: '4.9',
      exp: '14+ Yrs Exp',
      image: '/images/hero-doctor.png',
      badge: 'On Duty',
    },
    {
      id: 'doc-2',
      name: 'Dr. Marcus Vance',
      specialty: 'Senior General OPD Specialist',
      wing: 'General OPD Wing (4F)',
      room: 'Room 401',
      rating: '4.8',
      exp: '12+ Yrs Exp',
      image: '/images/about-team.png',
      badge: 'Available',
    },
    {
      id: 'doc-3',
      name: 'Dr. Elena Rostova',
      specialty: 'Chief Pediatrician',
      wing: 'Urgent Care Wing (2F)',
      room: 'Room 201',
      rating: '5.0',
      exp: '16+ Yrs Exp',
      image: '/images/hero-doctor.png',
      badge: 'On Duty',
    },
    {
      id: 'doc-4',
      name: 'Dr. David Kim',
      specialty: 'Cardiology Specialist',
      wing: 'Specialist Wing (3F)',
      room: 'Room 301',
      rating: '4.9',
      exp: '18+ Yrs Exp',
      image: '/images/about-team.png',
      badge: 'Available',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
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
            OUR MEDICAL SPECIALISTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Meet Our On-Call Physicians
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dedicated specialists automatically assigned to consultation rooms based on real-time triage.
          </p>
        </motion.div>

        {/* 4 Doctor Cards Grid with Scroll Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card-pro rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 group shadow-xl flex flex-col justify-between"
            >
              {/* Doctor Image Header */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-400 text-xs font-extrabold flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{doc.rating}</span>
                </div>

                {/* Duty Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  {doc.badge}
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-black tracking-tight leading-snug">{doc.name}</h3>
                  <span className="text-[11px] text-sky-200 font-bold block">{doc.specialty}</span>
                </div>
              </div>

              {/* Doctor Details Footer */}
              <div className="p-5 space-y-3 bg-white dark:bg-slate-900">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-bold">
                    <MapPin className="w-3.5 h-3.5" /> {doc.room}
                  </span>
                  <span>{doc.exp}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-medium text-slate-400">
                  {doc.wing}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
