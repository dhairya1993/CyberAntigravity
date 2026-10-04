export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export interface SafetyPillar {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  threats: string[];
  bestPractices: string[];
  readTime: string;
}

export interface ScamCategory {
  id: string;
  title: string;
  riskLevel: 'Critical' | 'High' | 'Moderate';
  iconName: string;
  summary: string;
  commonTactics: string[];
  redFlags: string[];
  protectionTip: string;
}

export interface LearnTrack {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modulesCount: number;
  estHours: string;
  iconName: string;
  description: string;
  topicsCovered: string[];
  status: 'Available' | 'Phase 2 Preview' | 'Coming Soon';
}

export type ToolCategory =
  | 'Security Basics'
  | 'Privacy'
  | 'Passwords'
  | 'URLs & Web Safety'
  | 'Scam Analysis'
  | 'Networking'
  | 'Learning'
  | 'Future AI Security';

export type ToolStatus = 'AVAILABLE' | 'BETA' | 'COMING SOON';

export type ToolDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  difficulty: ToolDifficulty;
  status: ToolStatus;
  iconName: string;
  href: string;
  isClientSideOnly: boolean;
  purpose: string;
  howItWorks: string[];
  limitations: string[];
  privacyNotes: string;
  educationalGuidance: string[];
  relatedToolSlugs?: string[];
  relatedLearningLink?: {
    title: string;
    href: string;
  };
  relatedArticleLink?: {
    title: string;
    href: string;
  };
}

export interface CyberTool {
  id: string;
  name: string;
  category: string;
  iconName: string;
  description: string;
  status: 'Interactive Preview' | 'Phase 2 Utility' | 'In Development';
  isInteractive?: boolean;
  capabilities: string[];
}

export type BlogCategory =
  | 'Cyber Safety'
  | 'Scam Awareness'
  | 'Privacy'
  | 'Passwords & Accounts'
  | 'Phishing'
  | 'Web Security'
  | 'Networking'
  | 'Ethical Hacking'
  | 'SOC & Security Operations'
  | 'Digital Forensics'
  | 'AI Security'
  | 'Cybersecurity Basics';

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogSubSection {
  id: string;
  title: string;
  content: string;
}

