import { Metadata } from 'next';
import { AuthViewPage } from '@/components/auth/AuthViewPage';

export const metadata: Metadata = {
  title: 'Student Login',
  description: 'Sign in to CyberAntigravity to access verified XP, rank progression, interactive cyber security challenges, and learning streaks.',
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return <AuthViewPage initialMode="login" />;
}
