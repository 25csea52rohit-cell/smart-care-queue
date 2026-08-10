import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the smart triage algorithm categorize patients?",
      a: "When booking or checking in, reported symptoms are analyzed against emergency keywords, pain scales, and age factors to assign categories: Emergency (E-001, Immediate), Urgent (U-001, <15m), Priority (P-001, <30m), and General (G-001, Standard).",
    },
    {
      q: "What happens when an Emergency ticket is created?",
      a: "The backend engine immediately inserts the emergency ticket at the front of the queue, reserves the next free Emergency Room (101–105), triggers a high-priority alert for on-call doctors, and re-calculates estimated wait times for all waiting patients.",
    },
    {
      q: "Can patients track their live queue position outside the hospital?",
      a: "Yes! Patients can monitor their ticket status, assigned room, and live countdown timer from any mobile web browser via Socket.IO real-time updates.",
    },
    {
      q: "Does CareQueue support voice call announcements?",
      a: "Yes. Using browser Web Speech synthesis API, the system automatically pronounces ticket calls aloud (e.g. 'Ticket E-001, please proceed to Room 101') in English or Spanish when doctors click 'Call Patient'.",
    },
    {
      q: "How does QR check-in work?",
      a: "Each issued ticket features a unique digital QR code. When the patient arrives at the hospital, they scan the QR code at reception to confirm check-in.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t('faqTitle')}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition"
                >
                  <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-teal-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
