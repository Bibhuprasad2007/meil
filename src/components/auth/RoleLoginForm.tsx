import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail, AlertCircle, Info } from 'lucide-react';
import type { PortalRole } from '../../types/auth';

interface RoleLoginFormProps {
  roleId: PortalRole;
  roleTitle: string;
  onForgotPassword: () => void;
  onSubmitSuccess: (message: string) => void;
}

export const RoleLoginForm: React.FC<RoleLoginFormProps> = ({
  roleId,
  roleTitle,
  onForgotPassword,
  onSubmitSuccess,
}) => {
  // SECURITY NOTE:
  // Selecting a portal from the UI does not grant authorization.
  // The backend authentication service must independently verify the user's
  // cryptographically signed credentials, tenant membership, and assigned roles.
  
  const storageKey = `meil_saved_email_${roleId}`;
  
  const [email, setEmail] = useState(() => {
    return localStorage.getItem(storageKey) || '';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(() => {
    return Boolean(localStorage.getItem(storageKey));
  });
  
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);


  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid work email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Handle remember email safely (passwords are NEVER saved in localStorage)
    if (rememberEmail) {
      localStorage.setItem(storageKey, email.trim());
    } else {
      localStorage.removeItem(storageKey);
    }

    // Simulate authentication processing
    setTimeout(() => {
      setIsLoading(false);
      onSubmitSuccess('Authentication service will be connected in the next phase.');
    }, 1200);
  };

  const isEsgAdmin = roleId === 'esg-admin';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-slate-800" noValidate>
      {!isEsgAdmin && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-sky-50/80 border border-sky-200 text-sky-900 text-xs leading-relaxed">
          <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <span>
            Logging in to <strong className="font-semibold">{roleTitle}</strong>. Your account must be created and authorized by the Company Admin.
          </span>
        </div>
      )}

      {/* Work Email Field */}
      <div>
        <label htmlFor="work-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Work Email <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="work-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="name@company.com"
            className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-lg transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                : 'border-slate-300 focus:border-[#003B73] focus:ring-sky-100'
            }`}
          />
        </div>
        {errors.email && (
          <p className="flex items-center gap-1 text-xs text-rose-600 mt-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Password <span className="text-rose-500">*</span>
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs font-medium text-[#003B73] hover:text-[#00264D] hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-[#003B73] rounded"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="••••••••"
            className={`w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border rounded-lg transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
              errors.password
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                : 'border-slate-300 focus:border-[#003B73] focus:ring-sky-100'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="flex items-center gap-1 text-xs text-rose-600 mt-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember Email Checkbox */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberEmail}
            onChange={(e) => setRememberEmail(e.target.checked)}
            className="w-4 h-4 text-[#003B73] border-slate-300 rounded focus:ring-[#003B73]"
          />
          <span className="text-xs text-slate-600 font-medium">Remember email</span>
        </label>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 py-2.5 px-4 bg-[#003B73] hover:bg-[#002B54] active:bg-[#002244] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#003B73] focus:ring-offset-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </button>
    </form>
  );
};
