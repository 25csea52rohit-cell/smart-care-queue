import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "CareQueue completely transformed our Emergency wing. Response times dropped from 45 minutes to under 8 minutes, saving vital lives every single day.",
      author: "Dr. Sarah Jenkins",
      role: "Head of Emergency Medicine, St. Jude Hospital",
      stars: 5,
      avatar: "SJ",
    },
    {
      quote: "I checked in on my phone while riding the metro. By the time I walked through the hospital doors, my ticket was called for Room 201. Zero waiting time!",
      author: "Emily Watson",
      role: "Patient",
      stars: 5,
      avatar: "EW",
    },
    {
      quote: "The room allocation engine automatically balances our 20 OPD consultation rooms. We processed 1,400 patients today with zero room scheduling conflicts.",
      author: "Chief Admin Robert Chen",
      role: "Operations Director, Metro Health System",
      stars: 5,
      avatar: "RC",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800">
            Real Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t('testimonialsTitle')}
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl p-8 text-center relative border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6"
            >
              <Quote className="w-10 h-10 text-teal-500/20 mx-auto" />

              <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>

              <div className="flex justify-center gap-1">
                {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="p-2 rounded-xl glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === i ? 'w-6 bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-xl glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
