import { Metadata } from 'next';
import { AuthViewPage } from '@/components/auth/AuthViewPage';

export const metadata: Metadata = {
  title: 'Student Login | CyberAntigravity',
  description: 'Sign in to CyberAntigravity to access verified XP, rank progression, and learning streaks.',
};

export default function LoginPage() {
  return <AuthViewPage initialMode="login" />;
}
