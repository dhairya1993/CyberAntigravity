import { LearningLevelItem, LearningTopicItem, FutureLabItem } from '@/types';

export const LEARNING_LEVELS: LearningLevelItem[] = [
  {
    level: 1,
    title: 'Cybersecurity Fundamentals',
    slug: 'cybersecurity-fundamentals',
    difficulty: 'Beginner',
    shortDescription:
      'Grasp core terminology, the CIA Triad, authentication paradigms, threat categories, and fundamental defensive principles.',
    topicsCount: 6,
    topics: [
      'What is Cybersecurity?',
      'Common Cyber Threats',
      'CIA Triad',
      'Authentication & Authorization',
      'Basic Security Principles',
      'Security Terminology',
    ],
    estimatedHours: '8 hrs',
    iconName: 'Shield',
    accentColor: 'cyan',
    status: 'Available',
    access: 'free',
  },
  {
    level: 2,
    title: 'Digital Safety',
    slug: 'digital-safety',
    difficulty: 'Beginner',
    shortDescription:
      'Master personal digital hygiene: credential defense, multi-factor authentication, phishing recognition, and safe device handling.',
    topicsCount: 8,
    topics: [
      'Password Security',
      'MFA',
      'Phishing',
      'Social Engineering',
      'Privacy',
      'Safe Browsing',
      'Device Security',
      'Account Security',
    ],
    estimatedHours: '10 hrs',
    iconName: 'Smartphone',
    accentColor: 'emerald',
    status: 'Planned',
    access: 'free',
  },
  {
    level: 3,
    title: 'Networking Fundamentals',
    slug: 'networking-fundamentals',
    difficulty: 'Beginner',
    shortDescription:
      'Understand how data moves across networks: IP/MAC addressing, DNS resolution, TCP/UDP packets, ports, firewalls, and segmentation.',
    topicsCount: 10,
    topics: [
      'What is a Network?',
      'IP Addresses',
      'MAC Addresses',
      'DNS',
      'HTTP / HTTPS',
      'TCP / UDP',
      'Ports',
      'Firewalls',
      'VPN Concepts',
      'Network Segmentation',
    ],
    estimatedHours: '14 hrs',
    iconName: 'Network',
    accentColor: 'blue',
    status: 'Planned',
    access: 'free',
  },
  {
    level: 4,
    title: 'Operating System Security',
    slug: 'operating-system-security',
    difficulty: 'Intermediate',
    shortDescription:
      'Harden operating systems: user privilege models, process isolation, background services, file permissions, patching, and system logging.',
    topicsCount: 8,
    topics: [
      'Windows Security',
      'Linux Fundamentals',
      'Users & Permissions',
      'Processes',
      'Services',
      'File Permissions',
      'Updates & Patching',
      'Logging',
    ],
    estimatedHours: '12 hrs',
    iconName: 'Terminal',
    accentColor: 'purple',
    status: 'Planned',
    access: 'free',
  },
  {
    level: 5,
    title: 'Web Security',
    slug: 'web-security',
    difficulty: 'Intermediate',
    shortDescription:
      'Explore web architecture: HTTP protocol mechanics, sessions, cookies, the OWASP Top 10, input sanitation, and secure development standards.',
    topicsCount: 9,
    topics: [
      'How Websites Work',
      'HTTP Requests',
      'Cookies',
      'Sessions',
      'Authentication',
      'OWASP Concepts',
      'Input Validation',
      'Common Web Vulnerabilities',
      'Secure Development Basics',
    ],
    estimatedHours: '14 hrs',
    iconName: 'Code2',
    accentColor: 'cyan',
    status: 'Planned',
    access: 'free',
  },
  {
    level: 6,
    title: 'Ethical Hacking Foundations',
    slug: 'ethical-hacking-foundations',
    difficulty: 'Intermediate',
    shortDescription:
      'Learn the defensive utility of offensive research: reconnaissance, vulnerability scoping, threat modeling, and responsible disclosure.',
    topicsCount: 7,
    topics: [
      'Ethical Hacking Principles',
      'Reconnaissance Concepts',
      'Vulnerability Assessment',
      'Threat Modeling',
      'Security Testing Methodology',
      'Reporting Findings',
      'Responsible Disclosure',
    ],
    estimatedHours: '16 hrs',
    iconName: 'SearchCode',
    accentColor: 'amber',
    status: 'Planned',
    access: 'free',
  },
  {
    level: 7,
    title: 'Security Operations',
    slug: 'security-operations',
    difficulty: 'Advanced',
    shortDescription:
      'Defend active enterprise environments: Security Operations Centers (SOC), SIEM correlation, alert triage, incident response, and threat feeds.',
    topicsCount: 8,
    topics: [
      'SOC Fundamentals',
      'Security Monitoring',
      'Logs',
      'SIEM Concepts',
      'Detection',
      'Incident Response',
      'Threat Intelligence',
      'Security Alerts',
    ],
    estimatedHours: '16 hrs',
    iconName: 'Activity',
    accentColor: 'purple',
    status: 'Planned',
    access: 'free',
  },
  {
    level: 8,
    title: 'Digital Forensics',
    slug: 'digital-forensics',
    difficulty: 'Advanced',
    shortDescription:
      'Investigate security incidents: digital artifact preservation, file system metadata, timeline reconstruction, and forensic chain of custody.',
    topicsCount: 7,
    topics: [
      'Digital Evidence',
      'Evidence Preservation',
      'File Metadata',
      'Logs',
      'Timeline Analysis',
      'Basic Forensic Concepts',
      'Chain of Custody',
    ],
    estimatedHours: '15 hrs',
    iconName: 'FileSearch',
    accentColor: 'blue',
    status: 'Planned',
    access: 'free',
  },
  {
    level: 9,
    title: 'AI & Cybersecurity',
    slug: 'ai-and-cybersecurity',
    difficulty: 'Advanced',
    shortDescription:
      'Secure machine intelligence: AI threat modeling, prompt injection risks, model data privacy, and defensive AI-assisted telemetry workflows.',
    topicsCount: 7,
    topics: [
      'AI in Cybersecurity',
      'AI-Assisted Threat Detection',
      'AI Security Risks',
      'Prompt Injection Awareness',
      'AI Privacy',
      'Securing AI Applications',
      'Defensive AI Workflows',
    ],
    estimatedHours: '12 hrs',
    iconName: 'Sparkles',
    accentColor: 'cyan',
    status: 'Planned',
    access: 'free',
  },
];

