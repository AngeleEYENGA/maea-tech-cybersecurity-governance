import React, { useState, useEffect } from 'react';

export default function Dashboard({ language }) {
  const [isoScore, setIsoScore] = useState(72);
  const [nis2Score, setNis2Score] = useState(68);
  const [anomalies, setAnomalies] = useState(12);
  const [riskLevel, setRiskLevel] = useState('medium');

  const text = {
    fr: {
      welcome: '🎯 Tableau de Bord Global',
      subtitle: 'Vue d\'ensemble de votre gouvernance cybersécurité',
      isoScore: 'Score ISO 27001',
      nis2Score: 'Score NIS2',
      anomalies: 'Anomalies Détectées',
      riskLevel: 'Niveau de Risque',
      low: 'Faible',
      medium: 'Moyen',
      high: 'Élevé',
      critical: 'Critique',
      trend: 'Tendance',
      lastUpdated: 'Dernière mise à jour',
      now: 'À l\'instant'
    },
    en: {
      welcome: '🎯 Global Dashboard',
      subtitle: 'Overview of your cybersecurity governance',
      isoScore: 'ISO 27001 Score',
      nis2Score: 'NIS2 Score',
      anomalies: 'Detected Anomalies',
      riskLevel: 'Risk Level',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical',
      trend: 'Trend',
      lastUpdated: 'Last updated',
      now: 'Just now'
    }
  };

  const t = text[language] || text.fr;

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskBgColor = (score) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600';
    if (score >= 60) return 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600';
    if (score >= 40) return 'bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600';
    return 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600';
  };

  return (
    <div className="space-y-8 fade-in">
      {/* Welcome Section */}
      <div className="card p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">{t.welcome}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ISO 27001 */}
        <div className={`kpi-card ${getRiskBgColor(isoScore)}`}>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.isoScore}</div>
          <div className={`text-4xl font-bold mt-3 ${getRiskColor(isoScore)}`}>{isoScore}%</div>
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${getRiskColor(isoScore).replace('text-', 'bg-')}`}
              style={{ width: `${isoScore}%` }}
            ></div>
          </div>
        </div>

        {/* NIS2 */}
        <div className={`kpi-card ${getRiskBgColor(nis2Score)}`}>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.nis2Score}</div>
          <div className={`text-4xl font-bold mt-3 ${getRiskColor(nis2Score)}`}>{nis2Score}%</div>
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${getRiskColor(nis2Score).replace('text-', 'bg-')}`}
              style={{ width: `${nis2Score}%` }}
            ></div>
          </div>
        </div>

        {/* Anomalies */}
        <div className="kpi-card bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.anomalies}</div>
          <div className="text-4xl font-bold mt-3 text-red-600">⚠️ {anomalies}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">À traiter</div>
        </div>

        {/* Risk Level */}
        <div className={`kpi-card ${getRiskBgColor(75)}`}>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.riskLevel}</div>
          <div className="text-2xl font-bold mt-3">⚠️ {t.medium}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{t.trend} ↗️</div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-6">📈 {language === 'fr' ? 'Évolution des Scores' : 'Score Evolution'}</h3>
        <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">{language === 'fr' ? 'Graphique (bientôt)' : 'Chart (coming soon)'}</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h4 className="font-bold mb-4">✅ {language === 'fr' ? 'Forces' : 'Strengths'}</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• {language === 'fr' ? 'Infrastructure bien structurée' : 'Well-structured infrastructure'}</li>
            <li>• {language === 'fr' ? 'Politiques documentées' : 'Documented policies'}</li>
            <li>• {language === 'fr' ? 'Audit en place' : 'Audit in place'}</li>
          </ul>
        </div>

        <div className="card">
          <h4 className="font-bold mb-4">⚠️ {language === 'fr' ? 'Risques' : 'Risks'}</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• {language === 'fr' ? 'Authentification MFA à renforcer' : 'MFA authentication to improve'}</li>
            <li>• {language === 'fr' ? 'Logs de sécurité incomplets' : 'Incomplete security logs'}</li>
            <li>• {language === 'fr' ? 'Conformité NIS2 en retard' : 'NIS2 compliance behind'}</li>
          </ul>
        </div>

        <div className="card">
          <h4 className="font-bold mb-4">🎯 {language === 'fr' ? 'Prochaines Étapes' : 'Next Steps'}</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• {language === 'fr' ? 'Audit complet IAM' : 'Complete IAM audit'}</li>
            <li>• {language === 'fr' ? 'Plan action 30j' : '30-day action plan'}</li>
            <li>• {language === 'fr' ? 'Réévaluation NIS2' : 'NIS2 reassessment'}</li>
          </ul>
        </div>
      </div>

      {/* Last Update */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>{t.lastUpdated}: {t.now}</p>
      </div>
    </div>
  );
}