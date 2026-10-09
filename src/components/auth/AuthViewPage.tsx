'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

interface AuthViewPageProps {
  initialMode: 'login' | 'register' | 'forgot';
}

export const AuthViewPage: React.FC<AuthViewPageProps> = ({ initialMode }) => {
  const router = useRouter();
  const { login, register, requestPasswordReset, resetPassword, user } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [devTokenMsg, setDevTokenMsg] = useState<string | null>(null);

  // If already logged in, redirect to progress dashboard
  React.useEffect(() => {
    if (user) {
      router.push('/learn/progress');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Failed to sign in.');
        } else {
          router.push('/learn/progress');
        }
      } else if (mode === 'register') {
        const res = await register(email, password, displayName);
        if (!res.success) {
          setErrorMsg(res.error || 'Registration failed.');
        } else {
          router.push('/learn/progress');
        }
      } else if (mode === 'forgot') {
        const res = await requestPasswordReset(email);
        if (!res.success) {
          setErrorMsg(res.error || 'Request failed.');
        } else {
          setSuccessMsg(res.message || 'Password reset instructions sent.');
          if (res.devToken) {
            setDevTokenMsg(res.devToken);
            setResetToken(res.devToken);
          }
        }
      } else if (mode === 'reset') {
        const res = await resetPassword(resetToken, newPassword);
        if (!res.success) {
          setErrorMsg(res.error || 'Reset failed.');
        } else {
          setSuccessMsg('Password has been reset! Please sign in with your new password.');
          setMode('login');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-slate-900/90 border border-cyan-900/60 shadow-2xl shadow-cyan-950/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
          {/* Top Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-600" />

          {/* Header Branding */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {mode === 'login' && 'Student Login'}
                {mode === 'register' && 'Create Free Account'}
                {mode === 'forgot' && 'Password Recovery'}
                {mode === 'reset' && 'Reset Password'}
              </h1>
              <p className="text-xs text-slate-400">
                {mode === 'login' && 'Sign in to access your verified XP and badges'}
                {mode === 'register' && 'Earn persistent rank and sync progress across devices'}
                {mode === 'forgot' && 'Enter your email to receive recovery instructions'}
                {mode === 'reset' && 'Enter your reset token and new password'}
              </p>
            </div>
          </div>

          {/* Tabs */}
          {(mode === 'login' || mode === 'register') && (
            <div className="flex rounded-lg bg-slate-950/80 p-1 border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
                  mode === 'login'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
                  mode === 'register'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Alerts */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <div className="space-y-1">
                <span>{successMsg}</span>
                {devTokenMsg && (
                  <div className="mt-2 p-2 bg-slate-950 rounded border border-cyan-800/60 font-mono text-[11px] text-cyan-300 break-all">
                    <span className="text-slate-400 block text-[10px]">Development Token:</span>
                    {devTokenMsg}
                    <button
                      type="button"
                      onClick={() => setMode('reset')}
                      className="block mt-1 text-cyan-400 hover:underline font-sans text-xs"
                    >
                      Click here to enter token & reset password →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Display Name or Handle
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Alex Defender"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg text-sm text-white placeholder-slate-500 cyber-focus-ring"
                  />
                </div>
              </div>
            )}

            {(mode === 'login' || mode === 'register' || mode === 'forgot') && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg text-sm text-white placeholder-slate-500 cyber-focus-ring"
                  />
                </div>
              </div>
            )}

            {(mode === 'login' || mode === 'register') && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setErrorMsg(null);
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg text-sm text-white placeholder-slate-500 cyber-focus-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'reset' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Reset Token
                  </label>
                  <input
                    type="text"
                    required
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Paste token received"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg text-sm text-white font-mono placeholder-slate-500 cyber-focus-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg text-sm text-white placeholder-slate-500 cyber-focus-ring"
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              disabled={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {isLoading
                ? 'Securing Session...'
                : mode === 'login'
                ? 'Sign In to Account'
                : mode === 'register'
                ? 'Create Free Account'
                : mode === 'forgot'
                ? 'Send Reset Token'
                : 'Save New Password'}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            {mode === 'forgot' || mode === 'reset' ? (
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className="text-cyan-400 hover:underline"
              >
                ← Back to Sign In
              </button>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Verified progress across all devices
              </span>
            )}
            <Link href="/learn" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Browse Learn Hub →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
