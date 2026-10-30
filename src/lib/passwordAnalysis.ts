/**
 * Client-Side Password Security & Entropy Analysis Engine
 * 100% Private: Evaluated in local browser memory.
 * Never transmitted, never persisted, never logged.
 */

export type PasswordStrengthTier =
  | 'very_weak'
  | 'weak'
  | 'fair'
  | 'strong'
  | 'very_strong';

export interface AttackScenario {
  id: string;
  name: string;
  description: string;
  guessesPerSecond: number;
  category: 'online' | 'offline';
  constraintsNote: string;
}

export const ATTACK_SCENARIOS: AttackScenario[] = [
  {
    id: 'online-throttled',
    name: 'Online Login with Rate Limiting',
    description: '100 attempts / hour (~0.028 guesses/sec) — Standard banking or enterprise login with CAPTCHA and IP lockouts.',
    guessesPerSecond: 100 / 3600,
    category: 'online',
    constraintsNote: 'Defended by automated account lockout, IP tarpitting, and multi-factor authentication (MFA).',
  },
  {
    id: 'online-unthrottled',
    name: 'Online Unthrottled API Endpoint',
    description: '1,000 attempts / sec — Distributed botnet targeting an unprotected legacy mobile API or credential stuffing portal.',
    guessesPerSecond: 1000,
    category: 'online',
    constraintsNote: 'Requires cloud bot mitigation (e.g. Cloudflare Turnstile) and rate limiting to neutralize.',
  },
  {
    id: 'offline-slow-kdf',
    name: 'Offline Slow Memory-Hard Hash (Argon2id / bcrypt)',
    description: '10,000 guesses / sec — Modern cryptographic key derivation function executed on a dedicated multi-GPU cracking cluster.',
    guessesPerSecond: 10000,
    category: 'offline',
    constraintsNote: 'Memory-hard algorithms force GPUs to spend significant RAM and computation cycles per attempt.',
  },
  {
    id: 'offline-fast-gpu',
    name: 'Offline Fast Hash (MD5 / NTLM / SHA-1 on single GPU)',
    description: '10 Billion (10,000,000,000) guesses / sec — Single high-end consumer GPU (e.g. RTX 4090) cracking legacy unsalted hashes.',
    guessesPerSecond: 10_000_000_000,
    category: 'offline',
    constraintsNote: 'Fast mathematical hashes are obsolete for passwords; unsalted hashes can be queried via precomputed Rainbow Tables.',
  },
  {
    id: 'offline-supercluster',
    name: 'Offline Distributed ASIC / Supercomputing Cluster',
    description: '100 Trillion (100,000,000,000,000) guesses / sec — Nation-state or syndicate cluster attacking high-value targets.',
    guessesPerSecond: 100_000_000_000_000,
    category: 'offline',
    constraintsNote: 'Hypothetical upper boundary for massive distributed brute-force compute.',
  },
];

export interface DemoPreset {
  id: string;
  label: string;
  password: string;
  description: string;
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'short-predictable',
    label: 'Short & Predictable',
    password: 'password123',
    description: 'Common dictionary root + sequential digits',
  },
  {
    id: 'l33t-trap',
    label: 'L33t Substitution Trap',
    password: 'P@ssw0rd!2026',
    description: 'Predictable letter-for-symbol replacements',
  },
  {
    id: 'keyboard-walk',
    label: 'Keyboard Walk Pattern',
    password: 'qwerty!@#123',
    description: 'Adjacent keyboard keys + symbol row walk',
  },
  {
    id: 'diceware-passphrase',
    label: 'Diceware Passphrase',
    password: 'Solar-Falcon-River-Dancing-92',
    description: 'High entropy through random word length',
  },
];

export interface PasswordAnalysisResult {
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigits: boolean;
  hasSymbols: boolean;
  hasWhitespace: boolean;
  poolSize: number;
  entropyBits: number;
  tier: PasswordStrengthTier;
  tierLabel: string;
  tierColor: string;
  progressPercent: number;
  reasons: string[];
  vulnerabilities: {
    hasRepeated: boolean;
    hasSequential: boolean;
    hasCommonDictionary: boolean;
    hasL33tSubstitutions: boolean;
  };
  crackTimes: Record<string, string>;
}

