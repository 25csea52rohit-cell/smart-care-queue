import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Eye, Brain, QrCode, AlertTriangle, Bell, Stethoscope, UserCheck, BarChart3, ChevronRight, X } from 'lucide-react';

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  details: string;
  tag: string;
}

export const FeaturesGrid: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'booking',
      icon: <Calendar className="w-6 h-6 text-teal-500" />,
      title: 'Smart Appointment Booking',
      desc: 'Seamless multi-channel booking with automatic triage classification and room prep.',
      details: 'Patients select reported symptoms, and our backend triage model categorizes the urgency before allocating the optimal physician specialty and designated consultation room.',
      tag: 'AUTOMATED',
    },
    {
      id: 'queue',
      icon: <Eye className="w-6 h-6 text-emerald-500" />,
      title: 'Live Queue Tracking',
      desc: 'Real-time WebSocket feed displaying exact line position, room assignment, and status.',
      details: 'Patients can view their live progress on mobile or hospital monitors, eliminating crowded waiting rooms and giving accurate estimated call times.',
      tag: 'WEBSOCKETS',
    },
    {
      id: 'ai-triage',
      icon: <Brain className="w-6 h-6 text-indigo-500" />,
      title: 'AI-Based Patient Prioritization',
      desc: 'Smart symptom triage sorting cases into Emergency, Urgent, Priority, and General queues.',
      details: 'Our heuristic algorithm weighs clinical symptoms, patient age, and reported pain levels to automatically insert critical trauma cases ahead of standard appointments.',
      tag: 'HEURISTIC ENGINE',
    },
    {
      id: 'qr',
      icon: <QrCode className="w-6 h-6 text-cyan-500" />,
      title: 'QR Check-In',
      desc: 'Contactless arrival scanning at reception kiosks or directly on mobile phones.',
      details: 'Patients scan their digital QR pass at reception terminals to automatically update their status from "Scheduled" to "Checked-In" without manual entry.',
      tag: 'CONTACTLESS',
    },
    {
      id: 'emergency',
      icon: <AlertTriangle className="w-6 h-6 text-rose-500" />,
      title: 'Emergency Detection & Override',
      desc: 'Instant priority promotion and automated room reservation for critical conditions.',
      details: 'Allows clinical staff to trigger emergency overrides, immediately alerting on-call emergency physicians and clearing designated Rooms 101–105.',
      tag: 'CRITICAL CARE',
    },
    {
      id: 'notifications',
      icon: <Bell className="w-6 h-6 text-amber-500" />,
      title: 'Real-Time Notifications & Voice',
      desc: 'Instant audio calls via Web Speech API, in-app badges, and simulated SMS alerts.',
      details: 'Audible room calls chime through hospital speakers while sending instant push notifications to the patient when their turn is 2 calls away.',
      tag: 'AUDIO & PUSH',
    },
    {
      id: 'doctor-suite',
      icon: <Stethoscope className="w-6 h-6 text-teal-600" />,
      title: 'Doctor Workstation',
      desc: 'Streamlined doctor panel to call next patient, view medical history, and complete visits.',
      details: 'Provides single-click patient calling, instant room status updates, patient record view, and seamless transfer to lab or pharmacy queues.',
      tag: 'CLINICAL DECK',
    },
    {
      id: 'reception-desk',
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Receptionist Command Desk',
      desc: 'Full visibility over walk-ins, QR check-in logs, and manual queue overrides.',
      details: 'Receptionists can register walk-in patients, adjust triage categories, dispatch voice calls, and resolve queue delays in real time.',
      tag: 'COMMAND CENTER',
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
      title: 'Analytics & Hospital Insights',
      desc: 'Live operational dashboards tracking throughput, room utilization, and wait trends.',
      details: 'Hospital administrators access deep queries tracking hourly queue volume, doctor consultation speeds, and room utilization heatmaps.',
      tag: 'EXECUTIVE SUITE',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for High-Volume Healthcare Operations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            From smart triage to automated room routing and executive analytics — everything you need for friction-free patient flow.
          </p>
        </div>

        {/* 9 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl glass-card hover:border-teal-500/50 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <button
                onClick={() => setSelectedFeature(feat)}
                className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform"
              >
                <span>Learn More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg glass-card rounded-2xl p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400">
                {selectedFeature.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  {selectedFeature.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedFeature.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
              {selectedFeature.details}
            </p>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-semibold text-xs hover:bg-teal-500 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
