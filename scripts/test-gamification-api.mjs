// Automated verification test suite for CyberAntigravity Auth & Server Gamification
// Tests executed against live running Next.js application at http://localhost:3000

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('====================================================');
  console.log('CYBERANTIGRAVITY AUTH & GAMIFICATION VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Check Public Accessibility (No Auth Required to Browse)
  console.log('--- Step 1: Public Routes (Browsing without Auth) ---');
  const homeRes = await fetch(`${BASE_URL}/`);
  assert(homeRes.status === 200, 'Home page is publicly accessible (200 OK)');

  const cyberIqRes = await fetch(`${BASE_URL}/cyber-iq`);
  assert(cyberIqRes.status === 200, 'Cyber IQ Arena is publicly accessible (200 OK)');

  const learnRes = await fetch(`${BASE_URL}/learn`);
  assert(learnRes.status === 200, 'Learning curriculum is publicly accessible (200 OK)');

  // 2. Verify Protected Endpoints Reject Unauthenticated Access
  console.log('\n--- Step 2: Protected Endpoints Reject Unauthenticated Access ---');
  const unauthProgress = await fetch(`${BASE_URL}/api/gamification/progress`);
  assert(unauthProgress.status === 401, 'Gamification progress rejects unauthenticated access (401 Unauthorized)');

  const unauthQuiz = await fetch(`${BASE_URL}/api/gamification/complete-quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionToken: 'token-123', category: 'fundamentals', answers: {} }),
  });
  assert(unauthQuiz.status === 401, 'Quiz completion rejects unauthenticated progress saving (401 Unauthorized)');

  // 3. Register Student A
  console.log('\n--- Step 3: Student Registration & Session Issuance ---');
  const testEmailA = `student_a_${Date.now()}@example.com`;
  const registerRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmailA,
      password: 'CyberPassword123!',
      displayName: 'Alice Cyber',
    }),
  });
  
  assert(registerRes.status === 200, `Student A registered successfully: ${testEmailA}`);
  const setCookieHeaderA = registerRes.headers.get('set-cookie');
  assert(setCookieHeaderA && setCookieHeaderA.includes('cyber_session='), 'HTTP-only secure session cookie issued');

  // Extract session cookie for Student A
  const sessionCookieA = setCookieHeaderA.split(';')[0];

  // 4. Inspect Session for Student A
  console.log('\n--- Step 4: Verify Session Restoration (/api/auth/me) ---');
  const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { Cookie: sessionCookieA },
  });
  const meData = await meRes.json();
  assert(meRes.status === 200, 'Session restored via signed cookie');
  assert(meData.user?.email === testEmailA, `Session identity matches Student A: ${meData.user?.email}`);
  assert(meData.profile?.totalXp === 0, 'New student starts with 0 XP');
  assert(meData.profile?.currentLevel === 1, 'New student starts at Level 1');

  // 5. Server-side Authoritative Quiz Evaluation & XP Awarding
  console.log('\n--- Step 5: Server-side Authoritative Quiz Evaluation ---');
  // 10 correct answers for 'fundamentals' category in CYBER_IQ_QUESTIONS:
  const perfectAnswers = {
    'fund-01': 'B',
    'fund-02': 'B',
    'fund-03': 'B',
    'fund-04': 'A',
    'fund-05': 'B',
    'fund-06': 'B',
    'fund-07': 'B',
    'fund-08': 'B',
    'fund-09': 'B',
    'fund-10': 'A',
  };

  const quizSessionToken = `quiz_sess_${Date.now()}`;
  const quizRes = await fetch(`${BASE_URL}/api/gamification/complete-quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookieA,
    },
    body: JSON.stringify({
      quizId: 'quiz-fund-1',
      category: 'fundamentals',
      sessionToken: quizSessionToken,
      answers: perfectAnswers,
      clientClaimedXp: 999999, // Intentional attempt to inject arbitrary XP (must be ignored)
    }),
  });

  const quizData = await quizRes.json();
  assert(quizRes.status === 200, 'Quiz completed successfully');
  assert(quizData.score === 10, 'Server calculated 10/10 correct answers');
  assert(quizData.scorePercentage === 100, 'Server calculated 100% accuracy');
  // Base 50 + High Score 25 + Flawless 20 = 95 XP
  assert(quizData.verifiedXp === 95, `Server calculated 95 XP (client 999999 ignored), got: ${quizData.verifiedXp}`);
  assert(quizData.totalXp === 95, `Profile total XP persisted as 95 in database, got: ${quizData.totalXp}`);
  assert(quizData.newlyUnlockedBadges?.includes('badge-first-quiz'), 'First Quiz badge unlocked');
  assert(quizData.newlyUnlockedBadges?.includes('badge-flawless'), 'Flawless Victory badge unlocked');

  // 6. Idempotency & Duplicate Reward Prevention
  console.log('\n--- Step 6: Idempotency & Duplicate Reward Prevention ---');
  const duplicateQuizRes = await fetch(`${BASE_URL}/api/gamification/complete-quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookieA,
    },
    body: JSON.stringify({
      quizId: 'quiz-fund-1',
      category: 'fundamentals',
      sessionToken: quizSessionToken, // same token!
      answers: perfectAnswers,
    }),
  });

  const duplicateData = await duplicateQuizRes.json();
  assert(duplicateQuizRes.status === 200, 'Duplicate submission gracefully handled');
  assert(duplicateData.isDuplicate === true, 'Duplicate submission identified via token constraint');
  assert(duplicateData.verifiedXp === 0, 'No additional XP awarded for duplicate submission (0 XP)');
  assert(duplicateData.totalXp === 95, 'Student A XP remains 95 (no double-counting)');

  // 7. Complete Module Endpoint
  console.log('\n--- Step 7: Server-side Module Completion ---');
  const moduleSessionToken = `mod_sess_${Date.now()}`;
  const moduleRes = await fetch(`${BASE_URL}/api/gamification/complete-module`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookieA,
    },
    body: JSON.stringify({
      moduleId: 'cybersecurity-fundamentals',
      sessionToken: moduleSessionToken,
    }),
  });

  const moduleData = await moduleRes.json();
  assert(moduleRes.status === 200, 'Module completion recorded');
  assert(moduleData.verifiedXp === 30, 'Server awarded exactly 30 XP for module');
  assert(moduleData.totalXp === 125, `Student A total XP is now 125 (95 + 30), got: ${moduleData.totalXp}`);

  // Retrying the same module completion must be rejected/idempotent
  const duplicateModuleRes = await fetch(`${BASE_URL}/api/gamification/complete-module`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookieA,
    },
    body: JSON.stringify({
      moduleId: 'cybersecurity-fundamentals',
      sessionToken: moduleSessionToken,
    }),
  });
  const duplicateModuleData = await duplicateModuleRes.json();
  assert(duplicateModuleRes.status === 200 && duplicateModuleData.isDuplicate === true, 'Duplicate module completion blocked from awarding duplicate XP');
  assert(duplicateModuleData.totalXp === 125, 'Total XP remains unchanged at 125');

  // 8. User Isolation Test (Student B vs Student A)
  console.log('\n--- Step 8: User-to-User Data Isolation ---');
  const testEmailB = `student_b_${Date.now()}@example.com`;
  const registerBRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmailB,
      password: 'CyberPassword456!',
      displayName: 'Bob Defensive',
    }),
  });
  const sessionCookieB = registerBRes.headers.get('set-cookie').split(';')[0];

  const progressBRes = await fetch(`${BASE_URL}/api/gamification/progress`, {
    headers: { Cookie: sessionCookieB },
  });
  const progressBData = await progressBRes.json();
  assert(progressBData.profile?.totalXp === 0, 'Student B has isolated 0 XP (does not see Student A 125 XP)');
  assert(progressBData.profile?.totalQuizzes === 0, 'Student B has 0 quiz completion records');
  assert(progressBData.profile?.totalModulesCompleted === 0, 'Student B has 0 module completion records');
  assert(progressBData.profile?.unlockedBadges?.length === 0, 'Student B has 0 unlocked badges');

  // Verify Student A's progress is still intact
  const progressARes = await fetch(`${BASE_URL}/api/gamification/progress`, {
    headers: { Cookie: sessionCookieA },
  });
  const progressAData = await progressARes.json();
  assert(progressAData.profile?.totalXp === 125, 'Student A progress is intact with 125 XP');
  assert(progressAData.profile?.totalQuizzes === 1, 'Student A has 1 quiz completion record');
  assert(progressAData.profile?.totalModulesCompleted === 1, 'Student A has 1 module completion record');
  assert(progressAData.profile?.unlockedBadges?.length >= 2, 'Student A has unlocked badges');

  // 9. Legacy Progress Migration Test (Safe Capped Migration)
  console.log('\n--- Step 9: Legacy Progress Migration ---');
  const legacyMigrateRes = await fetch(`${BASE_URL}/api/gamification/migrate-legacy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookieB,
    },
    body: JSON.stringify({
      legacyData: {
        completedModuleIds: ['threat-modeling-basics'],
      },
    }),
  });
  const legacyData = await legacyMigrateRes.json();
  assert(legacyMigrateRes.status === 200, 'Legacy migration endpoint succeeded');
  assert(legacyData.totalXp === 30, `Student B total XP safely awarded 30 for 1 verified module, got: ${legacyData.totalXp}`);
  assert(legacyData.migratedModules === 1, '1 module migrated');

  // Attempt to migrate same module again -> should be duplicate/idempotent
  const repeatMigrateRes = await fetch(`${BASE_URL}/api/gamification/migrate-legacy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookieB,
    },
    body: JSON.stringify({
      legacyData: {
        completedModuleIds: ['threat-modeling-basics'],
      },
    }),
  });
  const repeatMigrateData = await repeatMigrateRes.json();
  assert(repeatMigrateData.migratedModules === 0, 'Repeated migration of already migrated module results in 0 new awards');
  assert(repeatMigrateData.totalXp === 30, 'Student B total XP not inflated by repeat migration');

  // 10. Logout & Session Invalidation
  console.log('\n--- Step 10: Logout & Session Invalidation ---');
  const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { Cookie: sessionCookieA },
  });
  assert(logoutRes.status === 200, 'Student A successfully logged out');
  const expiredCookie = logoutRes.headers.get('set-cookie');
  assert(expiredCookie && expiredCookie.includes('Max-Age=0'), 'Session cookie cleared/expired');

  // Verify that an invalidated session cannot access protected endpoints
  const postLogoutMe = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { Cookie: 'cyber_session=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT' },
  });
  const postLogoutData = await postLogoutMe.json();
  assert(postLogoutData.user === null, 'Logged-out user session returns null user in /api/auth/me');

  const postLogoutProgress = await fetch(`${BASE_URL}/api/gamification/progress`, {
    headers: { Cookie: 'cyber_session=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT' },
  });
  assert(postLogoutProgress.status === 401, 'Logged-out user rejected with 401 Unauthorized for progress');

  // 11. Re-Login as Student A & Verify Data Persistence Across Sessions
  console.log('\n--- Step 11: Re-Login as Student A & Verify Data Persistence Across Sessions ---');
  const reloginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmailA,
      password: 'CyberPassword123!',
    }),
  });
  assert(reloginRes.status === 200, 'Student A re-logged in successfully with email and password');
  const reloginCookie = reloginRes.headers.get('set-cookie').split(';')[0];

  const reloginProgressRes = await fetch(`${BASE_URL}/api/gamification/progress`, {
    headers: { Cookie: reloginCookie },
  });
  const reloginProgressData = await reloginProgressRes.json();
  assert(reloginProgressRes.status === 200, 'Re-authenticated session retrieved progress');
  assert(reloginProgressData.profile?.totalXp === 125, `Progress retained after re-login: 125 XP (expected 125), got: ${reloginProgressData.profile?.totalXp}`);
  assert(reloginProgressData.profile?.totalQuizzes === 1, 'Quiz completion count retained after re-login');
  assert(reloginProgressData.profile?.totalModulesCompleted === 1, 'Module completion count retained after re-login');
  assert(reloginProgressData.profile?.quizHistory?.length === 1, 'Quiz history list returned and persisted');
  assert(reloginProgressData.profile?.completedModules?.length === 1, 'Completed modules list returned and persisted');
  assert(reloginProgressData.profile?.unlockedBadges?.includes('badge-first-quiz'), 'First Steps badge retained after re-login');
  assert(reloginProgressData.profile?.unlockedBadges?.includes('badge-flawless'), 'Perfect Score badge retained after re-login');

  // 12. Score Bonus Tiers Verification
  console.log('\n--- Step 12: Verify Bonus Reward Tiers ---');
  // 8/10 answers (80% score) -> Base 50 + High Score 25 = 75 XP (no perfect bonus)
  const answers80Pct = {
    'fund-01': 'B',
    'fund-02': 'B',
    'fund-03': 'B',
    'fund-04': 'A',
    'fund-05': 'B',
    'fund-06': 'B',
    'fund-07': 'B',
    'fund-08': 'B',
    'fund-09': 'X', // wrong
    'fund-10': 'X', // wrong
  };
  const token80 = `quiz_tier_80_${Date.now()}`;
  const res80 = await fetch(`${BASE_URL}/api/gamification/complete-quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: reloginCookie },
    body: JSON.stringify({
      quizId: 'quiz-fund-80',
      category: 'fundamentals',
      sessionToken: token80,
      answers: answers80Pct,
    }),
  });
  const data80 = await res80.json();
  assert(res80.status === 200, '80% quiz submission processed');
  assert(data80.score === 8 && data80.scorePercentage === 80, 'Calculated exactly 8/10 (80%)');
  assert(data80.verifiedXp === 75, `Awarded exactly 75 XP (50 base + 25 bonus), got: ${data80.verifiedXp}`);

  // 6/10 answers (60% score) -> Base 50 only = 50 XP
  const answers60Pct = {
    'fund-01': 'B',
    'fund-02': 'B',
    'fund-03': 'B',
    'fund-04': 'A',
    'fund-05': 'B',
    'fund-06': 'B',
    'fund-07': 'X', // wrong
    'fund-08': 'X', // wrong
    'fund-09': 'X', // wrong
    'fund-10': 'X', // wrong
  };
  const token60 = `quiz_tier_60_${Date.now()}`;
  const res60 = await fetch(`${BASE_URL}/api/gamification/complete-quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: reloginCookie },
    body: JSON.stringify({
      quizId: 'quiz-fund-60',
      category: 'fundamentals',
      sessionToken: token60,
      answers: answers60Pct,
    }),
  });
  const data60 = await res60.json();
  assert(res60.status === 200, '60% quiz submission processed');
  assert(data60.score === 6 && data60.scorePercentage === 60, 'Calculated exactly 6/10 (60%)');
  assert(data60.verifiedXp === 50, `Awarded exactly 50 XP (base only, no bonus), got: ${data60.verifiedXp}`);

  // 13. Verify Dashboard & Public Learning Routes
  console.log('\n--- Step 13: Verify Dashboard & Public Learning Routes ---');
  const progressPageRes = await fetch(`${BASE_URL}/learn/progress`);
  assert(progressPageRes.status === 200, 'Student progress dashboard page /learn/progress returns 200 OK');

  const fundamentalsPageRes = await fetch(`${BASE_URL}/learn/cybersecurity-fundamentals`);
  assert(fundamentalsPageRes.status === 200, 'Fundamentals curriculum guide returns 200 OK');

  const toolsPageRes = await fetch(`${BASE_URL}/tools/password-strength`);
  assert(toolsPageRes.status === 200, 'Interactive tools page returns 200 OK');

  const scamPageRes = await fetch(`${BASE_URL}/scam-awareness`);
  assert(scamPageRes.status === 200, 'Scam awareness hub returns 200 OK');

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
