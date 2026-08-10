import React from 'react';
import { Activity, Shield, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">CareQueue</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Enterprise Smart Healthcare Queue Management & Automated Room Allocation Engine.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational (v1.0)
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><a href="#features" className="hover:text-teal-400 transition">Smart Triage Engine</a></li>
              <li><a href="#features" className="hover:text-teal-400 transition">Live Queue Display</a></li>
              <li><a href="#features" className="hover:text-teal-400 transition">Room Allocation (101-410)</a></li>
              <li><a href="#features" className="hover:text-teal-400 transition">Voice Announcement</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold text-sm mb-4">Dashboards</h4>
            <ul className="space-y-2.5">
              <li className="hover:text-teal-400 cursor-pointer">Patient Portal</li>
              <li className="hover:text-teal-400 cursor-pointer">Reception Desk</li>
              <li className="hover:text-teal-400 cursor-pointer">Doctor Workstation</li>
              <li className="hover:text-teal-400 cursor-pointer">Hospital Analytics</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold text-sm mb-4">Security & Compliance</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                <Shield className="w-4 h-4 text-teal-400" />
                <span>HIPAA & WCAG 2.1 AAA Compliant</span>
              </div>
              <p className="text-[11px] text-slate-500">
                256-bit SSL encryption. Zero storage of unencrypted patient health information.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CareQueue Inc. Built for Production Healthcare.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-200 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-200 transition">Security Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
