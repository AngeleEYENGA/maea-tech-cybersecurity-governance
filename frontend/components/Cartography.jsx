import React, { useState } from 'react';

export default function Cartography({ language }) {
  const [selectedDomain, setSelectedDomain] = useState(null);

  const text = {
    fr: {
      title: '🗺️ Cartographie des Risques',
      subtitle: 'Visualisation des domaines et niveaux de risque',
      domains: 'Domaines',
      riskLevel: 'Niveau de Risque',
      vulnerabilities: 'Vulnérabilités',
      details: 'Détails'
    },
    en: {
      title: '🗺️ Risk Cartography',
      subtitle: 'Visualization of domains and risk levels',
      domains: 'Domains',
      riskLevel: 'Risk Level',
      vulnerabilities: 'Vulnerabilities',
      details: 'Details'
    }
  };

  const t = text[language] || text.fr;

  const domains = [
    { id: 1, name: language === 'fr' ? 'Accès & Authentification' : 'Access & Authentication', risk: 'high', color: 'bg-red-500' },
    { id: 2, name: language === 'fr' ? 'Données' : 'Data', risk: 'medium', color: 'bg-yellow-500' },
    { id: 3, name: language === 'fr' ? 'Infrastructure' : 'Infrastructure', risk: 'low', color: 'bg-green-500' },
    { id: 4, name: language === 'fr' ? 'Gouvernance' : 'Governance', risk: 'medium', color: 'bg-yellow-500' },
    { id: 5, name: language === 'fr' ? 'Continuité' : 'Continuity', risk: 'low', color: 'bg-green-500' },
    { id: 6, name: language === 'fr' ? 'Conformité' : 'Compliance', risk: 'high', color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="card p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Map Visualization */}
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-6">Interactive Map</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {domains.map(domain => (
            <div
              key={domain.id}
              onClick={() => setSelectedDomain(domain)}
              className={`p-6 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                domain.color
              } text-white font-bold text-center hover:shadow-lg`}
            >
              <p className="text-sm">{domain.name}</p>
              <p className="text-xs mt-2 opacity-80">{domain.risk}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Details */}
      {selectedDomain && (
        <div className="card p-8 border-l-4 border-blue-600">
          <h3 className="text-xl font-bold mb-4">{selectedDomain.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.riskLevel}</p>
              <p className={`text-lg font-bold ${
                selectedDomain.risk === 'high' ? 'text-red-600' :
                selectedDomain.risk === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {selectedDomain.risk.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.vulnerabilities}</p>
              <p className="text-lg font-bold">
                {selectedDomain.id === 1 ? '5' : selectedDomain.id === 4 ? '3' : '2'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-4">{language === 'fr' ? 'Légende' : 'Legend'}</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span>{language === 'fr' ? 'Risque Faible' : 'Low Risk'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            <span>{language === 'fr' ? 'Risque Moyen' : 'Medium Risk'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span>{language === 'fr' ? 'Risque Élevé' : 'High Risk'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}