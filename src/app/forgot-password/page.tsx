import { Metadata } from 'next';
import { AuthViewPage } from '@/components/auth/AuthViewPage';

export const metadata: Metadata = {
  title: 'Password Recovery | CyberAntigravity',
  description: 'Recover access to your CyberAntigravity student learning account.',
};

export default function ForgotPasswordPage() {
  return <AuthViewPage initialMode="forgot" />;
}
