/**
 * Calcule le score de risque IAM pour un utilisateur
 * Score 0-100 : 0 = Très sûr, 100 = Très risqué
 */
export const calculateIAMRiskScore = (user) => {
  let riskScore = 0;

  // 1. Pas de MFA = +25 points
  if (!user.mfaEnabled) {
    riskScore += 25;
  }

  // 2. Accès privilégié = +20 points
  if (user.privilegedAccess) {
    riskScore += 20;
  }

  // 3. Dernier login > 30 jours = +15 points
  const lastLoginDate = new Date(user.lastLogin);
  const daysInactive = Math.floor(
    (new Date() - lastLoginDate) / (1000 * 60 * 60 * 24)
  );
  if (daysInactive > 30) {
    riskScore += 15;
  }

  // 4. Changement password > 6 mois = +20 points
  const lastPwdDate = new Date(user.lastPasswordChange);
  const daysSincePwdChange = Math.floor(
    (new Date() - lastPwdDate) / (1000 * 60 * 60 * 24)
  );
  if (daysSincePwdChange > 180) {
    riskScore += 20;
  }

  // 5. Compte inactif = +10 points
  if (!user.accountActive) {
    riskScore += 10;
  }

  // 6. Admin sans MFA + inactif = bonus risque
  if (user.privilegedAccess && !user.mfaEnabled && daysInactive > 60) {
    riskScore += 10;
  }

  return Math.min(riskScore, 100);
};

/**
 * Catégorise le risque
 */
export const getRiskCategory = (score) => {
  if (score >= 80) return { category: "CRITICAL", color: "red", icon: "🔴" };
  if (score >= 60) return { category: "HIGH", color: "orange", icon: "🟠" };
  if (score >= 40) return { category: "MEDIUM", color: "yellow", icon: "🟡" };
  return { category: "LOW", color: "green", icon: "🟢" };
};

/**
 * Génère une liste d'issues détectées
 */
export const detectIssues = (user) => {
  const issues = [];

  if (!user.mfaEnabled) {
    issues.push({
      severity: "HIGH",
      issue: `MFA non activée pour ${user.username}`,
    });
  }

  if (user.privilegedAccess && !user.mfaEnabled) {
    issues.push({
      severity: "CRITICAL",
      issue: `Admin ${user.username} sans MFA (très risqué)`,
    });
  }

  const daysInactive = Math.floor(
    (new Date() - new Date(user.lastLogin)) / (1000 * 60 * 60 * 24)
  );
  if (daysInactive > 90) {
    issues.push({
      severity: "MEDIUM",
      issue: `${user.username} inactif depuis ${daysInactive} jours`,
    });
  }

  const daysSincePwdChange = Math.floor(
    (new Date() - new Date(user.lastPasswordChange)) / (1000 * 60 * 60 * 24)
  );
  if (daysSincePwdChange > 180) {
    issues.push({
      severity: "MEDIUM",
      issue: `${user.username} : password non changé depuis ${daysSincePwdChange} jours`,
    });
  }

  if (!user.accountActive) {
    issues.push({
      severity: "LOW",
      issue: `Compte ${user.username} désactivé mais présent en BD`,
    });
  }

  return issues;
};

/**
 * Calcule les stats globales
 */
export const calculateGlobalStats = (users) => {
  const totalUsers = users.length;
  const criticalCount = users.filter(
    (u) => calculateIAMRiskScore(u) >= 80
  ).length;
  const highCount = users.filter(
    (u) => calculateIAMRiskScore(u) >= 60 && calculateIAMRiskScore(u) < 80
  ).length;
  const mfaDisabledCount = users.filter((u) => !u.mfaEnabled).length;
  const adminsWithoutMFA = users.filter(
    (u) => u.privilegedAccess && !u.mfaEnabled
  ).length;

  return {
    totalUsers,
    criticalCount,
    highCount,
    mfaDisabledCount,
    adminsWithoutMFA,
  };
};