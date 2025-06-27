import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import ResumeBuilder from './components/ResumeBuilder';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'analyzer' | 'builder'>('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'analyzer':
        return <ResumeAnalyzer onBack={() => setActiveSection('home')} />;
      case 'builder':
        return <ResumeBuilder onBack={() => setActiveSection('home')} />;
      default:
        return (
          <>
            <Hero onAnalyze={() => setActiveSection('analyzer')} onBuild={() => setActiveSection('builder')} />
            <Features onAnalyze={() => setActiveSection('analyzer')} onBuild={() => setActiveSection('builder')} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection} 
        onNavigate={setActiveSection} 
      />
      {renderActiveSection()}
      {activeSection === 'home' && <Footer />}
    </div>
  );
}

export default App;