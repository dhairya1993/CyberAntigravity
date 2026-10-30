import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzePassword,
  formatCrackDuration,
  ATTACK_SCENARIOS,
  DEMO_PRESETS,
} from '../src/lib/passwordAnalysis.ts';

describe('Password Security Simulator — Entropy & Attack Engine', () => {
  test('Empty string yields baseline very_weak state safely', () => {
    const res = analyzePassword('');
    assert.equal(res.length, 0);
    assert.equal(res.entropyBits, 0);
    assert.equal(res.tier, 'very_weak');
    assert.equal(res.poolSize, 0);
    assert.equal(res.progressPercent, 0);
    assert.equal(res.vulnerabilities.hasCommonDictionary, false);
    assert.equal(res.vulnerabilities.hasRepeated, false);
    assert.equal(res.vulnerabilities.hasSequential, false);
    assert.equal(res.vulnerabilities.hasL33tSubstitutions, false);
    assert.ok(res.reasons.length > 0);
  });

  test('Short passwords correctly trigger weakness and penalty warnings', () => {
    const res = analyzePassword('abc1');
    assert.equal(res.tier, 'very_weak');
    assert.ok(res.entropyBits < 30);
    assert.ok(res.progressPercent <= 25);
    assert.ok(res.reasons.some((r) => r.toLowerCase().includes('short')));
  });

  test('Detects common dictionary passwords', () => {
    const res = analyzePassword('password123');
    assert.equal(res.vulnerabilities.hasCommonDictionary, true);
    assert.equal(res.vulnerabilities.hasSequential, true);
    assert.ok(res.reasons.some((r) => r.includes('dictionary')));
  });

  test('Detects l33t speak substitutions correctly', () => {
    const res = analyzePassword('P@ssw0rd!');
    assert.equal(res.vulnerabilities.hasL33tSubstitutions, true);
    assert.ok(res.reasons.some((r) => r.includes('substitutions')));
  });

  test('Detects sequential patterns and keyboard walks', () => {
    const res1 = analyzePassword('qwertyuiop');
    assert.equal(res1.vulnerabilities.hasSequential, true);

    const res2 = analyzePassword('mycode123456');
    assert.equal(res2.vulnerabilities.hasSequential, true);
  });

  test('Detects repetitive character sequences', () => {
    const res = analyzePassword('secretAAA123');
    assert.equal(res.vulnerabilities.hasRepeated, true);
  });

  test('Passphrases with high entropy achieve strong or very_strong tier', () => {
    const res = analyzePassword('correct-horse-battery-staple');
    assert.ok(res.length >= 20);
    assert.ok(res.entropyBits >= 80);
    assert.ok(res.tier === 'strong' || res.tier === 'very_strong');
    assert.ok(res.progressPercent >= 80);
  });

  test('Complex randomly-generated password receives very_strong evaluation', () => {
    const res = analyzePassword('K9#mQ$8vL!xZ2@wR');
    assert.equal(res.tier, 'very_strong');
    assert.ok(res.hasLower && res.hasUpper && res.hasDigits && res.hasSymbols);
    assert.ok(res.entropyBits >= 90);
    assert.equal(res.progressPercent, 100);
  });

  test('All 5 attack scenarios produce formatted durations without NaN or Infinity', () => {
    assert.equal(ATTACK_SCENARIOS.length, 5);

    const testPasswords = ['', '123456', 'P@ssw0rd!', 'K9#mQ$8vL!xZ2@wR', 'long-unbreakable-random-passphrase-2026'];
    for (const pwd of testPasswords) {
      const res = analyzePassword(pwd);
      for (const scenario of ATTACK_SCENARIOS) {
        const timeStr = res.crackTimes[scenario.id];
        assert.ok(timeStr, `Scenario ${scenario.id} must return a duration string`);
        assert.ok(!timeStr.includes('NaN'), `Duration for ${scenario.id} contained NaN`);
        assert.ok(!timeStr.includes('Infinity'), `Duration for ${scenario.id} contained Infinity`);
      }
    }
  });

  test('formatCrackDuration safely calculates astronomical timescales using BigInt', () => {
    // 100 guesses at 10 guesses/sec = 10 seconds
    const tenSec = formatCrackDuration(100n, 10);
    assert.equal(tenSec, '10 seconds');

    // 1 hour
    const oneHour = formatCrackDuration(3600n, 1);
    assert.equal(oneHour, '1 hour');

    // Astronomical number (10^30) must not overflow or return Infinity
    const huge = 1000000000000000000000000000000n;
    const duration = formatCrackDuration(huge, 1000000000);
    assert.ok(duration.includes('trillion years') || duration.includes('billion years'));
    assert.ok(!duration.includes('Infinity'));
    assert.ok(!duration.includes('NaN'));
  });

  test('DEMO_PRESETS are populated and valid', () => {
    assert.ok(DEMO_PRESETS.length >= 4);
    for (const preset of DEMO_PRESETS) {
      assert.ok(preset.id);
      assert.ok(preset.label);
      assert.ok(preset.password);
      assert.ok(preset.description);

      const res = analyzePassword(preset.password);
      assert.ok(res.tier);
    }
  });

  test('Unicode, whitespace, and special characters handled gracefully', () => {
    const res = analyzePassword('P@ss wörd 🚀 2026!');
    assert.ok(res.length > 0);
    assert.equal(res.hasWhitespace, true);
    assert.ok(res.entropyBits > 0);
  });
});
