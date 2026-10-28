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

const STORAGE_KEY = 'cyberantigravity_daily_challenge_v1';

const DEFAULT_STATE: DailyChallengeStorageState = {
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
function isLocalStorageAvailable(): boolean {
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
    if (parsed && typeof parsed === 'object' && parsed.history) {
      return {
        version: parsed.version || 1,
        currentStreak: typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0,
        longestStreak: typeof parsed.longestStreak === 'number' ? parsed.longestStreak : 0,
        totalCompleted: typeof parsed.totalCompleted === 'number' ? parsed.totalCompleted : 0,
        lastCompletedDate: typeof parsed.lastCompletedDate === 'string' ? parsed.lastCompletedDate : null,
        history: typeof parsed.history === 'object' ? parsed.history : {},
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
function calculateNewStreak(
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
    : state.currentStreak;

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