export interface BlogSection {
  id: string;
  title: string;
  content: string;
  subsections?: BlogSubSection[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  callout?: {
    type: 'note' | 'tip' | 'warning' | 'danger';
    title: string;
    text: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: string; // e.g. "6 min read"
  readTime?: string; // backwards compatibility
  publishedAt?: string; // genuine publication date if known
  updatedAt?: string;
  reviewedAt?: string;
  author: {
    name: string;
    role: string;
    attributionLabel?: string; // e.g. "CyberAntigravity Guide"
  };
  coverImage?: string;
  featured?: boolean;
  status: 'published' | 'draft';
  access?: 'free' | 'premium';
  keyTakeaways: string[];
  content: {
    introduction: string;
    sections: BlogSection[];
    faqs?: BlogFAQ[];
    conclusion?: string;
  };
  relatedTools?: string[];
  relatedLearning?: {
    title: string;
    href: string;
  }[];
  relatedArticles?: string[];
}

export type Article = BlogPost;

export interface SafetyChecklistItem {
  id: string;
  title: string;
  shortExplanation: string;
  detailedAction: string;
  iconName: string;
  category: string;
  topicAnchor?: string;
}

export interface SafetyTopicDetail {
  id: string;
  letter: string;
  category: string;
  title: string;
  iconName: string;
  readTime: string;
  summary: string;
  coreConcepts: {
    title: string;
    description: string;
    keyTip?: string;
  }[];
  practicalActions: string[];
  commonMisconceptions?: string[];
}

export interface RedFlagItem {
  number: number;
  title: string;
  summary: string;
  tacticExplanation: string;
  realWorldScenario: string;
  defensiveAction: string;
}

export interface EmergencyStepItem {
  stepNumber: number;
  title: string;
  action: string;
  details: string[];
  criticalWarning?: string;
}

export interface ScorecardQuestion {
  id: string;
  question: string;
  category: string;
  whyItMatters: string;
  adviceIfNo: string;
}

export interface CyberMythItem {
  id: string;
  myth: string;
  reality: string;
  explanation: string;
  takeaway: string;
}

export interface RoadmapLevelItem {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  milestones: string[];
  status: 'Current Guide' | 'Available' | 'Scam Hub' | 'Phase 2 Preview' | 'Coming Soon';
  href: string;
  iconName: string;
}

export interface ScamAwarenessCategory {
  id: string;
  name: string;
  iconName: string;
  oneLiner: string;
  commonTarget: string;
  mainWarning: string;
  categoryGroup: 'Impersonation' | 'Financial & Crypto' | 'Communication & Social' | 'Shopping & Delivery' | 'Work & Services';
  riskLevel: 'Critical' | 'High' | 'Moderate';
  attackerTactics: string[];
  redFlags: string[];
  verificationSteps: string[];
  whatToDo: string[];
}

export interface ScamFlowStage {
  step: number;
  name: string;
  tagline: string;
  attackerTactic: string;
  psychologicalHook: string;
  defenderCountermeasure: string;
  iconName: string;
}

export interface RedFlagScenarioItem {
  id: string;
  title: string;
  highlightText: string;
  whyItMatters: string;
  attackerObjective: string;
  defensiveAction: string;
}

export interface ScamQuizQuestion {
  id: string;
  scenarioTitle: string;
  channel: 'SMS Text' | 'Email' | 'Voice Call' | 'Professional Network' | 'Bank App' | 'Chat Message';
  senderDisplay: string;
  messageContent: string;
  contextNote?: string;
  correctAnswer: 'A' | 'B' | 'C';
  options: {
    key: 'A' | 'B' | 'C';
    label: string;
    verdict: 'Likely Legitimate' | 'Suspicious' | 'Definitely a Scam';
  }[];
  explanation: string;
  redFlagsIdentified: string[];
  takeaway: string;
}

export interface ScamCaseStudy {
  id: string;
  title: string;
  category: string;
  iconName: string;
  summary: string;
  hook: string;
  tactic: string;
  turningPoint: string;
  lessonLearned: string;
}

export interface ReportingAuthority {
  country: string;
  code: string;
  agencyName: string;
  website: string;
  phone?: string;
  notes: string;
}

export interface LearningLevelItem {
  level: number;
  title: string;
  slug: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  shortDescription: string;
  topicsCount: number;
  topics: string[];
  estimatedHours: string;
  iconName: string;
  accentColor: 'cyan' | 'purple' | 'emerald' | 'blue' | 'amber';
  status: 'Available' | 'Planned' | 'In Development';
  access: 'free' | 'premium';
}

export interface LearningQuizQuestion {
  id: string;
  question: string;
  topic: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  whyItMatters: string;
}

export interface LearningTopicItem {
  slug: string;
  title: string;
  levelNumber: number;
  levelTitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: string;
  overview: string;
  learningObjectives: string[];
  keyConcepts: {
    title: string;
    description: string;
    tag?: string;
  }[];
  lessons: {
    id: string;
    title: string;
    duration: string;
    summary: string;
    slug?: string;
  }[];
  practicalExamples: {
    title: string;
    scenario: string;
    defensiveStrategy: string;
    keyTakeaway: string;
  }[];
  knowledgeCheck: LearningQuizQuestion[];
  nextTopic?: {
    title: string;
    slug: string;
    levelNumber: number;
  };
  access: 'free' | 'premium';
}

export interface FutureLabItem {
  id: string;
  title: string;
  category: string;
  description: string;
  coreFocus: string[];
  status: 'Coming Soon';
  iconName: string;
}

