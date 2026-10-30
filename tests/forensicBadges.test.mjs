import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateForensicBadges } from '../src/lib/badgeCalculator.ts';
import { generateBadgeSvg } from '../src/lib/badgeSvgGenerator.ts';

describe('Forensic Badges — Calculation & Vector Generation Validation', () => {
  test('Initial empty state has 0 unlocked badges with accurate progress fractions', () => {
    const badges = calculateForensicBadges({
      phishingCompletedCount: 0,
      urlCompletedCount: 0,
      dailyChallengeCount: 0,
      lastActiveDate: '2026-10-30',
    });

    assert.equal(badges.length, 4);

    for (const badge of badges) {
      assert.equal(badge.criteria.isUnlocked, false, `Badge ${badge.id} should be locked initially`);
      assert.equal(badge.criteria.current, 0);
      assert.equal(badge.earnedDate, null);
    }
  });

  test('Phishing Forensics Detective unlocks exactly when 5 cases completed', () => {
    // 4 cases -> still locked
    const partial = calculateForensicBadges({
      phishingCompletedCount: 4,
      urlCompletedCount: 0,
      dailyChallengeCount: 0,
      lastActiveDate: '2026-10-30',
    });
    const phishPartial = partial.find((b) => b.id === 'phishing-detective');
    assert.equal(phishPartial?.criteria.isUnlocked, false);
    assert.equal(phishPartial?.criteria.current, 4);

    // 5 cases -> unlocked
    const unlocked = calculateForensicBadges({
      phishingCompletedCount: 5,
      urlCompletedCount: 0,
      dailyChallengeCount: 0,
      lastActiveDate: '2026-10-30',
    });
    const phishUnlocked = unlocked.find((b) => b.id === 'phishing-detective');
    assert.equal(phishUnlocked?.criteria.isUnlocked, true);
    assert.equal(phishUnlocked?.criteria.current, 5);
    assert.equal(phishUnlocked?.earnedDate, '2026-10-30');
    assert.equal(phishUnlocked?.verificationCode, 'CAG-LAB-PHISH-5X');
  });

  test('Suspicious URL Investigator unlocks exactly when 6 cases completed', () => {
    // 5 cases -> still locked
    const partial = calculateForensicBadges({
      phishingCompletedCount: 0,
      urlCompletedCount: 5,
      dailyChallengeCount: 0,
      lastActiveDate: '2026-10-30',
    });
    const urlPartial = partial.find((b) => b.id === 'url-investigator');
    assert.equal(urlPartial?.criteria.isUnlocked, false);
    assert.equal(urlPartial?.criteria.current, 5);

    // 6 cases -> unlocked
    const unlocked = calculateForensicBadges({
      phishingCompletedCount: 0,
      urlCompletedCount: 6,
      dailyChallengeCount: 0,
      lastActiveDate: '2026-10-30',
    });
    const urlUnlocked = unlocked.find((b) => b.id === 'url-investigator');
    assert.equal(urlUnlocked?.criteria.isUnlocked, true);
    assert.equal(urlUnlocked?.criteria.current, 6);
    assert.equal(urlUnlocked?.earnedDate, '2026-10-30');
    assert.equal(urlUnlocked?.verificationCode, 'CAG-LAB-URL-6X');
  });

  test('Cyber Challenge Practitioner unlocks after 3 daily challenges', () => {
    const badges = calculateForensicBadges({
      phishingCompletedCount: 0,
      urlCompletedCount: 0,
      dailyChallengeCount: 3,
      lastActiveDate: '2026-10-30',
    });
    const challengeBadge = badges.find((b) => b.id === 'challenge-learner');
    assert.equal(challengeBadge?.criteria.isUnlocked, true);
    assert.equal(challengeBadge?.criteria.current, 3);
  });

  test('Mastery badge (Security Defender) requires BOTH Phishing and URL labs complete', () => {
    // Only Phishing complete
    const onlyPhish = calculateForensicBadges({
      phishingCompletedCount: 5,
      urlCompletedCount: 4,
      dailyChallengeCount: 0,
      lastActiveDate: '2026-10-30',
    });
    const def1 = onlyPhish.find((b) => b.id === 'security-defender');
    assert.equal(def1?.criteria.isUnlocked, false);

    // Only URL complete
    const onlyUrl = calculateForensicBadges({
      phishingCompletedCount: 3,
      urlCompletedCount: 6,
      dailyChallengeCount: 0,
      lastActiveDate: '2026-10-30',
    });
    const def2 = onlyUrl.find((b) => b.id === 'security-defender');
    assert.equal(def2?.criteria.isUnlocked, false);

    // Both complete (5/5 + 6/6 = 11)
    const bothComplete = calculateForensicBadges({
      phishingCompletedCount: 5,
      urlCompletedCount: 6,
      dailyChallengeCount: 0,
      lastActiveDate: '2026-10-30',
    });
    const defMaster = bothComplete.find((b) => b.id === 'security-defender');
    assert.equal(defMaster?.criteria.isUnlocked, true);
    assert.equal(defMaster?.criteria.current, 11);
    assert.equal(defMaster?.verificationCode, 'CAG-DEFENDER-DUAL-LAB');
  });

  test('SVG Badge Generator produces valid, sanitized vector markup with non-accreditation disclaimer', () => {
    const badges = calculateForensicBadges({
      phishingCompletedCount: 5,
      urlCompletedCount: 6,
      dailyChallengeCount: 3,
      lastActiveDate: '2026-10-30',
    });

    const badge = badges[0];
    const maliciousName = '<script>&"Expert"</script>';
    const svg = generateBadgeSvg(badge, maliciousName);

    // XML well-formedness checks
    assert.ok(svg.startsWith('<svg'), 'Must begin with <svg tag');
    assert.ok(svg.endsWith('</svg>'), 'Must terminate with </svg>');
    assert.ok(svg.includes('viewBox="0 0 800 520"'), 'Must have standard 800x520 dimensions');

    // XSS / Injection escaping
    assert.ok(!svg.includes('<script>'), 'Must escape script tags');
    assert.ok(svg.includes('&lt;script&gt;'), 'Must replace < with &lt;');
    assert.ok(svg.includes('&amp;'), 'Must replace & with &amp;');

    // Disclaimer & branding
    assert.ok(svg.includes('CYBERANTIGRAVITY // OPEN DEFENSE INITIATIVE'));
    assert.ok(svg.includes('NOT AN ACCREDITED CERTIFICATION'));
    assert.ok(svg.includes('UNLOCKED (SIMULATION)'));
    assert.ok(svg.includes(badge.verificationCode));

    // Zero PII
    assert.ok(!svg.includes('@gmail.com'));
    assert.ok(!svg.includes('password'));
  });

  test('SVG Generator escapes single quotes and strips non-printable control characters', () => {
    const badges = calculateForensicBadges({
      phishingCompletedCount: 5,
      urlCompletedCount: 6,
      dailyChallengeCount: 3,
      lastActiveDate: '2026-10-30',
    });
    const malicious = "Analyst's \x00\x08Payload";
    const svg = generateBadgeSvg(badges[0], malicious);
    assert.ok(!svg.includes("\x00"));
    assert.ok(!svg.includes("\x08"));
    assert.ok(svg.includes("&#39;") || !svg.includes("'s Payload"));
  });

  test('Malformed earnedDate does not break SVG markup', () => {
    const badges = calculateForensicBadges({
      phishingCompletedCount: 5,
      urlCompletedCount: 6,
      dailyChallengeCount: 3,
      lastActiveDate: '</text><script>alert(1)</script>',
    });
    const svg = generateBadgeSvg(badges[0], 'Tester');
    assert.ok(!svg.includes('<script>'));
    assert.ok(svg.includes('&lt;script&gt;'));
  });
});
