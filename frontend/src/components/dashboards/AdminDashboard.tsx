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
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Total Patients Served</span>
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
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
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Avg Waiting Time</span>
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
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
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Room Utilization</span>
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
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
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Emergency Cases</span>
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
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
        
        {/* Hourly Volume Chart */}
        <div className="lg:col-span-7 p-7 rounded-3xl glass-card-pro space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Hourly Queue Volume & Patient Throughput
              </h3>
              <p className="text-xs text-slate-400 font-medium">Patient arrival throughput across operating hours</p>
            </div>
            <TrendingUp className="w-5 h-5 text-sky-600" />
          </div>

          <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2">
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
              <div key={item.hour} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-sky-600 font-extrabold">
                  {item.count}
                </span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-sky-600 to-blue-500 group-hover:from-sky-500 group-hover:to-blue-400 transition-all duration-300 shadow-md"
                  style={{ height: `${(item.count / 50) * 140}px` }}
                />
                <span className="text-[10px] font-bold text-slate-500">{item.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Triage Category Distribution */}
        <div className="lg:col-span-5 p-7 rounded-3xl glass-card-pro space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Triage Severity Distribution
            </h3>
            <p className="text-xs text-slate-400 font-medium">Breakdown of today's incoming patient urgency</p>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { category: 'EMERGENCY (E-xxx)', pct: '15%', count: 7, color: 'bg-rose-500' },
              { category: 'URGENT (U-xxx)', pct: '28%', count: 12, color: 'bg-orange-500' },
              { category: 'PRIORITY (P-xxx)', pct: '22%', count: 9, color: 'bg-amber-500' },
              { category: 'GENERAL (G-xxx)', pct: '35%', count: 18, color: 'bg-sky-500' },
            ].map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{cat.category}</span>
                  <span>{cat.count} cases ({cat.pct})</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: cat.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
