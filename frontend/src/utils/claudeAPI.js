/**
 * Appelle Claude API pour obtenir des recommandations IAM intelligentes
 */
export const getIAMRecommendations = async (iamData, issues) => {
  try {
    const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;

    if (!apiKey) {
      console.warn("Claude API key not found - using mock recommendations");
      return getMockRecommendations();
    }

    const prompt = `Tu es un expert en sécurité IAM. Analyse ces données d'audit et fournis des recommandations prioritaires:

Données utilisateurs:
${JSON.stringify(iamData, null, 2)}

Problèmes détectés:
${issues.map((i) => `- [${i.severity}] ${i.issue}`).join("\n")}

Fournis une réponse JSON avec:
{
  "recommendations": [
    {
      "priority": "CRITICAL|HIGH|MEDIUM|LOW",
      "action": "action à entreprendre",
      "impact": "impact sur la sécurité",
      "estimatedEffort": "Faible|Moyen|Élevé"
    }
  ],
  "summary": "Résumé exécutif court",
  "nextSteps": ["étape 1", "étape 2", "étape 3"]
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(
        "Claude API error:",
        response.status,
        await response.text()
      );
      return getMockRecommendations();
    }

    const data = await response.json();
    const textContent = data.content.find((c) => c.type === "text");

    if (!textContent) {
      return getMockRecommendations();
    }

    // Parse JSON from response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return getMockRecommendations();
  } catch (error) {
    console.error("Error calling Claude API:", error);
    return getMockRecommendations();
  }
};

/**
 * Mock recommendations (fallback si API indisponible)
 */
export const getMockRecommendations = () => {
  return {
    recommendations: [
      {
        priority: "CRITICAL",
        action: "Activer MFA pour tous les administrateurs immédiatement",
        impact:
          "Réduit drastiquement les risques de compromise de comptes privilégiés",
        estimatedEffort: "Moyen",
      },
      {
        priority: "HIGH",
        action:
          "Implémenter une politique de réinitialisation de mot de passe (90 jours)",
        impact:
          "Améliore la sécurité des comptes et limite l'impact des fuites",
        estimatedEffort: "Moyen",
      },
      {
        priority: "HIGH",
        action: "Archiver les comptes inactifs depuis plus de 6 mois",
        impact: "Réduit la surface d'attaque",
        estimatedEffort: "Faible",
      },
      {
        priority: "MEDIUM",
        action: "Mettre en place une surveillance des connexions inhabituelles",
        impact: "Détecte les accès non autorisés",
        estimatedEffort: "Élevé",
      },
      {
        priority: "MEDIUM",
        action:
          "Audit mensuel des droits d'accès vs rôles (principe du moindre privilège)",
        impact: "Élimine l'escalade de privilèges",
        estimatedEffort: "Moyen",
      },
    ],
    summary:
      "Votre IAM présente plusieurs risques critiques, notamment l'absence de MFA pour les administrateurs. Les actions prioritaires doivent se concentrer sur l'authentification multi-facteurs et la gestion des accès privilégiés.",
    nextSteps: [
      "Activer MFA immédiatement pour admins",
      "Audit des droits d'accès",
      "Mettre en place surveillance logs",
      "Formation sécurité utilisateurs",
    ],
  };
};