export const RECOMMENDED_START_STEPS = [
  {
    step: 1,
    title: 'Cybersecurity Fundamentals',
    level: 'Level 1',
    description: 'Learn foundational terms, core security pillars, and how systems are defended.',
    slug: 'cybersecurity-fundamentals',
    ready: true,
  },
  {
    step: 2,
    title: 'Digital Safety',
    level: 'Level 2',
    description: 'Protect your own identities, passwords, devices, and communications.',
    slug: 'digital-safety',
    ready: false,
  },
  {
    step: 3,
    title: 'Networking Fundamentals',
    level: 'Level 3',
    description: 'Understand packets, IPs, DNS, firewalls, and data transport layers.',
    slug: 'networking-fundamentals',
    ready: false,
  },
  {
    step: 4,
    title: 'Operating System Security',
    level: 'Level 4',
    description: 'Master processes, permissions, user privileges, and system event logs.',
    slug: 'operating-system-security',
    ready: false,
  },
  {
    step: 5,
    title: 'Web Security',
    level: 'Level 5',
    description: 'Inspect HTTP requests, authentication tokens, cookies, and OWASP vulnerabilities.',
    slug: 'web-security',
    ready: false,
  },
  {
    step: 6,
    title: 'Ethical Hacking Foundations',
    level: 'Level 6',
    description: 'Learn ethical assessment methodology, threat modeling, and defensive testing.',
    slug: 'ethical-hacking-foundations',
    ready: false,
  },
  {
    step: 7,
    title: 'Security Operations',
    level: 'Level 7',
    description: 'Explore SOC triage, SIEM correlation engines, and live incident response.',
    slug: 'security-operations',
    ready: false,
  },
  {
    step: 8,
    title: 'Digital Forensics',
    level: 'Level 8',
    description: 'Acquire digital evidence, analyze artifact timelines, and preserve integrity.',
    slug: 'digital-forensics',
    ready: false,
  },
  {
    step: 9,
    title: 'AI & Cybersecurity',
    level: 'Level 9',
    description: 'Understand prompt injection, AI defense, and secure model workflows.',
    slug: 'ai-and-cybersecurity',
    ready: false,
  },
];

