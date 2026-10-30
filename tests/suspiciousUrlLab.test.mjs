import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { URL_INVESTIGATION_CASES } from '../src/data/suspiciousUrlLabData.ts';

// Pure URL parsing logic to verify parser safety and edge cases
function parseUrlSafely(input) {
  let raw = (input || '').trim();
  if (!raw) return { isValid: false, reason: 'empty' };

  if (!/^https?:\/\//i.test(raw)) {
    raw = 'https://' + raw;
  }

  try {
    const parsed = new URL(raw);
    const hostname = parsed.hostname;
    const parts = hostname.split('.');

    let subdomain = '(none)';
    let registrableDomain = hostname;
    let tld = 'unknown';

    if (parts.length > 2) {
      tld = parts[parts.length - 1];
      registrableDomain = parts.slice(-2).join('.');
      subdomain = parts.slice(0, -2).join('.');
    } else if (parts.length === 2) {
      tld = parts[1];
      registrableDomain = hostname;
    }

    const hasUserinfo = raw.includes('@');
    const isIpHost = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

    return {
      isValid: true,
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      subdomain,
      registrableDomain,
      tld,
      hasUserinfo,
      isIpHost,
    };
  } catch {
    return { isValid: false, reason: 'malformed' };
  }
}

describe('Suspicious URL Investigation Lab — Data & Parser Validation', () => {
  test('Contains at least 6 curated forensic URL cases', () => {
    assert.ok(URL_INVESTIGATION_CASES.length >= 6, `Expected at least 6 cases, found ${URL_INVESTIGATION_CASES.length}`);

    const seenIds = new Set();
    let hasSuspicious = false;
    let hasAuthentic = false;

    for (const c of URL_INVESTIGATION_CASES) {
      assert.ok(c.id, 'Case ID required');
      assert.ok(!seenIds.has(c.id), `Duplicate case ID: ${c.id}`);
      seenIds.add(c.id);

      assert.ok(c.testUrl && c.testUrl.startsWith('https://'), 'Test URL must be valid HTTPS');
      assert.ok(c.targetConcept && c.targetConcept.length > 0, 'Target concept required');
      assert.ok(c.classificationExplanation && c.classificationExplanation.length > 0, 'Explanation required');
      assert.ok(c.educationalRule && c.educationalRule.length > 0, 'Educational rule required');
      assert.ok(c.forensicBreakdown.length >= 1, 'At least 1 forensic indicator required');

      if (c.expectedClassification === 'suspicious') hasSuspicious = true;
      if (c.expectedClassification === 'authentic') hasAuthentic = true;
    }

    assert.ok(hasSuspicious, 'Must include suspicious URLs');
    assert.ok(hasAuthentic, 'Must include authentic control URLs');
  });

  test('URL Parser correctly handles valid and malformed inputs', () => {
    // Standard URL
    const res1 = parseUrlSafely('https://login.example.com/auth');
    assert.equal(res1.isValid, true);
    assert.equal(res1.hostname, 'login.example.com');
    assert.equal(res1.subdomain, 'login');
    assert.equal(res1.registrableDomain, 'example.com');
    assert.equal(res1.hasUserinfo, false);

    // Missing protocol auto-prefix
    const res2 = parseUrlSafely('mybank.com/portal');
    assert.equal(res2.isValid, true);
    assert.equal(res2.protocol, 'https:');
    assert.equal(res2.registrableDomain, 'mybank.com');

    // RFC 3986 Userinfo @ trap
    const res3 = parseUrlSafely('https://google.com@attacker-site.org/login');
    assert.equal(res3.isValid, true);
    assert.equal(res3.hasUserinfo, true);
    assert.equal(res3.hostname, 'attacker-site.org');

    // Direct IP Address
    const res4 = parseUrlSafely('http://192.168.1.10/admin');
    assert.equal(res4.isValid, true);
    assert.equal(res4.isIpHost, true);

    // Deep subdomains
    const res5 = parseUrlSafely('https://a.b.c.chase.com.evil-portal.net/verify');
    assert.equal(res5.isValid, true);
    assert.equal(res5.registrableDomain, 'evil-portal.net');

    // Completely malformed inputs that must not crash
    assert.equal(parseUrlSafely('').isValid, false);
    assert.equal(parseUrlSafely('   ').isValid, false);
    assert.equal(parseUrlSafely('http://[invalid-ipv6').isValid, false);
  });
});
