import React, { useState } from 'react';

export default function POC1_IAM({ language }) {
  const [iamData, setIamData] = useState([
    { id: 1, user: 'john.doe', role: 'Admin', lastLogin: '2024-01-15', riskScore: 85, status: 'high' },
    { id: 2, user: 'jane.smith', role: 'Manager', lastLogin: '2024-01-16', riskScore: 45, status: 'low' },
    { id: 3, user: 'bob.wilson', role: 'User', lastLogin: '2024-01-12', riskScore: 65, status: 'medium' },
  ]);

  const text = {
    fr: {
      title: '🔐 Audit IAM Intelligent',
      subtitle: 'Analyse des comptes utilisateurs et détection des anomalies',
      analysis: 'Analyse',
      users: 'Utilisateurs',
      riskScore: 'Score de Risque',
      lastLogin: 'Dernière Connexion',
      uploadFile: 'Charger fichier IAM',
      analyze: 'Analyser',
      findings: 'Résultats',
      highRisk: 'Risque Élevé',
      mediumRisk: 'Risque Moyen',
      lowRisk: 'Risque Faible'
    },
    en: {
      title: '🔐 Intelligent IAM Audit',
      subtitle: 'User account analysis and anomaly detection',
      analysis: 'Analysis',
      users: 'Users',
      riskScore: 'Risk Score',
      lastLogin: 'Last Login',
      uploadFile: 'Upload IAM file',
      analyze: 'Analyze',
      findings: 'Findings',
      highRisk: 'High Risk',
      mediumRisk: 'Medium Risk',
      lowRisk: 'Low Risk'
    }
  };

  const t = text[language] || text.fr;

  const getRiskColor = (score) => {
    if (score >= 70) return 'text-red-600 bg-red-50 dark:bg-red-900/20';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-green-600 bg-green-50 dark:bg-green-900/20';
  };

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="card p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Upload Section */}
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-4">{t.analysis}</h3>
        <div className="flex gap-4 flex-wrap">
          <input type="file" accept=".csv,.xlsx" className="flex-1" />
          <button className="btn btn-primary">{t.uploadFile}</button>
          <button className="btn btn-secondary">{t.analyze}</button>
        </div>
      </div>

      {/* Results Table */}
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-4">{t.findings}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-4 font-bold">{language === 'fr' ? 'Utilisateur' : 'User'}</th>
                <th className="text-left py-2 px-4 font-bold">{language === 'fr' ? 'Rôle' : 'Role'}</th>
                <th className="text-left py-2 px-4 font-bold">{t.lastLogin}</th>
                <th className="text-left py-2 px-4 font-bold">{t.riskScore}</th>
                <th className="text-left py-2 px-4 font-bold">{language === 'fr' ? 'Statut' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {iamData.map(item => (
                <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-3 px-4">{item.user}</td>
                  <td className="py-3 px-4">{item.role}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{item.lastLogin}</td>
                  <td className={`py-3 px-4 font-bold ${getRiskColor(item.riskScore)}`}>
                    {item.riskScore}%
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      item.status === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      item.status === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {item.status === 'high' ? t.highRisk : item.status === 'medium' ? t.mediumRisk : t.lowRisk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card p-8 border-l-4 border-blue-600">
        <h3 className="text-xl font-bold mb-4">💡 {language === 'fr' ? 'Recommandations' : 'Recommendations'}</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span>⚠️</span>
            <span>{language === 'fr' ? 'Réduire les droits admin pour john.doe' : 'Reduce admin rights for john.doe'}</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>{language === 'fr' ? 'Implémenter l\'authentification multi-facteurs' : 'Implement multi-factor authentication'}</span>
          </li>
          <li className="flex gap-2">
            <span>⚠️</span>
            <span>{language === 'fr' ? 'Archiver les comptes inactifs' : 'Archive inactive accounts'}</span>
          </li>
        </ul>
      </div>

      {/* Export */}
      <div className="text-center">
        <button className="btn btn-primary">
          {language === 'fr' ? '📥 Exporter le Rapport' : '📥 Export Report'}
        </button>
      </div>
    </div>
  );
}