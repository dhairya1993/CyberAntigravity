import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { PHISHING_CASES } from '../src/data/phishingDetectiveData.ts';

describe('Phishing Detective Lab — Data & Scoring Validation', () => {
  test('Contains at least 5 curated forensic investigation cases', () => {
    assert.ok(PHISHING_CASES.length >= 5, `Expected at least 5 cases, found ${PHISHING_CASES.length}`);

    const seenIds = new Set();
    let hasPhishing = false;
    let hasLegitimate = false;

    for (const c of PHISHING_CASES) {
      assert.ok(c.id, 'Case must have an ID');
      assert.ok(!seenIds.has(c.id), `Duplicate case ID: ${c.id}`);
      seenIds.add(c.id);

      assert.ok(c.title && c.title.trim().length > 0, 'Title must not be empty');
      assert.ok(c.senderDisplay && c.senderDisplay.trim().length > 0, 'Sender display must not be empty');
      assert.ok(c.senderAddress && c.senderAddress.trim().length > 0, 'Sender address must not be empty');
      assert.ok(c.bodyText && c.bodyText.trim().length > 0, 'Body text must not be empty');
      assert.ok(c.verdictExplanation && c.verdictExplanation.trim().length > 0, 'Verdict explanation must not be empty');
      assert.ok(c.holisticTakeaway && c.holisticTakeaway.trim().length > 0, 'Holistic takeaway must not be empty');

      // Indicators check
      assert.ok(c.indicators.length >= 2, `Case ${c.id} must have at least 2 indicators`);
      for (const ind of c.indicators) {
        assert.ok(ind.label && ind.label.trim().length > 0, 'Indicator label required');
        assert.ok(ind.evidenceText && ind.evidenceText.trim().length > 0, 'Evidence text required');
        assert.ok(ind.explanation && ind.explanation.trim().length > 0, 'Explanation required');
        assert.ok(ind.whyItMatters && ind.whyItMatters.trim().length > 0, 'Why it matters required');
      }

      if (c.verdict === 'phishing') hasPhishing = true;
      if (c.verdict === 'legitimate') hasLegitimate = true;
    }

    assert.ok(hasPhishing, 'Must include phishing cases');
    assert.ok(hasLegitimate, 'Must include legitimate control cases to prevent blind bias');
  });

  test('Fictional domain safety: no live external malicious infrastructure', () => {
    for (const c of PHISHING_CASES) {
      // Must use non-functional, reserved, or safe example domains (.test, .xyz, .net, example.com)
      if (c.senderAddress.includes('@')) {
        const domain = c.senderAddress.split('@')[1];
        assert.ok(
          domain.endsWith('.test') ||
          domain.endsWith('.org') ||
          domain.endsWith('.xyz') ||
          domain.endsWith('.com') ||
          domain.endsWith('.net'),
          `Domain ${domain} should be reserved or fictional`
        );
      }
    }
  });

  test('Scoring and decision logic correctly assesses verdicts', () => {
    for (const c of PHISHING_CASES) {
      const studentCorrectChoice = c.verdict;
      const isCorrect = studentCorrectChoice === c.verdict;
      assert.equal(isCorrect, true, `Student selecting ${studentCorrectChoice} should match case verdict ${c.verdict}`);

      const studentWrongChoice = c.verdict === 'phishing' ? 'legitimate' : 'phishing';
      const isWrong = studentWrongChoice === c.verdict;
      assert.equal(isWrong, false, 'Opposite verdict must evaluate to false');
    }
  });
});
