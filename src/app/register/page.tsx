import { Metadata } from 'next';
import { AuthViewPage } from '@/components/auth/AuthViewPage';

export const metadata: Metadata = {
  title: 'Create Student Account | CyberAntigravity',
  description: 'Join CyberAntigravity for free to earn persistent XP, rank badges, and track your cybersecurity mastery.',
};

export default function RegisterPage() {
  return <AuthViewPage initialMode="register" />;
}