export const TEACHING_PRINCIPLES = [
  {
    step: '01',
    title: 'Learn',
    subtitle: 'Clear Concepts First',
    description:
      'Grasp foundational definitions, architectural models, and security principles without overwhelming technical jargon.',
  },
  {
    step: '02',
    title: 'Understand',
    subtitle: 'The Attacker & Defender Perspective',
    description:
      'Analyze why vulnerabilities occur, how attackers manipulate weaknesses, and how defensive controls counteract them.',
  },
  {
    step: '03',
    title: 'Practice',
    subtitle: 'Hands-On Problem Solving',
    description:
      'Apply knowledge through structured checklists, interactive inspection challenges, and controlled educational environments.',
  },
  {
    step: '04',
    title: 'Verify',
    subtitle: 'Knowledge Retention Checks',
    description:
      'Evaluate your grasp of core principles with instant scenario-based questions and in-depth rationales.',
  },
  {
    step: '05',
    title: 'Apply',
    subtitle: 'Real-World Hardening',
    description:
      'Translate conceptual learning into tangible defensive configurations for personal devices, networks, and software applications.',
  },
];

export const FUTURE_LABS: FutureLabItem[] = [
  {
    id: 'lab-web',
    title: 'Web Security Labs',
    category: 'Application Defense',
    description:
      'Inspect simulated HTTP headers, cookie security flags, sanitized form inputs, and authorization boundaries in isolated sandbox instances.',
    coreFocus: ['OWASP Top 10 Defense', 'Header Inspection', 'Input Validation Testing'],
    status: 'Coming Soon',
    iconName: 'Code2',
  },
  {
    id: 'lab-network',
    title: 'Network Security Labs',
    category: 'Infrastructure',
    description:
      'Analyze pre-captured packet traces, inspect DNS lookups, configure simulated firewall rules, and examine network segmentation designs.',
    coreFocus: ['PCAP Trace Triage', 'Subnet Masking', 'Port & Protocol Analysis'],
    status: 'Coming Soon',
    iconName: 'Network',
  },
  {
    id: 'lab-linux',
    title: 'Linux Security Labs',
    category: 'Systems Hardening',
    description:
      'Audit file permissions, explore process hierarchies, configure SSH key-based access, and inspect Linux audit logs inside safe browser containers.',
    coreFocus: ['File Permissions (chmod/chown)', 'Process Auditing', 'SSH Hardening'],
    status: 'Coming Soon',
    iconName: 'Terminal',
  },
  {
    id: 'lab-soc',
    title: 'SOC Detection Labs',
    category: 'Security Operations',
    description:
      'Triage simulated security alert queues, correlate log telemetry across multiple endpoints, and draft initial incident response containment notes.',
    coreFocus: ['SIEM Alert Correlation', 'Incident Triage', 'IoC Investigation'],
    status: 'Coming Soon',
    iconName: 'Activity',
  },
  {
    id: 'lab-forensics',
    title: 'Digital Forensics Labs',
    category: 'Investigation',
    description:
      'Examine simulated file system artifacts, reconstruct chronological event timelines from forensic logs, and calculate cryptographic file hashes.',
    coreFocus: ['Timeline Reconstruction', 'Hash Verification (SHA-256)', 'Metadata Extraction'],
    status: 'Coming Soon',
    iconName: 'FileSearch',
  },
  {
    id: 'lab-ai',
    title: 'AI Security Labs',
    category: 'Emerging Tech',
    description:
      'Test defensive guardrails against prompt injection attempts, inspect output filtering rules, and explore secure system prompt design.',
    coreFocus: ['Indirect Prompt Injection Defense', 'Guardrail Testing', 'API Key Protection'],
    status: 'Coming Soon',
    iconName: 'Sparkles',
  },
];

