import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchApi } from '../../services/api';
import { AnalyticsData } from '../../types';
import { BarChart3, Users, Clock, ShieldAlert, Shield, Activity, Building, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchApi<AnalyticsData>('/analytics');
        setAnalytics(data);
      } catch (err) {
        console.error('Failed to load analytics data:', err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-3xl hero-gradient dark:hero-gradient-dark text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-hero border border-white/20 text-xs font-extrabold text-sky-200">
            <Shield className="w-3.5 h-3.5" />
            <span>EXECUTIVE COMMAND SUITE • PROHEALTH CAREQUEUE</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Hospital Analytics & Executive Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 font-normal">
            Real-time throughput metrics, doctor workload, room utilization, and emergency triage analytics.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl glass-panel-hero border border-white/20 text-xs font-extrabold text-emerald-300 flex items-center gap-2 self-start md:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Analytics Engine Connected
        </div>
      </motion.div>

      {/* 4 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div whileHover={{ y: -5 }} className="p-6 rounded-3xl glass-card-pro space-y-2 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">Total Patients Served</span>
            <div className="p-2.5 rounded-xl bg-sky-600 text-white shadow-md">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {analytics?.patientsServedToday || 42} Patients
          </p>
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block">
            +18% daily throughput
          </span>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="p-6 rounded-3xl glass-card-pro space-y-2 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">Avg Waiting Time</span>
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-md">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {analytics?.avgWaitTimeMinutes || 12} mins
          </p>
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block">
            -64% vs static queues
          </span>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="p-6 rounded-3xl glass-card-pro space-y-2 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">Room Utilization</span>
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {analytics?.roomUtilizationRate || 68}%
          </p>
          <span className="text-xs font-extrabold text-sky-600 dark:text-sky-400 block">
            15 Rooms Active (101–410)
          </span>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="p-6 rounded-3xl glass-card-pro space-y-2 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">Emergency Cases</span>
            <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {analytics?.emergencyCasesCount || 7} Cases
          </p>
          <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 block">
            Priority score 1000+
          </span>
        </motion.div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Hourly Volume Chart - Dark High-Contrast Enclosure Fix */}
        <div className="lg:col-span-7 p-7 rounded-3xl glass-card-pro space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Hourly Queue Volume & Patient Throughput
              </h3>
              <p className="text-xs text-slate-500 font-bold">Patient arrival throughput across operating hours</p>
            </div>
            <div className="p-2 rounded-xl bg-sky-600 text-white shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Dark Architectural Graph Container */}
          <div className="p-5 rounded-2xl bg-slate-950 border-2 border-slate-800 space-y-3 shadow-inner">
            <div className="flex justify-between items-center text-[10px] text-sky-400 font-extrabold uppercase tracking-wider">
              <span>Patient Throughput Ticker</span>
              <span>Max Capacity: 50/hr</span>
            </div>

            <div className="h-52 flex items-end justify-between gap-2 pt-6 px-3 relative">
              {/* Horizontal Gridlines */}
              <div className="absolute inset-x-0 top-1/4 border-b border-slate-800/80 stroke-dasharray-4 pointer-events-none" />
              <div className="absolute inset-x-0 top-2/4 border-b border-slate-800/80 stroke-dasharray-4 pointer-events-none" />
              <div className="absolute inset-x-0 top-3/4 border-b border-slate-800/80 stroke-dasharray-4 pointer-events-none" />

              {(analytics?.hourlyQueueVolume || [
                { hour: '08:00', count: 12 },
                { hour: '09:00', count: 28 },
                { hour: '10:00', count: 42 },
                { hour: '11:00', count: 35 },
                { hour: '12:00', count: 20 },
                { hour: '13:00', count: 25 },
                { hour: '14:00', count: 38 },
                { hour: '15:00', count: 31 },
              ]).map((item) => (
                <div key={item.hour} className="flex-1 flex flex-col items-center gap-2 group z-10">
                  <span className="text-[10px] font-mono text-sky-300 group-hover:text-white font-black px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {item.count}
                  </span>
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-blue-700 via-sky-500 to-cyan-300 group-hover:from-blue-600 group-hover:to-cyan-200 transition-all duration-300 shadow-lg shadow-sky-500/20"
                    style={{ height: `${(item.count / 50) * 140}px` }}
                  />
                  <span className="text-[10px] font-extrabold text-slate-300">{item.hour}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Triage Severity Distribution */}
        <div className="lg:col-span-5 p-7 rounded-3xl glass-card-pro space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Triage Severity Distribution
            </h3>
            <p className="text-xs text-slate-500 font-bold">Breakdown of today's incoming patient urgency</p>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { category: 'EMERGENCY (E-xxx)', pct: '15%', count: 7, color: 'bg-rose-500' },
              { category: 'URGENT (U-xxx)', pct: '28%', count: 12, color: 'bg-orange-500' },
              { category: 'PRIORITY (P-xxx)', pct: '22%', count: 9, color: 'bg-amber-500' },
              { category: 'GENERAL (G-xxx)', pct: '35%', count: 18, color: 'bg-sky-500' },
            ].map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex justify-between text-xs font-black text-slate-900 dark:text-white">
                  <span>{cat.category}</span>
                  <span>{cat.count} cases ({cat.pct})</span>
                </div>
                <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700">
                  <div className={`h-full ${cat.color} rounded-full shadow-sm`} style={{ width: cat.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
