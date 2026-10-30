import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  DAILY_CHALLENGES,
  getDailyChallengeForDate,
} from '../src/data/dailyChallengeBank.ts';

import {
  STORAGE_KEY,
  DEFAULT_STATE,
  calculateNewStreak,
  sanitizeNonNegativeInt,
  sanitizeHistory,
  loadDailyChallengeState,
  recordChallengeSubmission,
} from '../src/lib/dailyChallengeStorage.ts';

// Helper to extract slugs without needing TypeScript @/ path alias resolver
function getBlogSlugs() {
  const content = fs.readFileSync(path.join(process.cwd(), 'src/data/blogArticles.ts'), 'utf8');
  const matches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
  return new Set(matches.map(m => m[1]));
}

function getScamTypeSlugs() {
  const content = fs.readFileSync(path.join(process.cwd(), 'src/data/scamTypesExplorerData.ts'), 'utf8');
  const matches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
  return new Set(matches.map(m => m[1]));
}

// Mock browser window and localStorage for headless Node environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

describe('Daily Cyber Challenge — Logic & Bank Validation', () => {
  test('Question bank contains exactly 7 unique, fully-formed challenges', () => {
    assert.equal(DAILY_CHALLENGES.length, 7, 'Expected 7 challenges in the rotation pool');

    const seenIds = new Set();
    for (const challenge of DAILY_CHALLENGES) {
      assert.ok(challenge.id, 'Challenge must have a unique ID');
      assert.ok(!seenIds.has(challenge.id), `Duplicate challenge ID found: ${challenge.id}`);
      seenIds.add(challenge.id);

      assert.ok(challenge.topic && challenge.topic.trim().length > 0, 'Topic must not be empty');
      assert.ok(challenge.scenario && challenge.scenario.trim().length > 0, 'Scenario must not be empty');
      assert.ok(challenge.question && challenge.question.trim().length > 0, 'Question must not be empty');
      assert.ok(challenge.defenseRecommendation && challenge.defenseRecommendation.trim().length > 0, 'Defense recommendation must not be empty');
      assert.ok(challenge.relatedLink && challenge.relatedLink.startsWith('/'), 'Related link must be internal path');
      assert.ok(challenge.relatedLinkText && challenge.relatedLinkText.trim().length > 0, 'Related link text must not be empty');

      // Validate options: exactly 4 options (A, B, C, D)
      assert.equal(challenge.options.length, 4, `Challenge ${challenge.id} must have 4 options`);
      const optionIds = challenge.options.map(o => o.id);
      assert.deepEqual(optionIds, ['A', 'B', 'C', 'D'], `Challenge ${challenge.id} must have options A, B, C, D in order`);

      // Exactly 1 correct answer
      const correctOptions = challenge.options.filter(o => o.isCorrect);
      assert.equal(correctOptions.length, 1, `Challenge ${challenge.id} must have exactly 1 correct answer`);

      // All options have explanations
      for (const opt of challenge.options) {
        assert.ok(opt.text && opt.text.trim().length > 0, `Option ${opt.id} in ${challenge.id} missing text`);
        assert.ok(opt.explanation && opt.explanation.trim().length > 0, `Option ${opt.id} in ${challenge.id} missing explanation`);
      }
    }
  });

  test('Deterministic question selection: same UTC date always yields identical challenge', () => {
    const morning = new Date('2026-10-30T01:15:00Z');
    const noon = new Date('2026-10-30T12:00:00Z');
    const night = new Date('2026-10-30T23:59:59Z');

    const resultMorning = getDailyChallengeForDate(morning);
    const resultNoon = getDailyChallengeForDate(noon);
    const resultNight = getDailyChallengeForDate(night);

    assert.equal(resultMorning.dateString, '2026-10-30');
    assert.equal(resultNoon.dateString, '2026-10-30');
    assert.equal(resultNight.dateString, '2026-10-30');

    assert.equal(resultMorning.challenge.id, resultNoon.challenge.id);
    assert.equal(resultMorning.challenge.id, resultNight.challenge.id);
    assert.equal(resultMorning.dayNumber, resultNoon.dayNumber);
  });

  test('Consecutive dates rotate sequentially through challenge bank', () => {
    const day1 = getDailyChallengeForDate(new Date('2026-10-30T00:00:00Z'));
    const day2 = getDailyChallengeForDate(new Date('2026-10-31T00:00:00Z'));
    const day3 = getDailyChallengeForDate(new Date('2026-11-01T00:00:00Z'));

    assert.equal(day2.dayNumber, day1.dayNumber + 1);
    assert.equal(day3.dayNumber, day2.dayNumber + 1);

    // Day 2 question index should be (Day 1 index + 1) % 7
    const idx1 = DAILY_CHALLENGES.findIndex(c => c.id === day1.challenge.id);
    const idx2 = DAILY_CHALLENGES.findIndex(c => c.id === day2.challenge.id);
    assert.equal(idx2, (idx1 + 1) % DAILY_CHALLENGES.length);
  });

  test('Invalid dates fall back safely to valid date without throwing or returning undefined', () => {
    const invalidDate = new Date('invalid-date-string');
    const result = getDailyChallengeForDate(invalidDate);

    assert.ok(result.challenge, 'Challenge must not be undefined');
    assert.ok(result.dateString && !result.dateString.includes('NaN'), 'Date string must be valid YYYY-MM-DD');
    assert.ok(typeof result.dayNumber === 'number' && !isNaN(result.dayNumber), 'Day number must be valid');
  });

  test('Date boundaries: epoch anchor (2026-01-01) and pre-anchor dates', () => {
    const anchor = getDailyChallengeForDate(new Date('2026-01-01T00:00:00Z'));
    assert.equal(anchor.dateString, '2026-01-01');
    assert.equal(anchor.dayNumber, 1);
    assert.equal(anchor.challenge.id, 'daily-01');

    // Pre-anchor date (2025-12-31) does not crash or produce negative index
    const preAnchor = getDailyChallengeForDate(new Date('2025-12-31T23:59:59Z'));
    assert.ok(preAnchor.challenge, 'Pre-anchor date returns valid challenge');
    assert.equal(preAnchor.dayNumber, 1);
  });

  test('All relatedLink paths in DAILY_CHALLENGES correspond to valid static/app routes', () => {
    const appDir = path.join(process.cwd(), 'src/app');
    const blogSlugs = getBlogSlugs();
    const scamSlugs = getScamTypeSlugs();

    for (const challenge of DAILY_CHALLENGES) {
      const link = challenge.relatedLink;
      assert.ok(link.startsWith('/'), `Link ${link} must start with /`);

      // Check if it's a blog route: /blog/:slug
      if (link.startsWith('/blog/')) {
        const slug = link.replace('/blog/', '');
        assert.ok(blogSlugs.has(slug), `Blog slug "${slug}" not found in blogArticles.ts`);
        continue;
      }

      // Check if it's a scam type: /scam-awareness/types/:slug
      if (link.startsWith('/scam-awareness/types/')) {
        const slug = link.replace('/scam-awareness/types/', '');
        const directPage = path.join(appDir, 'scam-awareness/types', slug, 'page.tsx');
        assert.ok(
          fs.existsSync(directPage) || scamSlugs.has(slug),
          `Scam type slug "${slug}" not found in scamTypesExplorerData.ts`
        );
        continue;
      }

      // Otherwise direct route
      const cleanPath = link.replace(/^\//, '');
      const directPage = path.join(appDir, cleanPath, 'page.tsx');
      assert.ok(
        fs.existsSync(directPage),
        `Direct route page "${directPage}" does not exist for link "${link}"`
      );
    }
  });
});

describe('Daily Cyber Challenge — Storage & Streak Calculations', () => {
  beforeEach(() => {
    global.window = {
      localStorage: new MockLocalStorage(),
    };
  });

  test('First-time visitor receives initial zeroed state', () => {
    const state = loadDailyChallengeState();
    assert.deepEqual(state, DEFAULT_STATE);
    assert.equal(state.currentStreak, 0);
    assert.equal(state.longestStreak, 0);
    assert.equal(state.totalCompleted, 0);
    assert.equal(state.lastCompletedDate, null);
    assert.deepEqual(state.history, {});
  });

  test('Streak calculation: consecutive days increment streak', () => {
    const streakDay1 = calculateNewStreak(null, '2026-10-28', 0);
    assert.equal(streakDay1, 1, 'First day completion gives streak = 1');

    const streakDay2 = calculateNewStreak('2026-10-28', '2026-10-29', 1);
    assert.equal(streakDay2, 2, 'Consecutive day increments streak to 2');

    const streakDay3 = calculateNewStreak('2026-10-29', '2026-10-30', 2);
    assert.equal(streakDay3, 3, 'Consecutive day increments streak to 3');
  });

  test('Streak calculation: missed days reset streak to 1', () => {
    // Last completed 2 days ago (2026-10-28 -> 2026-10-30)
    const brokenStreak = calculateNewStreak('2026-10-28', '2026-10-30', 5);
    assert.equal(brokenStreak, 1, 'Missed day resets streak to 1');
  });

  test('Streak calculation: same-day submission preserves current streak (idempotency)', () => {
    const sameDay = calculateNewStreak('2026-10-30', '2026-10-30', 4);
    assert.equal(sameDay, 4, 'Same-day completion preserves streak without double-counting');
  });

  test('recordChallengeSubmission: correct answer updates streak and records history', () => {
    const state1 = recordChallengeSubmission('2026-10-29', 'daily-01', 'B', true);
    assert.equal(state1.currentStreak, 1);
    assert.equal(state1.longestStreak, 1);
    assert.equal(state1.totalCompleted, 1);
    assert.equal(state1.lastCompletedDate, '2026-10-29');
    assert.ok(state1.history['2026-10-29']);
    assert.equal(state1.history['2026-10-29'].selectedOptionId, 'B');
    assert.equal(state1.history['2026-10-29'].isCorrect, true);

    // Next day correct answer
    const state2 = recordChallengeSubmission('2026-10-30', 'daily-02', 'B', true);
    assert.equal(state2.currentStreak, 2);
    assert.equal(state2.longestStreak, 2);
    assert.equal(state2.totalCompleted, 2);
    assert.equal(state2.lastCompletedDate, '2026-10-30');
  });

  test('recordChallengeSubmission: incorrect answer resets current streak to 0, retains longest streak', () => {
    // Day 1 & 2 correct
    recordChallengeSubmission('2026-10-28', 'daily-01', 'B', true);
    recordChallengeSubmission('2026-10-29', 'daily-02', 'B', true);

    // Day 3 incorrect answer ('A' is wrong)
    const state3 = recordChallengeSubmission('2026-10-30', 'daily-03', 'A', false);
    assert.equal(state3.currentStreak, 0, 'Incorrect answer resets current defense streak to 0');
    assert.equal(state3.longestStreak, 2, 'Personal best longest streak is preserved');
    assert.equal(state3.totalCompleted, 3, 'Total completed still increments');
    assert.equal(state3.history['2026-10-30'].isCorrect, false);
  });

  test('Idempotency: repeated submissions on the same day cannot award duplicate credit', () => {
    const firstAttempt = recordChallengeSubmission('2026-10-30', 'daily-01', 'B', true);
    assert.equal(firstAttempt.currentStreak, 1);
    assert.equal(firstAttempt.totalCompleted, 1);

    // Attempt second submission on same date
    const secondAttempt = recordChallengeSubmission('2026-10-30', 'daily-01', 'A', false);
    assert.equal(secondAttempt.currentStreak, 1, 'Current streak cannot be altered on same day');
    assert.equal(secondAttempt.totalCompleted, 1, 'Total completed cannot be incremented twice');
    assert.equal(secondAttempt.history['2026-10-30'].selectedOptionId, 'B', 'Original answer remains locked');
  });

  test('Page refresh: progress is safely restored from localStorage', () => {
    recordChallengeSubmission('2026-10-30', 'daily-01', 'B', true);

    // Simulate page reload by reading fresh state from localStorage
    const reloadedState = loadDailyChallengeState();
    assert.equal(reloadedState.currentStreak, 1);
    assert.equal(reloadedState.lastCompletedDate, '2026-10-30');
    assert.ok(reloadedState.history['2026-10-30']);
  });

  test('Malformed or corrupted storage does not crash component and falls back gracefully', () => {
    // 1. Corrupted non-JSON string
    global.window.localStorage.setItem(STORAGE_KEY, '{ invalid JSON string ...');
    let fallback = loadDailyChallengeState();
    assert.deepEqual(fallback, DEFAULT_STATE);

    // 2. Corrupted negative numbers & NaN
    global.window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentStreak: -10,
        longestStreak: 'not-a-number',
        totalCompleted: NaN,
        history: null,
      })
    );
    fallback = loadDailyChallengeState();
    assert.equal(fallback.currentStreak, 0);
    assert.equal(fallback.longestStreak, 0);
    assert.equal(fallback.totalCompleted, 0);
    assert.deepEqual(fallback.history, {});

    // 3. Null localStorage (disabled or private browsing exception)
    delete global.window;
    fallback = loadDailyChallengeState();
    assert.deepEqual(fallback, DEFAULT_STATE);
  });

  test('Sanitizers: sanitizeNonNegativeInt and sanitizeHistory handle edge cases', () => {
    assert.equal(sanitizeNonNegativeInt(-5), 0);
    assert.equal(sanitizeNonNegativeInt(NaN), 0);
    assert.equal(sanitizeNonNegativeInt(Infinity), 0);
    assert.equal(sanitizeNonNegativeInt('10'), 0);
    assert.equal(sanitizeNonNegativeInt(14.8), 14);
    assert.equal(sanitizeNonNegativeInt(7), 7);

    assert.deepEqual(sanitizeHistory(null), {});
    assert.deepEqual(sanitizeHistory([]), {});
    assert.deepEqual(sanitizeHistory('invalid'), {});

    const validHistory = {
      '2026-10-30': {
        questionId: 'daily-01',
        selectedOptionId: 'B',
        isCorrect: true,
        timestamp: 1730246400000,
      },
      'invalid-entry': {
        questionId: 123, // invalid
      },
    };
    const cleaned = sanitizeHistory(validHistory);
    assert.ok(cleaned['2026-10-30']);
    assert.equal(cleaned['invalid-entry'], undefined);
  });
});
