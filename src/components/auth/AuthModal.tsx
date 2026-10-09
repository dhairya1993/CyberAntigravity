'use client';

import React, { useState } from 'react';
import {
  Shield,
  X,
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
import { Button } from '@/components/ui/Button';

interface AuthModalContentProps {
  initialMode: 'login' | 'register' | 'forgot';
  onClose: () => void;
}

const AuthModalContent: React.FC<AuthModalContentProps> = ({ initialMode, onClose }) => {
  const { login, register, requestPasswordReset, resetPassword } = useAuth();

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
          onClose();
        }
      } else if (mode === 'register') {
        const res = await register(email, password, displayName);
        if (!res.success) {
          setErrorMsg(res.error || 'Registration failed.');
        } else {
          onClose();
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-slate-900 border border-cyan-900/60 shadow-2xl shadow-cyan-950/40 rounded-2xl p-6 sm:p-8 z-10 overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-600" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cyber-focus-ring"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 id="auth-modal-title" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              {mode === 'login' && 'Student Login'}
              {mode === 'register' && 'Create Student Account'}
              {mode === 'forgot' && 'Password Recovery'}
              {mode === 'reset' && 'Set New Password'}
            </h2>
            <p className="text-xs text-slate-400">
              {mode === 'login' && 'Sign in to sync your verified XP, badges & streak'}
              {mode === 'register' && 'Join CyberAntigravity to start earning permanent rank'}
              {mode === 'forgot' && 'Enter your email to receive recovery instructions'}
              {mode === 'reset' && 'Enter the reset token and your new password'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Login vs Register) */}
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

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
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

        {/* Form Body */}
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

          {/* Submit Action */}
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

        {/* Footer info note */}
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
          <span className="text-[11px] text-slate-500">Defense-in-depth</span>
        </div>
      </div>
    </div>
  );
};

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal } = useAuth();
  if (!isAuthModalOpen) return null;
  return <AuthModalContent key={authModalMode} initialMode={authModalMode} onClose={closeAuthModal} />;
};
