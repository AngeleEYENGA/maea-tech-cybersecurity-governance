import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-8 mt-12 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="text-sm">
            <p>© 2024 MAEA Tech - Cybersecurity & Governance Platform</p>
            <p className="text-xs text-gray-500 mt-1">Master 1 - Expert en Systèmes d'Information et Sécurité</p>
          </div>
          <div className="flex gap-4 items-center">
            <a 
              href="https://www.linkedin.com/in/ang%C3%A8le-eyenga-3182a7191/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
              title="Visit LinkedIn profile"
            >
              <span className="text-lg">🔗</span>
              <span className="font-medium">Angèle Eyenga</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}