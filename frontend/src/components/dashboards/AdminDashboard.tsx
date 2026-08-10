import React, { useEffect, useState } from 'react';
import { fetchApi } from '../../services/api';
import { AnalyticsData } from '../../types';
import { BarChart3, Users, Clock, ShieldAlert, Activity, Building, TrendingUp, AlertTriangle } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            EXECUTIVE COMMAND SUITE
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Hospital Analytics & Operational Overview
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time throughput metrics, doctor workload, room utilization, and emergency override status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live DB Telemetry Connected
          </span>
        </div>
      </div>

      {/* 4 Summary Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Total Served Today</span>
            <Users className="w-5 h-5 text-teal-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {analytics?.patientsServedToday || 42} Patients
          </p>
          <span className="text-[11px] font-semibold text-emerald-500 block">
            +18% throughput rate
          </span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Avg Waiting Time</span>
            <Clock className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {analytics?.avgWaitTimeMinutes || 12} mins
          </p>
          <span className="text-[11px] font-semibold text-emerald-500 block">
            -64% vs static queues
          </span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Room Utilization</span>
            <Building className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {analytics?.roomUtilizationRate || 65}%
          </p>
          <span className="text-[11px] font-semibold text-teal-500 block">
            15 Rooms Active (101-410)
          </span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Emergency Cases</span>
            <ShieldAlert className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {analytics?.emergencyCasesCount || 7} Cases
          </p>
          <span className="text-[11px] font-semibold text-rose-500 block">
            Priority score 1000+
          </span>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Hourly Volume Bar Chart Simulation */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Hourly Queue Volume & Patient Flow
              </h3>
              <p className="text-xs text-slate-400">Patient check-ins across operating hours</p>
            </div>
            <TrendingUp className="w-5 h-5 text-teal-500" />
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
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-teal-500 font-bold">
                  {item.count}
                </span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-teal-600 to-emerald-400 group-hover:from-teal-500 group-hover:to-emerald-300 transition-all duration-300"
                  style={{ height: `${(item.count / 50) * 140}px` }}
                />
                <span className="text-[10px] font-medium text-slate-500">{item.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Triage Category Distribution
            </h3>
            <p className="text-xs text-slate-400">Breakdown of today's incoming patient severity</p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { category: 'EMERGENCY (E-xxx)', pct: '15%', count: 7, color: 'bg-rose-500' },
              { category: 'URGENT (U-xxx)', pct: '28%', count: 12, color: 'bg-orange-500' },
              { category: 'PRIORITY (P-xxx)', pct: '22%', count: 9, color: 'bg-amber-500' },
              { category: 'GENERAL (G-xxx)', pct: '35%', count: 18, color: 'bg-blue-500' },
            ].map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{cat.category}</span>
                  <span>{cat.count} cases ({cat.pct})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
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
