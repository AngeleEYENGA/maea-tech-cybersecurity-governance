import React, { useState } from 'react';

export default function POC4_Anomalies({ language }) {
  const [anomalies] = useState([
    { id: 1, type: 'Connexion inhabituelle', user: 'john.doe', time: '14:32', severity: 'high', ip: '192.168.1.100' },
    { id: 2, type: 'Accès privilégié anormal', user: 'jane.smith', time: '11:45', severity: 'medium', ip: '10.0.0.50' },
    { id: 3, type: 'Tentative de dépassement de quota', user: 'bob.wilson', time: '09:15', severity: 'low', ip: '172.16.0.1' },
    { id: 4, type: 'Changement de permissions', user: 'admin', time: '16:22', severity: 'critical', ip: '192.168.1.200' },
  ]);

  const text = {
    fr: {
      title: '🚨 Détection d\'Anomalies IAM',
      subtitle: 'Identification des comportements suspects en temps réel',
      alertsDetected: 'Alertes Détectées',
      type: 'Type',
      user: 'Utilisateur',
      time: 'Heure',
      severity: 'Sévérité',
      ip: 'Adresse IP',
      critical: 'Critique',
      high: 'Élevé',
      medium: 'Moyen',
      low: 'Faible',
      review: 'Examiner',
      details: 'Détails'
    },
    en: {
      title: '🚨 IAM Anomaly Detection',
      subtitle: 'Identification of suspicious behaviors in real-time',
      alertsDetected: 'Alerts Detected',
      type: 'Type',
      user: 'User',
      time: 'Time',
      severity: 'Severity',
      ip: 'IP Address',
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      review: 'Review',
      details: 'Details'
    }
  };

  const t = text[language] || text.fr;

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return '';
    }
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '';
    }
  };

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="card p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Alert Count */}
      <div className="kpi-card bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
        <p className="text-sm text-gray-600 dark:text-gray-400">{t.alertsDetected}</p>
        <p className="text-4xl font-bold text-red-600 mt-3">{anomalies.length}</p>
      </div>

      {/* Anomalies Table */}
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-6">{t.details}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-4 font-bold">{t.type}</th>
                <th className="text-left py-2 px-4 font-bold">{t.user}</th>
                <th className="text-left py-2 px-4 font-bold">{t.time}</th>
                <th className="text-left py-2 px-4 font-bold">{t.ip}</th>
                <th className="text-left py-2 px-4 font-bold">{t.severity}</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map(item => (
                <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-3 px-4 font-medium">{item.type}</td>
                  <td className="py-3 px-4">{item.user}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{item.time}</td>
                  <td className="py-3 px-4 text-xs font-mono text-gray-600 dark:text-gray-400">{item.ip}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-2 w-fit ${getSeverityColor(item.severity)}`}>
                      <span>{getSeverityIcon(item.severity)}</span>
                      {item.severity === 'critical' ? t.critical : item.severity === 'high' ? t.high : item.severity === 'medium' ? t.medium : t.low}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-8 border-l-4 border-red-600">
          <h4 className="font-bold mb-4">🚨 {language === 'fr' ? 'Actions Immédiates' : 'Immediate Actions'}</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• {language === 'fr' ? 'Vérifier la connexion critique' : 'Check critical connection'}</li>
            <li>• {language === 'fr' ? 'Isoler le compte suspect' : 'Isolate suspicious account'}</li>
            <li>• {language === 'fr' ? 'Notifier l\'équipe sécurité' : 'Notify security team'}</li>
          </ul>
        </div>

        <div className="card p-8 border-l-4 border-blue-600">
          <h4 className="font-bold mb-4">📊 {language === 'fr' ? 'Statistiques' : 'Statistics'}</h4>
          <div className="space-y-2 text-sm">
            <p>{language === 'fr' ? 'Critiques' : 'Critical'}: <span className="font-bold">1</span></p>
            <p>{language === 'fr' ? 'Élevés' : 'High'}: <span className="font-bold">1</span></p>
            <p>{language === 'fr' ? 'Moyens' : 'Medium'}: <span className="font-bold">1</span></p>
            <p>{language === 'fr' ? 'Faibles' : 'Low'}: <span className="font-bold">1</span></p>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="text-center">
        <button className="btn btn-primary">
          {language === 'fr' ? '📥 Exporter les Alertes' : '📥 Export Alerts'}
        </button>
      </div>
    </div>
  );
}