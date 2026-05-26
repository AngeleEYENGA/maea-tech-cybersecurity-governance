import React, { useState } from "react";
import { sampleIAMData } from "../utils/sampleIAMData";
import {
  calculateIAMRiskScore,
  getRiskCategory,
  detectIssues,
  calculateGlobalStats,
} from "../utils/iamScoring";
import { getIAMRecommendations } from "../utils/claudeAPI";

export default function POC1_IAM({ language }) {
  const [iamData, setIamData] = useState(sampleIAMData);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const text = {
    fr: {
      title: "🔐 Audit IAM Intelligent",
      subtitle:
        "Analyse des comptes utilisateurs et détection des anomalies",
      uploadFile: "Charger fichier IAM",
      analyze: "Analyser",
      findings: "Résultats",
      highRisk: "Risque Élevé",
      mediumRisk: "Risque Moyen",
      lowRisk: "Risque Faible",
      criticalRisk: "Risque Critique",
      users: "Utilisateurs",
      riskScore: "Score de Risque",
      lastLogin: "Dernière Connexion",
      user: "Utilisateur",
      role: "Rôle",
      status: "Statut",
      mfa: "MFA",
      issues: "Problèmes Détectés",
      recommendations: "Recommandations",
      stats: "Statistiques",
      export: "Exporter le Rapport",
      analyzing: "Analyse en cours...",
      critical: "Critique",
      high: "Élevé",
      medium: "Moyen",
      low: "Faible",
      action: "Action",
      priority: "Priorité",
      impact: "Impact",
      effort: "Effort",
      summary: "Résumé",
      nextSteps: "Prochaines Étapes",
      enabled: "Oui",
      disabled: "Non",
    },
    en: {
      title: "🔐 Intelligent IAM Audit",
      subtitle: "User account analysis and anomaly detection",
      uploadFile: "Upload IAM file",
      analyze: "Analyze",
      findings: "Findings",
      highRisk: "High Risk",
      mediumRisk: "Medium Risk",
      lowRisk: "Low Risk",
      criticalRisk: "Critical Risk",
      users: "Users",
      riskScore: "Risk Score",
      lastLogin: "Last Login",
      user: "User",
      role: "Role",
      status: "Status",
      mfa: "MFA",
      issues: "Detected Issues",
      recommendations: "Recommendations",
      stats: "Statistics",
      export: "Export Report",
      analyzing: "Analyzing...",
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low",
      action: "Action",
      priority: "Priority",
      impact: "Impact",
      effort: "Effort",
      summary: "Summary",
      nextSteps: "Next Steps",
      enabled: "Yes",
      disabled: "No",
    },
  };

  const t = text[language] || text.fr;

  // Analyse les données IAM
  const handleAnalyze = async () => {
    setLoading(true);

    // Calcule les risques pour chaque utilisateur
    const enrichedData = iamData.map((user) => ({
      ...user,
      riskScore: calculateIAMRiskScore(user),
      issues: detectIssues(user),
    }));

    // Collecte tous les issues
    const allIssues = enrichedData.flatMap((u) => u.issues);

    // Obtient les recommandations via Claude API
    const recommendations = await getIAMRecommendations(enrichedData, allIssues);

    // Calcule les stats globales
    const stats = calculateGlobalStats(iamData);

    setAnalysisResults({
      users: enrichedData,
      allIssues,
      recommendations,
      stats,
      analyzedAt: new Date().toLocaleString(
        language === "fr" ? "fr-FR" : "en-US"
      ),
    });

    setActiveTab("overview");
    setLoading(false);
  };

  const getRiskColor = (score) => {
    if (score >= 80)
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
    if (score >= 60)
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
    if (score >= 40)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
  };

  const getRiskIcon = (score) => {
    if (score >= 80) return "🔴";
    if (score >= 60) return "🟠";
    if (score >= 40) return "🟡";
    return "🟢";
  };

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="card p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Upload & Analyze Section */}
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-4">📊 {t.analyze}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {language === "fr"
            ? "Cliquez sur 'Analyser' pour évaluer votre IAM avec les données d'exemple (ou uploadez vos données)"
            : "Click 'Analyze' to evaluate your IAM with sample data (or upload your own)"}
        </p>
        <div className="flex gap-4 flex-wrap">
          <input
            type="file"
            accept=".csv,.xlsx"
            className="flex-1 min-w-[200px]"
            disabled
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.analyzing : t.analyze}
          </button>
        </div>
      </div>

      {/* Results */}
      {analysisResults && (
        <>
          {/* Navigation Tabs */}
          <div className="card p-0 border-b border-gray-200 dark:border-gray-700">
            <div className="nav-tabs">
              <button
                className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                📈 {t.stats}
              </button>
              <button
                className={`nav-tab ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                👥 {t.users} ({analysisResults.users.length})
              </button>
              <button
                className={`nav-tab ${activeTab === "issues" ? "active" : ""}`}
                onClick={() => setActiveTab("issues")}
              >
                ⚠️ {t.issues} ({analysisResults.allIssues.length})
              </button>
              <button
                className={`nav-tab ${
                  activeTab === "recommendations" ? "active" : ""
                }`}
                onClick={() => setActiveTab("recommendations")}
              >
                💡 {t.recommendations}
              </button>
            </div>
          </div>

          {/* TAB 1: Stats Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="kpi-card bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.users}
                  </p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {analysisResults.stats.totalUsers}
                  </p>
                </div>

                <div className="kpi-card bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.critical}
                  </p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {analysisResults.stats.criticalCount}
                  </p>
                </div>

                <div className="kpi-card bg-orange-50 dark:bg-orange-900/20">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.high}
                  </p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    {analysisResults.stats.highCount}
                  </p>
                </div>

                <div className="kpi-card bg-yellow-50 dark:bg-yellow-900/20">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.mfa}
                  </p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {analysisResults.stats.mfaDisabledCount}
                  </p>
                </div>
              </div>

              <div className="card p-8 border-l-4 border-red-600">
                <h4 className="font-bold mb-3">🚨 {t.criticalRisk}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {analysisResults.stats.adminsWithoutMFA}{" "}
                  {language === "fr"
                    ? "administrateur(s) sans MFA"
                    : "admin(s) without MFA"}
                </p>
                <div className="alert alert-danger">
                  {language === "fr"
                    ? "C'est votre risque le plus critique. Les administrateurs DOIVENT avoir l'authentification multi-facteurs."
                    : "This is your highest risk. Administrators MUST have multi-factor authentication."}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Users Table */}
          {activeTab === "users" && (
            <div className="card p-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-4 font-bold">{t.user}</th>
                      <th className="text-left py-2 px-4 font-bold">{t.role}</th>
                      <th className="text-left py-2 px-4 font-bold">{t.mfa}</th>
                      <th className="text-left py-2 px-4 font-bold">
                        {t.lastLogin}
                      </th>
                      <th className="text-left py-2 px-4 font-bold">
                        {t.riskScore}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResults.users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-3 px-4 font-medium">{user.username}</td>
                        <td className="py-3 px-4 text-sm">{user.role}</td>
                        <td className="py-3 px-4">
                          <span className="text-sm">
                            {user.mfaEnabled ? t.enabled : t.disabled}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded text-xs font-bold ${getRiskColor(
                              user.riskScore
                            )}`}
                          >
                            {getRiskIcon(user.riskScore)} {user.riskScore}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Issues */}
          {activeTab === "issues" && (
            <div className="card p-8">
              <div className="space-y-3">
                {analysisResults.allIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded border-l-4 ${
                      issue.severity === "CRITICAL"
                        ? "bg-red-50 dark:bg-red-900/20 border-red-600"
                        : issue.severity === "HIGH"
                        ? "bg-orange-50 dark:bg-orange-900/20 border-orange-600"
                        : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-600"
                    }`}
                  >
                    <p className="font-bold text-sm">
                      {issue.severity === "CRITICAL"
                        ? "🔴"
                        : issue.severity === "HIGH"
                        ? "🟠"
                        : "🟡"}{" "}
                      {issue.issue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Recommendations */}
          {activeTab === "recommendations" && (
            <div className="space-y-4">
              {analysisResults.recommendations.summary && (
                <div className="card p-8 border-l-4 border-blue-600">
                  <h4 className="font-bold mb-3">{t.summary}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {analysisResults.recommendations.summary}
                  </p>
                </div>
              )}

              <div className="card p-8">
                <h4 className="font-bold mb-4">📋 {t.action}</h4>
                <div className="space-y-3">
                  {analysisResults.recommendations.recommendations.map(
                    (rec, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded border-l-4 ${
                          rec.priority === "CRITICAL"
                            ? "bg-red-50 dark:bg-red-900/20 border-red-600"
                            : rec.priority === "HIGH"
                            ? "bg-orange-50 dark:bg-orange-900/20 border-orange-600"
                            : rec.priority === "MEDIUM"
                            ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-600"
                            : "bg-green-50 dark:bg-green-900/20 border-green-600"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <p className="font-bold text-sm">{rec.action}</p>
                          <span className="px-2 py-1 rounded text-xs font-bold bg-white dark:bg-gray-800">
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {rec.impact}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t.effort}: {rec.estimatedEffort}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {analysisResults.recommendations.nextSteps && (
                <div className="card p-8 border-l-4 border-green-600">
                  <h4 className="font-bold mb-3">{t.nextSteps}</h4>
                  <ol className="space-y-2">
                    {analysisResults.recommendations.nextSteps.map(
                      (step, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="font-bold">{idx + 1}.</span> {step}
                        </li>
                      )
                    )}
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {language === "fr" ? "Analysé le" : "Analyzed at"}:{" "}
              {analysisResults.analyzedAt}
            </p>
            <button className="btn btn-primary">{t.export}</button>
          </div>
        </>
      )}
    </div>
  );
}