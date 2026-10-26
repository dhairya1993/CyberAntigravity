import { Metadata } from 'next';
import { AuthViewPage } from '@/components/auth/AuthViewPage';

export const metadata: Metadata = {
  title: 'Create Student Account',
  description: 'Join CyberAntigravity for free to earn persistent XP, unlock defensive security badges, and track your cybersecurity mastery.',
  alternates: {
    canonical: '/register',
  },
};

export default function RegisterPage() {
  return <AuthViewPage initialMode="register" />;
}