const COMMON_PASSWORDS = new Set([
  'password',
  '123456',
  '12345678',
  '123456789',
  'qwerty',
  'admin',
  'welcome',
  'login',
  'iloveyou',
  'letmein',
  'secret',
  'football',
  'monkey',
  'dragon',
  'master',
  'sunshine',
  'princess',
  'charlie',
  'trustno1',
  'superman',
  'computer',
  'security',
  'cybersecurity',
]);

const SEQUENTIAL_SEQUENCES = [
  '123', '234', '345', '456', '567', '678', '789', '890',
  'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij',
  'qwe', 'wer', 'ert', 'rty', 'tyu', 'yui', 'uio', 'iop',
  'asd', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl',
  'zxc', 'xcv', 'cvb', 'vbn', 'bnm',
];

/**
 * Normalizes common leetspeak substitutions to check dictionary roots.
 */
function normalizeL33t(str: string): string {
  return str
    .toLowerCase()
    .replace(/[@4]/g, 'a')
    .replace(/[8]/g, 'b')
    .replace(/[3]/g, 'e')
    .replace(/[1!|]/g, 'i')
    .replace(/[0]/g, 'o')
    .replace(/[$5]/g, 's')
    .replace(/[7+]/g, 't');
}

const ZERO_BIG = BigInt(0);
const ONE_BIG = BigInt(1);
const TWO_BIG = BigInt(2);
const FOUR_BIG = BigInt(4);
const SIXTY_BIG = BigInt(60);
const HOURS_DAY_BIG = BigInt(24);
const DAYS_YEAR_BIG = BigInt(365);
const CENTURY_YEARS_BIG = BigInt(100);
const THOUSAND_YEARS_BIG = BigInt(1000);
const MILLION_YEARS_BIG = BigInt(1000000);
const BILLION_YEARS_BIG = BigInt(1000000000);
const TRILLION_YEARS_BIG = BigInt(1000000000000);
const QUADRILLION_YEARS_BIG = BigInt(1000000000000000);

/**
 * Calculates human-readable time from BigInt combinations and guesses per second.
 * Safe from floating-point overflow and NaN.
 */
export function formatCrackDuration(totalGuesses: bigint, guessesPerSec: number): string {
  if (totalGuesses <= ZERO_BIG || guessesPerSec <= 0) {
    return 'Instantly (< 1 second)';
  }

  // guessesPerSec can be fractional (e.g. 100/3600 = ~0.0278)
  let secondsBig: bigint;
  if (guessesPerSec < 1) {
    // Multiply by inverted rate
    const multiplier = BigInt(Math.round(1 / guessesPerSec));
    secondsBig = totalGuesses * multiplier;
  } else {
    const divisor = BigInt(Math.floor(guessesPerSec));
    secondsBig = totalGuesses / (divisor > ZERO_BIG ? divisor : ONE_BIG);
  }

  if (secondsBig < ONE_BIG) return 'Instantly (< 1 second)';
  if (secondsBig < SIXTY_BIG) return `${secondsBig} seconds`;

  const minutes = secondsBig / SIXTY_BIG;
  if (minutes < SIXTY_BIG) return `${minutes} minute${minutes === ONE_BIG ? '' : 's'}`;

  const hours = minutes / SIXTY_BIG;
  if (hours < HOURS_DAY_BIG) return `${hours} hour${hours === ONE_BIG ? '' : 's'}`;

  const days = hours / HOURS_DAY_BIG;
  if (days < DAYS_YEAR_BIG) return `${days} day${days === ONE_BIG ? '' : 's'}`;

  const years = days / DAYS_YEAR_BIG;
  if (years < CENTURY_YEARS_BIG) return `${years} year${years === ONE_BIG ? '' : 's'}`;
  if (years < THOUSAND_YEARS_BIG) return `${years / CENTURY_YEARS_BIG} centuries`;
  if (years < MILLION_YEARS_BIG) return `${(years / THOUSAND_YEARS_BIG).toLocaleString()} thousand years`;
  if (years < BILLION_YEARS_BIG) return `${(years / MILLION_YEARS_BIG).toLocaleString()} million years`;
  if (years < TRILLION_YEARS_BIG) return `${(years / BILLION_YEARS_BIG).toLocaleString()} billion years`;
  if (years < QUADRILLION_YEARS_BIG) return `${(years / TRILLION_YEARS_BIG).toLocaleString()} trillion years`;

  return 'Trillions of centuries (Astronomical timescale)';
}

