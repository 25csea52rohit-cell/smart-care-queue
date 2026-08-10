import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import { Activity, Sun, Moon, Globe, LogOut, UserCheck, ShieldAlert, Stethoscope, UserIcon } from 'lucide-react';

interface NavbarProps {
  onOpenBookingModal: () => void;
  activeView: 'landing' | 'dashboard';
  setActiveView: (view: 'landing' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal, activeView, setActiveView }) => {
  const { user, quickLoginAsRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const roleIcons: Record<UserRole, React.ReactNode> = {
    PATIENT: <UserIcon className="w-3.5 h-3.5" />,
    RECEPTIONIST: <UserCheck className="w-3.5 h-3.5" />,
    DOCTOR: <Stethoscope className="w-3.5 h-3.5" />,
    ADMIN: <ShieldAlert className="w-3.5 h-3.5" />,
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/25">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                CareQueue
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                PRO
              </span>
            </div>
          </div>

          {/* Role Switcher Demo Pills */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2">Demo Role:</span>
            {(['PATIENT', 'RECEPTIONIST', 'DOCTOR', 'ADMIN'] as UserRole[]).map((role) => {
              const isActive = user?.role === role && activeView === 'dashboard';
              return (
                <button
                  key={role}
                  onClick={() => {
                    quickLoginAsRole(role);
                    setActiveView('dashboard');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30 font-semibold scale-105'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {roleIcons[role]}
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            {/* View Switcher Button */}
            <button
              onClick={() => setActiveView(activeView === 'landing' ? 'dashboard' : 'landing')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
            >
              {activeView === 'landing' ? 'Go to Dashboards' : 'Back to Home'}
            </button>

            {/* Quick Book Appointment CTA */}
            <button
              onClick={onOpenBookingModal}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-md shadow-teal-500/20 transition transform active:scale-95"
            >
              + {t('bookAppointment')}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1 text-xs font-semibold"
              title="Toggle Language"
            >
              <Globe className="w-4 h-4 text-teal-500" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {user && (
              <button
                onClick={logout}
                className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