export const CYBERSECURITY_FUNDAMENTALS_TOPIC: LearningTopicItem = {
  slug: 'cybersecurity-fundamentals',
  title: 'Cybersecurity Fundamentals',
  levelNumber: 1,
  levelTitle: 'Level 1: Cybersecurity Fundamentals',
  difficulty: 'Beginner',
  estimatedMinutes: '25 min',
  overview:
    'Cybersecurity is the discipline of protecting digital devices, networks, services, and sensitive data from unintended or unauthorized access, alteration, theft, or disruption. This foundational module covers the core mental models required to evaluate security problems defensively.',
  learningObjectives: [
    'Define cybersecurity and understand why defense-in-depth is essential.',
    'Explain the CIA Triad (Confidentiality, Integrity, Availability) with concrete examples.',
    'Differentiate between Authentication (who you are), Authorization (what you can do), and Accountability (what you did).',
    'Recognize primary cyber threat vectors: malware, social engineering, denial of service, and misconfigurations.',
    'Understand foundational security principles like Least Privilege, Defense-in-Depth, and Zero Trust.',
  ],
  keyConcepts: [
    {
      title: 'Confidentiality',
      description:
        'Ensuring that information is accessible only to those authorized to have access. Protected through encryption (at rest and in transit), granular access control lists (ACLs), and strict data classification policies.',
      tag: 'CIA Triad',
    },
    {
      title: 'Integrity',
      description:
        'Guaranteeing the accuracy, completeness, and trustworthiness of data over its entire lifecycle. Protected using cryptographic hashing (e.g. SHA-256), digital signatures, checksums, and immutable audit logs.',
      tag: 'CIA Triad',
    },
    {
      title: 'Availability',
      description:
        'Ensuring that authorized users have timely and reliable access to information and computing resources when needed. Supported by system redundancy, failover clusters, DDoS mitigation, and robust backup strategies.',
      tag: 'CIA Triad',
    },
    {
      title: 'Authentication (AuthN)',
      description:
        'The verification of the identity claimed by a user or device. Common factors include something you know (passwords), something you have (security keys, authenticator apps), and something you are (biometrics).',
      tag: 'Identity & Access',
    },
    {
      title: 'Authorization (AuthZ)',
      description:
        'The process of granting or denying specific permissions to an authenticated entity. Determines whether an authenticated user can read, write, modify, or delete a specific resource.',
      tag: 'Identity & Access',
    },
    {
      title: 'Principle of Least Privilege (PoLP)',
      description:
        'A defensive design standard stating that every module, user, or process must be granted only the minimum access rights and permissions required to perform its authorized function.',
      tag: 'Defensive Principle',
    },
    {
      title: 'Defense-in-Depth',
      description:
        'A strategy that employs multiple layers of defensive controls throughout an information system. If one defensive barrier fails, secondary controls continue to isolate the threat.',
      tag: 'Defensive Architecture',
    },
  ],
  lessons: [
    {
      id: 'lesson-1',
      title: 'What Is Cybersecurity?',
      duration: '10 min',
      summary:
        'Understand the core definition of digital security, why it matters to modern society, and explore the CIA Triad and AAA framework with beginner-friendly examples.',
      slug: 'what-is-cybersecurity',
    },
    {
      id: 'lesson-2',
      title: 'Common Threat Vectors & Attackers',
      duration: '12 min',
      summary:
        'Survey malware categories, phishing mechanics, credential stuffing, and insider threats to develop an accurate threat awareness model.',
      slug: 'common-threat-vectors',
    },
    {
      id: 'lesson-3',
      title: 'Core Architectural Security Principles',
      duration: '10 min',
      summary:
        'Deep-dive into Least Privilege, Separation of Duties, Fail-Safe Defaults, and the evolution from Perimeter Security to Zero Trust.',
      slug: 'security-principles',
    },
    {
      id: 'lesson-4',
      title: 'Essential Security Terminology',
      duration: '8 min',
      summary:
        'Demystify key terms: Vulnerability, Exploit, Threat, Risk, Zero-Day, CVE, Patch, Attack Surface, and IoC.',
      slug: 'security-terminology',
    },
  ],
  practicalExamples: [
    {
      title: 'Healthcare Record System (CIA in Action)',
      scenario:
        'A hospital manages patient health records. A ransomware infection encrypts the database server, leaving doctors unable to check allergic reactions before emergency surgery.',
      defensiveStrategy:
        'This represents an Availability failure (ransomware locking records) and potential Confidentiality risk. Defense requires immutable offline backups, network segmentation between medical equipment and office workstations, and endpoint detection to halt unauthorized file encryption.',
      keyTakeaway:
        'Security is not just about keeping secrets; availability can directly impact human health and critical operations.',
    },
    {
      title: 'Financial Transfer Approvals (AuthN vs AuthZ)',
      scenario:
        'A junior accountant logs into the company accounting portal using valid credentials. They attempt to approve a $50,000 international vendor wire payment.',
      defensiveStrategy:
        'Authentication verifies that the employee is who they say they are. Authorization rules (Role-Based Access Control) ensure only CFOs or dual signatories can execute wires over $10,000, immediately rejecting the transaction.',
      keyTakeaway:
        'Being authenticated never implies having universal permission. Granular authorization boundaries protect critical actions.',
    },
    {
      title: 'Remote Employee Workstation (Least Privilege & Defense-in-Depth)',
      scenario:
        'An employee opens a malicious document on a corporate laptop. The file attempts to install an unrecognized system driver and modify registry startup keys.',
      defensiveStrategy:
        'Because the user account is configured as a Standard User (Principle of Least Privilege), the installer lacks administrator rights to modify system drivers. Simultaneously, endpoint protection blocks unauthorized execution (Defense-in-Depth).',
      keyTakeaway:
        'Running standard accounts rather than full administrator accounts prevents many opportunistic malware infections from achieving system persistence.',
    },
  ],
  knowledgeCheck: [
    {
      id: 'q1',
      question:
        'A hospital emergency department cannot view patient medication allergies because their database server was taken offline by a denial-of-service event. Which pillar of the CIA Triad has been primarily violated?',
      topic: 'CIA Triad',
      options: [
        { id: 'A', text: 'Confidentiality' },
        { id: 'B', text: 'Integrity' },
        { id: 'C', text: 'Availability' },
        { id: 'D', text: 'Non-Repudiation' },
      ],
      correctOptionId: 'C',
      explanation:
        'Availability ensures authorized users have timely and reliable access to systems and data. Taking a database offline disrupts operational availability, even if no data was stolen or altered.',
      whyItMatters:
        'Understanding that downtime and denial-of-service are security issues—not just IT operations issues—is central to defensive engineering.',
    },
    {
      id: 'q2',
      question:
        'A user enters their username, master password, and a 6-digit one-time code from an authenticator app. Which security process was just executed?',
      topic: 'Authentication',
      options: [
        { id: 'A', text: 'Authentication (verifying claimed identity)' },
        { id: 'B', text: 'Authorization (assigning permissions)' },
        { id: 'C', text: 'Accounting (recording user activity)' },
        { id: 'D', text: 'Data Sanitization' },
      ],
      correctOptionId: 'A',
      explanation:
        'Authentication is the mechanism of verifying that an entity is who they claim to be. Multi-factor authentication combines knowledge (password) and possession (authenticator code).',
      whyItMatters:
        'Confusing authentication with authorization leads to architectural security flaws where identity verification is treated as automatic permission.',
    },
    {
      id: 'q3',
      question:
        'A marketing specialist successfully logs into the company internal portal, but when clicking "View Salary Records", receives an "Access Denied: Insufficient Privileges" notice. What security mechanism blocked this request?',
      topic: 'Authorization',
      options: [
        { id: 'A', text: 'Multi-Factor Authentication' },
        { id: 'B', text: 'Authorization (permission control)' },
        { id: 'C', text: 'Digital Signature Validation' },
        { id: 'D', text: 'Denial of Service' },
      ],
      correctOptionId: 'B',
      explanation:
        'The user was already authenticated, but the authorization engine evaluated their assigned role and determined they lacked permission to access the salary dataset.',
      whyItMatters:
        'Authorization enforces boundaries inside a perimeter, ensuring accounts only touch resources relevant to their authorized responsibilities.',
    },
    {
      id: 'q4',
      question:
        'An employee receives an email titled "Urgent IT Notice: Mailbox Storage Exceeded" directing them to enter their domain credentials on a page hosted at "it-servicedesk-verify.top". What primary threat category does this represent?',
      topic: 'Phishing',
      options: [
        { id: 'A', text: 'Ransomware' },
        { id: 'B', text: 'Phishing (Social Engineering)' },
        { id: 'C', text: 'SQL Injection' },
        { id: 'D', text: 'Zero-Day Hardware Vulnerability' },
      ],
      correctOptionId: 'B',
      explanation:
        'Phishing is a social-engineering attack designed to trick individuals into disclosing sensitive information (like credentials) using deception, urgency, and deceptive domains.',
      whyItMatters:
        'Human-centric social engineering bypasses traditional perimeter defenses by coercing legitimate users into revealing credentials voluntarily.',
    },
    {
      id: 'q5',
      question:
        'Which administrative policy best demonstrates the Principle of Least Privilege?',
      topic: 'Least Privilege',
      options: [
        { id: 'A', text: 'Giving all developers full administrator rights to make debugging faster.' },
        { id: 'B', text: 'Granting users and processes only the minimum permissions necessary to complete their specific tasks.' },
        { id: 'C', text: 'Using the same root password across all production servers for simplicity.' },
        { id: 'D', text: 'Allowing all employees to access financial accounting sheets.' },
      ],
      correctOptionId: 'B',
      explanation:
        'The Principle of Least Privilege (PoLP) dictates that accounts, background services, and applications should have strictly the permissions required to accomplish their duties—no more, no less.',
      whyItMatters:
        'If an account with least privilege is compromised, the attacker cannot easily pivot across the entire network or execute administrative commands.',
    },
  ],
  nextTopic: {
    title: 'Digital Safety & Account Hardening',
    slug: 'digital-safety',
    levelNumber: 2,
  },
  access: 'free',
};