/**
 * Pure client-side password security analysis.
 */
export function analyzePassword(password: string): PasswordAnalysisResult {
  const charArray = Array.from(password);
  const length = charArray.length;
  if (length === 0) {
    return {
      length: 0,
      hasLower: false,
      hasUpper: false,
      hasDigits: false,
      hasSymbols: false,
      hasWhitespace: false,
      poolSize: 0,
      entropyBits: 0,
      tier: 'very_weak',
      tierLabel: 'Very Weak',
      tierColor: 'text-red-400 border-red-500/30 bg-red-950/20',
      progressPercent: 0,
      reasons: ['No characters entered.'],
      vulnerabilities: {
        hasRepeated: false,
        hasSequential: false,
        hasCommonDictionary: false,
        hasL33tSubstitutions: false,
      },
      crackTimes: {
        'online-throttled': '0 seconds',
        'online-unthrottled': '0 seconds',
        'offline-slow-kdf': '0 seconds',
        'offline-fast-gpu': '0 seconds',
        'offline-supercluster': '0 seconds',
      },
    };
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9\s]/.test(password);
  const hasWhitespace = /\s/.test(password);
  const hasUnicode = /[^\x00-\x7F]/.test(password);

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigits) poolSize += 10;
  if (hasSymbols) poolSize += 33;
  if (hasWhitespace) poolSize += 1;
  if (hasUnicode) poolSize += 64;

  // Shannon Entropy in bits = length * log2(poolSize)
  const entropyBits = poolSize > 0 ? Math.round(length * (Math.log(poolSize) / Math.log(2))) : 0;

  // Unique character diversity
  const uniqueChars = new Set(charArray).size;

  // Vulnerability heuristics (Unicode flag enabled)
  const hasRepeated = /(.)\1{2,}/u.test(password) || (length >= 4 && uniqueChars <= 2);
  const lowerPwd = password.toLowerCase();
  const hasSequential = SEQUENTIAL_SEQUENCES.some((seq) => lowerPwd.includes(seq));

  // Direct common pattern
  const hasCommonDictionary = COMMON_PASSWORDS.has(lowerPwd) ||
    Array.from(COMMON_PASSWORDS).some((w) => lowerPwd.includes(w) && w.length >= 4);

  // Leet-speak check
  const normalized = normalizeL33t(password);
  const hasL33tSubstitutions = normalized !== lowerPwd &&
    Array.from(COMMON_PASSWORDS).some((w) => normalized.includes(w) && w.length >= 5);

  // Scoring algorithm (out of 100)
  const reasons: string[] = [];
  let score = 0;

  // 1. Length scoring (primary defense)
  if (length >= 16) {
    score += 40;
    reasons.push('Excellent length (16+ characters) provides exponential resistance against brute-force search spaces.');
  } else if (length >= 12) {
    score += 25;
    reasons.push('Good length (12-15 characters) meets modern baseline enterprise standards.');
  } else if (length >= 8) {
    score += 10;
    reasons.push('Marginal length (8-11 characters); vulnerable to high-speed offline GPU cracking.');
  } else {
    score += 0;
    reasons.push('Critically short (<8 characters); can be cracked almost instantly regardless of character variety.');
  }

  // 2. Character diversity
  let diversityCount = 0;
  if (hasLower) diversityCount++;
  if (hasUpper) diversityCount++;
  if (hasDigits) diversityCount++;
  if (hasSymbols || hasWhitespace) diversityCount++;

  if (diversityCount >= 4) {
    score += 25;
    reasons.push('Full character diversity (uppercase, lowercase, numbers, and symbols/spaces).');
  } else if (diversityCount === 3) {
    score += 15;
    reasons.push('Moderate character diversity (3 character classes present).');
  } else {
    score += 5;
    reasons.push('Limited character diversity; narrow character pool restricts total entropy.');
  }

  // 3. Entropy boost
  if (entropyBits >= 80) score += 20;
  else if (entropyBits >= 60) score += 15;
  else if (entropyBits >= 40) score += 10;

  // 4. Penalties for predictable structures
  if (hasCommonDictionary) {
    score -= 30;
    reasons.push('Contains recognizable dictionary word or common password root (targeted first by wordlists).');
  }
  if (hasL33tSubstitutions) {
    score -= 15;
    reasons.push('Uses predictable character substitutions (e.g. @ for a, 0 for o); modern cracking tools (Hashcat) test these automatically via rule engines.');
  }
  if (hasSequential) {
    score -= 15;
    reasons.push('Contains sequential or keyboard walk patterns (e.g. 123, qwerty); heavily prioritized in attack masks.');
  }
  if (hasRepeated) {
    if (uniqueChars <= 2 && length >= 4) {
      score -= 35;
      reasons.push('High character repetition (<= 2 unique characters); trivial to crack via pattern masks regardless of length.');
    } else {
      score -= 15;
      reasons.push('Contains repetitive character strings (e.g. "aaa", "111") which collapses effective entropy.');
    }
  }

  const finalScore = Math.max(5, Math.min(score, 100));

  // Determine tier
  let tier: PasswordStrengthTier = 'very_weak';
  let tierLabel = 'Very Weak';
  let tierColor = 'text-red-400 border-red-500/30 bg-red-950/20';
  let progressPercent = 20;

  if (finalScore >= 85 && length >= 14 && !hasCommonDictionary) {
    tier = 'very_strong';
    tierLabel = 'Very Strong';
    tierColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
    progressPercent = 100;
  } else if (finalScore >= 65 && length >= 12) {
    tier = 'strong';
    tierLabel = 'Strong';
    tierColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20';
    progressPercent = 80;
  } else if (finalScore >= 45 && length >= 8) {
    tier = 'fair';
    tierLabel = 'Fair';
    tierColor = 'text-amber-400 border-amber-500/30 bg-amber-950/20';
    progressPercent = 55;
  } else if (finalScore >= 25 && length >= 6) {
    tier = 'weak';
    tierLabel = 'Weak';
    tierColor = 'text-orange-400 border-orange-500/30 bg-orange-950/20';
    progressPercent = 35;
  } else {
    tier = 'very_weak';
    tierLabel = 'Very Weak';
    tierColor = 'text-red-400 border-red-500/30 bg-red-950/20';
    progressPercent = 15;
  }

  // Enforce very_weak tier cap if unique characters are critically low (<=2) and length >= 4
  if (uniqueChars <= 2 && length >= 4) {
    tier = 'very_weak';
    tierLabel = 'Very Weak';
    tierColor = 'text-red-400 border-red-500/30 bg-red-950/20';
    progressPercent = 15;
  }

  // Combinations calculation using BigInt: poolSize^length
  // Reduced if common dictionary / sequential patterns exist
  const effectivePool = BigInt(Math.max(2, poolSize));
  let effectiveLength = BigInt(length);

  if (hasCommonDictionary) {
    effectiveLength = effectiveLength > FOUR_BIG ? effectiveLength - FOUR_BIG : ONE_BIG;
  }
  if (hasSequential || hasL33tSubstitutions) {
    effectiveLength = effectiveLength > TWO_BIG ? effectiveLength - TWO_BIG : ONE_BIG;
  }
  if (hasRepeated) {
    if (uniqueChars <= 2) {
      effectiveLength = ONE_BIG;
    } else {
      effectiveLength = effectiveLength > FOUR_BIG ? effectiveLength - FOUR_BIG : ONE_BIG;
    }
  }

  // Safe BigInt exponentiation
  let totalCombinations = ONE_BIG;
  const maxExp = Number(effectiveLength > BigInt(100) ? BigInt(100) : effectiveLength);
  for (let i = 0; i < maxExp; i++) {
    totalCombinations *= effectivePool;
  }

  // Average case is testing half the search space
  const halfCombinations = totalCombinations / TWO_BIG;
  const averageGuesses = halfCombinations > ZERO_BIG ? halfCombinations : ONE_BIG;

  // Calculate crack time for each scenario
  const crackTimes: Record<string, string> = {};
  for (const scenario of ATTACK_SCENARIOS) {
    crackTimes[scenario.id] = formatCrackDuration(averageGuesses, scenario.guessesPerSecond);
  }

  return {
    length,
    hasLower,
    hasUpper,
    hasDigits,
    hasSymbols,
    hasWhitespace,
    poolSize,
    entropyBits,
    tier,
    tierLabel,
    tierColor,
    progressPercent,
    reasons,
    vulnerabilities: {
      hasRepeated,
      hasSequential,
      hasCommonDictionary,
      hasL33tSubstitutions,
    },
    crackTimes,
  };
}
