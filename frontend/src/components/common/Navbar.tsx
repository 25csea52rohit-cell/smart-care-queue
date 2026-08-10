import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import { Shield, Sun, Moon, Globe, LogOut, UserCheck, Stethoscope, ShieldAlert, UserIcon } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveView('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-600/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Pro<span className="text-sky-600 dark:text-sky-400">Health</span>
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                CareQueue
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-extrabold tracking-wide text-slate-700 dark:text-slate-200">
            <button onClick={() => setActiveView('landing')} className="hover:text-sky-600 dark:hover:text-sky-400 transition">
              Home
            </button>
            <a href="#about" className="hover:text-sky-600 dark:hover:text-sky-400 transition whitespace-nowrap">
              About Us
            </a>
            <a href="#departments" className="hover:text-sky-600 dark:hover:text-sky-400 transition whitespace-nowrap">
              Find Doctor
            </a>
            <a href="#features" className="hover:text-sky-600 dark:hover:text-sky-400 transition whitespace-nowrap">
              Features
            </a>
            <a href="#faq" className="hover:text-sky-600 dark:hover:text-sky-400 transition whitespace-nowrap">
              Contact
            </a>
          </nav>

          {/* Role Switcher Demo Pills */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-400 px-2 uppercase tracking-wider">ROLE:</span>
            {(['PATIENT', 'RECEPTIONIST', 'DOCTOR', 'ADMIN'] as UserRole[]).map((role) => {
              const isActive = user?.role === role && activeView === 'dashboard';
              return (
                <button
                  key={role}
                  onClick={() => {
                    quickLoginAsRole(role);
                    setActiveView('dashboard');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {roleIcons[role]}
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveView(activeView === 'landing' ? 'dashboard' : 'landing')}
              className="text-xs font-extrabold px-3.5 py-2 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 hover:bg-sky-100 transition whitespace-nowrap"
            >
              {activeView === 'landing' ? 'Live Dashboards' : 'Home Page'}
            </button>

            <button
              onClick={onOpenBookingModal}
              className="hidden sm:flex items-center gap-2 px-4.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-extrabold text-xs shadow-lg shadow-sky-600/25 transition transform active:scale-95 whitespace-nowrap"
            >
              + {t('bookAppointment')}
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1 text-xs font-black"
            >
              <Globe className="w-4 h-4 text-sky-600" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-slate-800" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {user && (
              <button
                onClick={logout}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
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
