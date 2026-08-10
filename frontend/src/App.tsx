import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/landing/Hero';
import { LiveStats } from './components/landing/LiveStats';
import { FeaturesGrid } from './components/landing/FeaturesGrid';
import { HowItWorks } from './components/landing/HowItWorks';
import { Benefits } from './components/landing/Benefits';
import { Testimonials } from './components/landing/Testimonials';
import { FAQ } from './components/landing/FAQ';
import { Footer } from './components/landing/Footer';
import { PatientDashboard } from './components/dashboards/PatientDashboard';
import { ReceptionistDashboard } from './components/dashboards/ReceptionistDashboard';
import { DoctorDashboard } from './components/dashboards/DoctorDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { BookingModal } from './components/queue/BookingModal';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'landing' | 'dashboard'>('landing');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const renderDashboard = () => {
    switch (user?.role) {
      case 'PATIENT':
        return <PatientDashboard onOpenBooking={() => setIsBookingModalOpen(true)} />;
      case 'RECEPTIONIST':
        return <ReceptionistDashboard />;
      case 'DOCTOR':
        return <DoctorDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return <PatientDashboard onOpenBooking={() => setIsBookingModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main className="flex-grow">
        {activeView === 'landing' ? (
          <>
            <Hero
              onBookClick={() => setIsBookingModalOpen(true)}
              onExploreClick={() => {
                const featEl = document.getElementById('features');
                featEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <LiveStats />
            <FeaturesGrid />
            <HowItWorks />
            <Benefits />
            <Testimonials />
            <FAQ />
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderDashboard()}
          </div>
        )}
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SocketProvider>
            <AppContent />
          </SocketProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
