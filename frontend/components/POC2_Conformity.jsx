import React, { useState } from 'react';

export default function POC2_Conformity({ language }) {
  const [scores, setScores] = useState({
    iso27001: 72,
    nis2: 68,
  });

  const [domains, setDomains] = useState([
    { name: language === 'fr' ? 'Gouvernance' : 'Governance', iso: 80, nis2: 75 },
    { name: language === 'fr' ? 'Gestion des actifs' : 'Asset Management', iso: 65, nis2: 60 },
    { name: language === 'fr' ? 'Accès' : 'Access Control', iso: 75, nis2: 70 },
    { name: language === 'fr' ? 'Cryptographie' : 'Cryptography', iso: 85, nis2: 80 },
  ]);

  const text = {
    fr: {
      title: '✅ Conformité ISO 27001 & NIS2',
      subtitle: 'Évaluation de la maturité et conformité réglementaire',
      isoScore: 'Score ISO 27001',
      nis2Score: 'Score NIS2',
      assessment: 'Questionnaire',
      domains: 'Domaines',
      recommendations: 'Recommandations',
      startAssessment: 'Démarrer l\'évaluation',
      export: 'Exporter le rapport'
    },
    en: {
      title: '✅ ISO 27001 & NIS2 Compliance',
      subtitle: 'Maturity assessment and regulatory compliance',
      isoScore: 'ISO 27001 Score',
      nis2Score: 'NIS2 Score',
      assessment: 'Questionnaire',
      domains: 'Domains',
      recommendations: 'Recommendations',
      startAssessment: 'Start Assessment',
      export: 'Export Report'
    }
  };

  const t = text[language] || text.fr;

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="card p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="kpi-card bg-blue-50 dark:bg-blue-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.isoScore}</p>
          <p className="text-4xl font-bold text-blue-600 mt-3">{scores.iso27001}%</p>
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-blue-600 transition-all"
              style={{ width: `${scores.iso27001}%` }}
            ></div>
          </div>
        </div>

        <div className="kpi-card bg-green-50 dark:bg-green-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.nis2Score}</p>
          <p className="text-4xl font-bold text-green-600 mt-3">{scores.nis2}%</p>
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-green-600 transition-all"
              style={{ width: `${scores.nis2}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Assessment Button */}
      <div className="card p-8 text-center">
        <h3 className="text-xl font-bold mb-4">{t.assessment}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {language === 'fr' 
            ? 'Répondez à 50 questions pour évaluer votre conformité'
            : 'Answer 50 questions to evaluate your compliance'}
        </p>
        <button className="btn btn-primary btn-lg">{t.startAssessment}</button>
      </div>

      {/* Domains Scores */}
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-6">{t.domains}</h3>
        <div className="space-y-4">
          {domains.map((domain, idx) => (
            <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
              <p className="font-bold mb-3">{domain.name}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">ISO 27001</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${domain.iso}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1">{domain.iso}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">NIS2</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-600"
                      style={{ width: `${domain.nis2}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1">{domain.nis2}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="text-center">
        <button className="btn btn-primary">
          {language === 'fr' ? '📥 Exporter le Rapport de Conformité' : '📥 Export Compliance Report'}
        </button>
      </div>
    </div>
  );
}