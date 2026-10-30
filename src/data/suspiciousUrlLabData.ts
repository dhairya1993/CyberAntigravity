export type UrlRiskClassification = 'suspicious' | 'authentic';

export interface UrlForensicIndicator {
  name: string;
  type: 'domain' | 'subdomain' | 'protocol' | 'path' | 'userinfo' | 'shortener';
  detail: string;
  whyItMatters: string;
}

export interface UrlInvestigationCase {
  id: string;
  caseNumber: number;
  title: string;
  testUrl: string;
  targetConcept: string;
  expectedClassification: UrlRiskClassification;
  protocol: string;
  subdomain: string;
  registrableDomain: string;
  tld: string;
  path: string;
  classificationExplanation: string;
  forensicBreakdown: UrlForensicIndicator[];
  educationalRule: string;
}

export const URL_INVESTIGATION_CASES: UrlInvestigationCase[] = [
  {
    id: 'url-case-01',
    caseNumber: 1,
    title: 'Character Substitution & Typosquatting',
    testUrl: 'https://www.micros0ft-online-security.com/auth/login',
    targetConcept: 'Typosquatting & Digit Swapping',
    expectedClassification: 'suspicious',
    protocol: 'https:',
    subdomain: 'www',
    registrableDomain: 'micros0ft-online-security.com',
    tld: 'com',
    path: '/auth/login',
    classificationExplanation:
      'The domain replaces the letter "o" with the numeral zero "0" (micros0ft) and appends hyphenated keywords (-online-security). The real Microsoft domain is microsoft.com.',
    educationalRule:
      'Always scrutinize character spelling in domain names. Scammers swap visually similar characters (like 0/o, 1/l, or rn/m) to deceive human eyes.',
    forensicBreakdown: [
      {
        name: 'Digit Substitution (0 for O)',
        type: 'domain',
        detail: '"micros0ft" substitutes numeral 0 for letter O',
        whyItMatters: 'Exploits glance-reading habits where the human brain autocompletes familiar brand words.',
      },
      {
        name: 'Hyphenated Brand Augmentation',
        type: 'domain',
        detail: 'Adds "-online-security" to manufacture artificial authority',
        whyItMatters: 'Adding words like "security", "verify", or "support" makes fraudulent domains appear official to novices.',
      },
      {
        name: 'Misleading Login Path',
        type: 'path',
        detail: '/auth/login creates an authentic-looking resource route',
        whyItMatters: 'Any web server can host an /auth/login path; path structure has zero bearing on domain authenticity.',
      },
    ],
  },
  {
    id: 'url-case-02',
    caseNumber: 2,
    title: 'Subdomain Deception Trap',
    testUrl: 'https://chase.com.security-alert-verification.net/portal/signin',
    targetConcept: 'Subdomain Prepend Trick',
    expectedClassification: 'suspicious',
    protocol: 'https:',
    subdomain: 'chase.com',
    registrableDomain: 'security-alert-verification.net',
    tld: 'net',
    path: '/portal/signin',
    classificationExplanation:
      'The genuine brand name "chase.com" is merely a subdomain label created by the owner of "security-alert-verification.net". You are visiting security-alert-verification.net, NOT Chase Bank!',
    educationalRule:
      'Read domains from right to left starting from the first single forward slash (/): the registered domain is the two labels immediately before that slash.',
    forensicBreakdown: [
      {
        name: 'Brand Prepend in Subdomain',
        type: 'subdomain',
        detail: 'Subdomain is set to "chase.com"',
        whyItMatters: 'Any domain owner can create subdomains named after any brand (e.g. apple.com.mywebsite.com).',
      },
      {
        name: 'Rogue Registrable Domain',
        type: 'domain',
        detail: 'Actual host is security-alert-verification.net',
        whyItMatters: 'The domain owner of security-alert-verification.net controls the SSL certificate and server backend.',
      },
    ],
  },
  {
    id: 'url-case-03',
    caseNumber: 3,
    title: 'The HTTPS False Security Myth',
    testUrl: 'https://secure-payroll-employee-selfservice.xyz/login',
    targetConcept: 'HTTPS Does Not Equal Safe',
    expectedClassification: 'suspicious',
    protocol: 'https:',
    subdomain: '(none)',
    registrableDomain: 'secure-payroll-employee-selfservice.xyz',
    tld: 'xyz',
    path: '/login',
    classificationExplanation:
      'This URL features a valid HTTPS padlock, but is hosted on a cheap disposable .xyz domain with generic corporate keywords. Over 80% of phishing sites use valid HTTPS certificates!',
    educationalRule:
      'HTTPS only means the connection is encrypted between your browser and the server. It does NOT mean the website owner is honest or trustworthy.',
    forensicBreakdown: [
      {
        name: 'Encrypted Fraud (HTTPS Misunderstanding)',
        type: 'protocol',
        detail: 'Valid HTTPS protocol with TLS certificate',
        whyItMatters: 'Free automated certificate authorities (like Let\'s Encrypt) grant SSL certs to anyone in 30 seconds, including criminals.',
      },
      {
        name: 'Untrusted TLD & Generic Keyword Cluster',
        type: 'domain',
        detail: 'Disposable .xyz TLD with generic HR keywords',
        whyItMatters: 'Criminals register hundreds of .xyz domains daily for phishing landing pages.',
      },
    ],
  },
  {
    id: 'url-case-04',
    caseNumber: 4,
    title: 'URL Shortener Destination Obscuration',
    testUrl: 'https://bit.ly/3xUrgentPaystubAlert',
    targetConcept: 'Destination Masking via Shortener',
    expectedClassification: 'suspicious',
    protocol: 'https:',
    subdomain: '(none)',
    registrableDomain: 'bit.ly',
    tld: 'ly',
    path: '/3xUrgentPaystubAlert',
    classificationExplanation:
      'URL shorteners completely mask the destination server. When clicked, bit.ly returns an HTTP 301/302 redirect header sending your browser to an uninspected endpoint.',
    educationalRule:
      'Never click shortened URLs in unexpected SMS or email messages. Use safe preview services (like adding a "+" to bit.ly links) to inspect the destination without visiting.',
    forensicBreakdown: [
      {
        name: 'Hidden Endpoint Redirection',
        type: 'shortener',
        detail: 'bit.ly HTTP 301/302 redirector',
        whyItMatters: 'Prevents security scanners and users from evaluating the domain before connection.',
      },
      {
        name: 'Social Engineering Slug',
        type: 'path',
        detail: 'Path contains "UrgentPaystubAlert" to manufacture urgency',
        whyItMatters: 'Custom aliases bait victims into trusting an otherwise opaque shortened link.',
      },
    ],
  },
  {
    id: 'url-case-05',
    caseNumber: 5,
    title: 'Embedded Userinfo / @ Symbol Trick (RFC 3986)',
    testUrl: 'https://google.com@auth-attacker-gateway.org/accounts/recovery',
    targetConcept: 'RFC 3986 Userinfo Ambiguity',
    expectedClassification: 'suspicious',
    protocol: 'https:',
    subdomain: '(none)',
    registrableDomain: 'auth-attacker-gateway.org',
    tld: 'org',
    path: '/accounts/recovery',
    classificationExplanation:
      'In standard internet URL syntax (RFC 3986), anything between the protocol and the "@" symbol is interpreted as a username credential! The browser connects to the domain AFTER the "@": auth-attacker-gateway.org.',
    educationalRule:
      'If you see an "@" symbol anywhere before the first single slash (/), the browser will ignore the text before the "@" and connect to the domain after the "@".',
    forensicBreakdown: [
      {
        name: 'Userinfo Brand Impersonation',
        type: 'userinfo',
        detail: '"google.com" is parsed as user credentials, not the host',
        whyItMatters: 'Tricks users into believing they are navigating to google.com when they are connecting to auth-attacker-gateway.org.',
      },
      {
        name: 'True Host Follows the @ Symbol',
        type: 'domain',
        detail: 'Actual destination host is auth-attacker-gateway.org',
        whyItMatters: 'Understanding RFC URL parsing grammar eliminates this deceptive optical illusion.',
      },
    ],
  },
  {
    id: 'url-case-06',
    caseNumber: 6,
    title: 'Legitimate Multi-Subdomain Cloud Service',
    testUrl: 'https://eu-west-1.signin.aws.amazon.com/oauth/v2/token',
    targetConcept: 'Authentic Deep Subdomains',
    expectedClassification: 'authentic',
    protocol: 'https:',
    subdomain: 'eu-west-1.signin.aws',
    registrableDomain: 'amazon.com',
    tld: 'com',
    path: '/oauth/v2/token',
    classificationExplanation:
      'Despite having 3 levels of subdomains (eu-west-1.signin.aws), the registrable domain is verified as "amazon.com". Large cloud architectures legitimately use deep subdomains for regional routing.',
    educationalRule:
      'Complex subdomains are not inherently malicious. As long as the registrable domain belongs to the authentic organization, the subdomains are securely managed by that organization.',
    forensicBreakdown: [
      {
        name: 'Authentic Registrable Domain Ownership',
        type: 'domain',
        detail: 'amazon.com is the genuine corporate entity',
        whyItMatters: 'The domain owner of amazon.com strictly controls all sub-allocations under .amazon.com.',
      },
      {
        name: 'Functional Regional Infrastructure Subdomains',
        type: 'subdomain',
        detail: 'eu-west-1 (region) + signin (function) + aws (division)',
        whyItMatters: 'Enterprise cloud providers structure routing logically across datacenters worldwide.',
      },
      {
        name: 'Standard OAuth 2.0 API Endpoint Path',
        type: 'path',
        detail: '/oauth/v2/token standard authorization route',
        whyItMatters: 'Consistent with RFC 6749 OAuth industry specifications.',
      },
    ],
  },
];
