import React, { useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturesSection } from './components/FeaturesSection';
import { DashboardSection } from './components/DashboardSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleEnterDashboard = () => {
    const el = document.getElementById('dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFeature = (_featureId: string) => {
    const el = document.getElementById('dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-black text-[#E1E0CC] min-h-screen selection:bg-primary selection:text-black">
      {/* SECTION 1: HERO */}
      <HeroSection onEnterDashboard={handleEnterDashboard} />

      {/* SECTION 2: ABOUT */}
      <AboutSection />

      {/* SECTION 3: FEATURES */}
      <FeaturesSection onSelectFeature={handleSelectFeature} />

      {/* MERGED INTERACTIVE MISSION CONTROL DASHBOARD */}
      <div ref={dashboardRef}>
        <DashboardSection />
      </div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
};

export default App;
