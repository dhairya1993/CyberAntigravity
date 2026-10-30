/**
 * Forensic Completion Badge Calculation Engine
 * Inspects browser localStorage records to evaluate student badge eligibility.
 * 100% Client-Side, Zero Auth Barrier, Privacy-Preserving.
 */

export interface BadgeCriteria {
  required: number;
  current: number;
  description: string;
  isUnlocked: boolean;
  linkHref: string;
  linkLabel: string;
}

export interface ForensicBadge {
  id: 'phishing-detective' | 'url-investigator' | 'challenge-learner' | 'security-defender';
  title: string;
  tier: 'specialist' | 'investigator' | 'defender' | 'master';
  category: 'Forensic Lab' | 'Daily Defense' | 'Mastery';
  accentColor: 'rose' | 'amber' | 'cyan' | 'emerald';
  iconName: string;
  summary: string;
  verificationCode: string;
  criteria: BadgeCriteria;
  earnedDate: string | null;
}

const PHISHING_STORAGE_KEY = 'cyberantigravity_phishing_lab_v1';
const URL_STORAGE_KEY = 'cyberantigravity_url_lab_v1';
const CHALLENGE_STORAGE_KEY = 'cyberantigravity_daily_challenge_v1';

export interface StorageSnapshot {
  phishingCompletedCount: number;
  urlCompletedCount: number;
  dailyChallengeCount: number;
  lastActiveDate: string;
}

/**
 * Safely parses client-side lab progress from browser storage without throwing.
 */
export function getStorageSnapshot(): StorageSnapshot {
  if (typeof window === 'undefined') {
    return {
      phishingCompletedCount: 0,
      urlCompletedCount: 0,
      dailyChallengeCount: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
  }

  let phishingCompletedCount = 0;
  let urlCompletedCount = 0;
  let dailyChallengeCount = 0;
  let lastActiveDate = new Date().toISOString().split('T')[0];

  // 1. Phishing Lab
  try {
    const raw = window.localStorage.getItem(PHISHING_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.completedCases && typeof parsed.completedCases === 'object') {
        phishingCompletedCount = Object.keys(parsed.completedCases).length;
      }
    }
  } catch {
    // Graceful fallback
  }

  // 2. URL Lab
  try {
    const raw = window.localStorage.getItem(URL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.completedCases && typeof parsed.completedCases === 'object') {
        urlCompletedCount = Object.keys(parsed.completedCases).length;
      }
    }
  } catch {
    // Graceful fallback
  }

  // 3. Daily Challenge
  try {
    const raw = window.localStorage.getItem(CHALLENGE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (typeof parsed.totalCompleted === 'number' && Number.isFinite(parsed.totalCompleted)) {
          dailyChallengeCount = Math.max(0, parsed.totalCompleted);
        } else if (parsed.history && typeof parsed.history === 'object') {
          dailyChallengeCount = Object.keys(parsed.history).length;
        }
        if (typeof parsed.lastCompletedDate === 'string' && parsed.lastCompletedDate) {
          lastActiveDate = parsed.lastCompletedDate;
        }
      }
    }
  } catch {
    // Graceful fallback
  }

  return {
    phishingCompletedCount,
    urlCompletedCount,
    dailyChallengeCount,
    lastActiveDate,
  };
}

/**
 * Calculates current badge state based on stored progress snapshot.
 */
export function calculateForensicBadges(snapshot: StorageSnapshot): ForensicBadge[] {
  const { phishingCompletedCount, urlCompletedCount, dailyChallengeCount, lastActiveDate } = snapshot;

  const isPhishingUnlocked = phishingCompletedCount >= 5;
  const isUrlUnlocked = urlCompletedCount >= 6;
  const isChallengeUnlocked = dailyChallengeCount >= 3;
  const isSecurityDefenderUnlocked = isPhishingUnlocked && isUrlUnlocked;

  return [
    {
      id: 'phishing-detective',
      title: 'Phishing Forensics Detective',
      tier: 'investigator',
      category: 'Forensic Lab',
      accentColor: 'rose',
      iconName: 'ShieldAlert',
      summary: 'Demonstrated defensive triage across 5 multi-channel phishing, executive spoofing, and smishing cases.',
      verificationCode: 'CAG-LAB-PHISH-5X',
      earnedDate: isPhishingUnlocked ? lastActiveDate : null,
      criteria: {
        required: 5,
        current: Math.min(5, phishingCompletedCount),
        description: 'Complete all 5 simulated cases in the Phishing Detective Lab.',
        isUnlocked: isPhishingUnlocked,
        linkHref: '/scam-awareness/simulator#phishing-detective-lab',
        linkLabel: 'Launch Phishing Lab',
      },
    },
    {
      id: 'url-investigator',
      title: 'Suspicious URL Investigator',
      tier: 'investigator',
      category: 'Forensic Lab',
      accentColor: 'cyan',
      iconName: 'Search',
      summary: 'Mastered URL component dissection, RFC 3986 userinfo analysis, lookalike domains, and subdomain deception.',
      verificationCode: 'CAG-LAB-URL-6X',
      earnedDate: isUrlUnlocked ? lastActiveDate : null,
      criteria: {
        required: 6,
        current: Math.min(6, urlCompletedCount),
        description: 'Analyze all 6 forensic test cases in the Suspicious URL Lab.',
        isUnlocked: isUrlUnlocked,
        linkHref: '/tools/url-explainer',
        linkLabel: 'Launch URL Lab',
      },
    },
    {
      id: 'challenge-learner',
      title: 'Cyber Challenge Practitioner',
      tier: 'specialist',
      category: 'Daily Defense',
      accentColor: 'amber',
      iconName: 'Flame',
      summary: 'Exercised daily digital defensive reflexes across at least 3 unique calendar day cyber challenges.',
      verificationCode: 'CAG-DAILY-REFLEX-3D',
      earnedDate: isChallengeUnlocked ? lastActiveDate : null,
      criteria: {
        required: 3,
        current: Math.min(3, dailyChallengeCount),
        description: 'Complete at least 3 Daily Cyber Challenges.',
        isUnlocked: isChallengeUnlocked,
        linkHref: '/#daily-challenge',
        linkLabel: "Take Today's Challenge",
      },
    },
    {
      id: 'security-defender',
      title: 'CyberAntigravity Security Defender',
      tier: 'master',
      category: 'Mastery',
      accentColor: 'emerald',
      iconName: 'Award',
      summary: 'Comprehensive dual-laboratory mastery: successfully investigated both Phishing Detective and Suspicious URL forensic suites.',
      verificationCode: 'CAG-DEFENDER-DUAL-LAB',
      earnedDate: isSecurityDefenderUnlocked ? lastActiveDate : null,
      criteria: {
        required: 11,
        current: Math.min(5, phishingCompletedCount) + Math.min(6, urlCompletedCount),
        description: 'Unlock both Phishing Detective and Suspicious URL Investigator badges (11 total lab cases).',
        isUnlocked: isSecurityDefenderUnlocked,
        linkHref: '/scam-awareness/simulator',
        linkLabel: 'Explore Security Labs',
      },
    },
  ];
}
