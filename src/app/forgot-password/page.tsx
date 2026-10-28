import { Metadata } from 'next';
import { AuthViewPage } from '@/components/auth/AuthViewPage';

export const metadata: Metadata = {
  title: 'Password Recovery',
  description: 'Recover access to your CyberAntigravity student learning account, XP progress, and defensive security achievements.',
  alternates: {
    canonical: '/forgot-password',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ForgotPasswordPage() {
  return <AuthViewPage initialMode="forgot" />;
}
