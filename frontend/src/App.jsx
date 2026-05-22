import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import POC1_IAM from './components/POC1_IAM';
import POC2_Conformity from './components/POC2_Conformity';
import POC3_Assistant from './components/POC3_Assistant';
import POC4_Anomalies from './components/POC4_Anomalies';
import Cartography from './components/Cartography';
import './App.css';

function App() {
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Charger les préférences au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className="app-container" data-theme={theme}>
      {/* Header */}
      <Header 
        language={language}
        setLanguage={handleLanguageChange}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav-tab ${activeTab === 'cartography' ? 'active' : ''}`}
              onClick={() => setActiveTab('cartography')}
            >
              🗺️ Cartography
            </button>
            <button 
              className={`nav-tab ${activeTab === 'poc1' ? 'active' : ''}`}
              onClick={() => setActiveTab('poc1')}
            >
              🔐 POC 1: IAM
            </button>
            <button 
              className={`nav-tab ${activeTab === 'poc2' ? 'active' : ''}`}
              onClick={() => setActiveTab('poc2')}
            >
              ✅ POC 2: ISO/NIS2
            </button>
            <button 
              className={`nav-tab ${activeTab === 'poc3' ? 'active' : ''}`}
              onClick={() => setActiveTab('poc3')}
            >
              💬 POC 3: IA
            </button>
            <button 
              className={`nav-tab ${activeTab === 'poc4' ? 'active' : ''}`}
              onClick={() => setActiveTab('poc4')}
            >
              🚨 POC 4: Anomalies
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard language={language} />}
        {activeTab === 'cartography' && <Cartography language={language} />}
        {activeTab === 'poc1' && <POC1_IAM language={language} />}
        {activeTab === 'poc2' && <POC2_Conformity language={language} />}
        {activeTab === 'poc3' && <POC3_Assistant language={language} />}
        {activeTab === 'poc4' && <POC4_Anomalies language={language} />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;