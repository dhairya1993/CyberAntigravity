export interface DailyChallengeSubmission {
  questionId: string;
  selectedOptionId: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timestamp: number;
}

export interface DailyChallengeStorageState {
  version: number;
  currentStreak: number;
  longestStreak: number;
  totalCompleted: number;
  lastCompletedDate: string | null;
  history: Record<string, DailyChallengeSubmission>;
}

export const STORAGE_KEY = 'cyberantigravity_daily_challenge_v1';

export const DEFAULT_STATE: DailyChallengeStorageState = {
  version: 1,
  currentStreak: 0,
  longestStreak: 0,
  totalCompleted: 0,
  lastCompletedDate: null,
  history: {},
};

type Listener = () => void;
let listeners: Listener[] = [];
let cachedRaw: string | null = null;
let cachedState: DailyChallengeStorageState = DEFAULT_STATE;

/**
 * Checks whether browser localStorage is accessible without throwing.
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeNonNegativeInt(val: unknown, fallback: number = 0): number {
  return typeof val === 'number' && Number.isFinite(val) && val >= 0 ? Math.floor(val) : fallback;
}

export function sanitizeHistory(val: unknown): Record<string, DailyChallengeSubmission> {
  if (!val || typeof val !== 'object' || Array.isArray(val)) return {};
  const cleaned: Record<string, DailyChallengeSubmission> = {};
  for (const [dateKey, sub] of Object.entries(val)) {
    if (sub && typeof sub === 'object' && !Array.isArray(sub)) {
      const s = sub as Partial<DailyChallengeSubmission>;
      if (
        typeof s.questionId === 'string' &&
        (s.selectedOptionId === 'A' || s.selectedOptionId === 'B' || s.selectedOptionId === 'C' || s.selectedOptionId === 'D') &&
        typeof s.isCorrect === 'boolean'
      ) {
        cleaned[dateKey] = {
          questionId: s.questionId,
          selectedOptionId: s.selectedOptionId,
          isCorrect: s.isCorrect,
          timestamp: typeof s.timestamp === 'number' && Number.isFinite(s.timestamp) ? s.timestamp : Date.now(),
        };
      }
    }
  }
  return cleaned;
}

/**
 * Safely loads student daily challenge history from localStorage.
 */
export function loadDailyChallengeState(): DailyChallengeStorageState {
  if (!isLocalStorageAvailable()) {
    return { ...DEFAULT_STATE };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };

    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const history = sanitizeHistory(parsed.history);
      return {
        version: sanitizeNonNegativeInt(parsed.version, 1),
        currentStreak: sanitizeNonNegativeInt(parsed.currentStreak, 0),
        longestStreak: sanitizeNonNegativeInt(parsed.longestStreak, 0),
        totalCompleted: sanitizeNonNegativeInt(parsed.totalCompleted, 0),
        lastCompletedDate: typeof parsed.lastCompletedDate === 'string' ? parsed.lastCompletedDate : null,
        history,
      };
    }
    return { ...DEFAULT_STATE };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

/**
 * React useSyncExternalStore subscription
 */
export function subscribeDailyChallengeState(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emitChange() {
  for (const listener of listeners) {
    try {
      listener();
    } catch {
      // Continue notifying others
    }
  }
}

/**
 * Snapshot getter for useSyncExternalStore
 */
export function getDailyChallengeSnapshot(): DailyChallengeStorageState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedState = loadDailyChallengeState();
    }
    return cachedState;
  } catch {
    return DEFAULT_STATE;
  }
}

export function getDailyChallengeServerSnapshot(): DailyChallengeStorageState {
  return DEFAULT_STATE;
}

/**
 * Calculates new streak given previous last completed date and today's date.
 */
export function calculateNewStreak(
  lastDateStr: string | null,
  todayStr: string,
  currentStreak: number
): number {
  if (!lastDateStr) return 1;
  if (lastDateStr === todayStr) return currentStreak; // Already completed today

  const last = new Date(`${lastDateStr}T00:00:00Z`).getTime();
  const today = new Date(`${todayStr}T00:00:00Z`).getTime();
  const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    return currentStreak + 1;
  } else if (diffDays <= 0) {
    // Same day or clock variation
    return currentStreak;
  } else {
    // Streak broken
    return 1;
  }
}

/**
 * Records a challenge submission and updates local student streak metrics.
 * Idempotent: If already submitted today, does not double-count streak.
 */
export function recordChallengeSubmission(
  dateStr: string,
  questionId: string,
  selectedOptionId: 'A' | 'B' | 'C' | 'D',
  isCorrect: boolean
): DailyChallengeStorageState {
  const state = loadDailyChallengeState();

  // If already completed for this date, return existing state
  if (state.history[dateStr]) {
    return state;
  }

  const submission: DailyChallengeSubmission = {
    questionId,
    selectedOptionId,
    isCorrect,
    timestamp: Date.now(),
  };

  const newStreak = isCorrect
    ? calculateNewStreak(state.lastCompletedDate, dateStr, state.currentStreak)
    : 0;

  const newLongest = Math.max(state.longestStreak, newStreak);

  const newState: DailyChallengeStorageState = {
    version: 1,
    currentStreak: newStreak,
    longestStreak: newLongest,
    totalCompleted: state.totalCompleted + 1,
    lastCompletedDate: dateStr,
    history: {
      ...state.history,
      [dateStr]: submission,
    },
  };

  if (isLocalStorageAvailable()) {
    try {
      const raw = JSON.stringify(newState);
      window.localStorage.setItem(STORAGE_KEY, raw);
      cachedRaw = raw;
      cachedState = newState;
      emitChange();
    } catch {
      // Graceful local fallback
    }
  }

  return newState;
}
