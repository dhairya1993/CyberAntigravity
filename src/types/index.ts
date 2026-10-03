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

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'Safety Guide' | 'Threat Analysis' | 'Investigation' | 'Security Architecture';
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
}
