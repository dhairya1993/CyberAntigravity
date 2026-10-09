import { Metadata } from 'next';
import { CyberIqArenaView } from '@/components/cyber-iq/CyberIqArenaView';

export const metadata: Metadata = {
  title: 'Cyber IQ Quiz Arena — Interactive Defensive Security Challenges | CyberAntigravity',
  description:
    'Test and strengthen your defensive cybersecurity judgment with interactive scenarios across 7 core arenas: Fundamentals, Phishing Detection, Password Security, Online Scams, Privacy, Networking, and Ethical Hacking. Earn XP and unlock badges anonymously.',
  keywords: [
    'cybersecurity quiz',
    'cyber iq arena',
    'phishing test',
    'password security quiz',
    'online scam awareness',
    'ethical hacking basics',
    'cyber defense simulator',
    'student cybersecurity learning',
  ],
  alternates: {
    canonical: 'https://cyberantigravity.com/cyber-iq',
  },
  openGraph: {
    title: 'Cyber IQ Quiz Arena — CyberAntigravity',
    description:
      'Practice defensive instincts with 70+ interactive scenarios. 100% private, client-side execution with local progression and zero cloud telemetry.',
    url: 'https://cyberantigravity.com/cyber-iq',
    siteName: 'CyberAntigravity',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber IQ Quiz Arena — CyberAntigravity',
    description:
      'Interactive cybersecurity challenges and defensive scenarios. Test your judgment and unlock defensive badges.',
  },
};

export default function CyberIqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Cyber IQ Quiz Arena',
    description:
      'Interactive cybersecurity learning challenge testing defensive judgment across phishing, password security, privacy, and online scam recognition.',
    educationalLevel: 'Beginner to Advanced',
    about: {
      '@type': 'Thing',
      name: 'Cybersecurity Education and Defense',
    },
    provider: {
      '@type': 'Organization',
      name: 'CyberAntigravity',
      url: 'https://cyberantigravity.com',
    },
  };

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-cyan-950/20 via-teal-950/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="cyber-container py-10 md:py-16">
        <CyberIqArenaView />
      </div>
    </div>
  );
}
