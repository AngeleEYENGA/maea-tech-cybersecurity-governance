import React from 'react';

export default function Header({ language, setLanguage, theme, toggleTheme }) {
  const text = {
    fr: {
      upload: 'Charger',
      settings: 'Paramètres'
    },
    en: {
      upload: 'Upload',
      settings: 'Settings'
    }
  };

  const t = text[language] || text.fr;

  return (
    <header className="bg-blue-900 dark:bg-blue-950 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔒</span>
            <div>
              <h1 className="text-xl font-bold">MAEA TECH</h1>
              <p className="text-xs text-blue-200">Cybersecurity Governance</p>
            </div>
          </div>

          {/* Message de bienvenue */}
          <div className="hidden md:block text-sm text-blue-100">
            <p>Évaluez votre conformité ISO 27001/NIS2 et cartographiez vos risques</p>
          </div>

          {/* Contrôles */}
          <div className="flex gap-3 items-center flex-wrap justify-end">
            {/* Langue */}
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium cursor-pointer"
            >
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
            </select>

            {/* Thème */}
            <button 
              onClick={toggleTheme}
              className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-2 rounded text-xl font-medium transition"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Upload */}
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition">
              📁 {t.upload}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}