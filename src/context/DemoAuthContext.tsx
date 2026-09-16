/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { DemoSession } from '../types/auth';

/**
 * PROTOTYPE DEMO AUTHENTICATION CONTEXT (ESG Admin & Reviewer / Approver)
 * 
 * SECURITY NOTICE:
 * Vite environment variables (prefixed with VITE_) are embedded directly into the
 * client-side bundle and are visible to anyone inspecting the network/source code.
 * This client-side credential verification is implemented solely for prototype demonstration
 * and UI evaluation of the ESG Admin and Reviewer / Approver portals.
 * 
 * NEVER use client-side authentication or embed real credentials in production.
 * In production, authentication must be verified by a secure backend service using
 * encrypted tokens (e.g. OAuth 2.0 / OIDC / JWT with HttpOnly cookies).
 */

const SESSION_STORAGE_KEY = 'meil_demo_auth_session';
// For backward compatibility with existing session key
const LEGACY_ADMIN_KEY = 'meil_demo_admin_session';

interface DemoAuthContextType {
  session: DemoSession | null;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  isReviewerAuthenticated: boolean;
  userRole: 'esg_admin' | 'reviewer' | null;
  isDemoAdminEnabled: boolean;
  isDemoReviewerEnabled: boolean;
  loginDemoAdmin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginDemoReviewer: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  fillDemoAdminCredentials: () => { email: string; password: string } | null;
  fillDemoReviewerCredentials: () => { email: string; password: string } | null;
  logout: () => void;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export const DemoAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<DemoSession | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY) || sessionStorage.getItem(LEGACY_ADMIN_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.authenticated === true && (parsed?.role === 'esg_admin' || parsed?.role === 'reviewer')) {
          return parsed as DemoSession;
        }
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }
    return null;
  });

  // Read environment variables for ESG Admin
  const isDemoAdminEnabled = import.meta.env.VITE_ENABLE_DEMO_AUTH === 'true';
  const configuredAdminEmail = (import.meta.env.VITE_DEMO_ADMIN_EMAIL as string) || '';
  const configuredAdminPassword = (import.meta.env.VITE_DEMO_ADMIN_PASSWORD as string) || '';

  // Read environment variables for Reviewer
  const isDemoReviewerEnabled = import.meta.env.VITE_ENABLE_DEMO_REVIEWER_AUTH === 'true';
  const configuredReviewerEmail = (import.meta.env.VITE_DEMO_REVIEWER_EMAIL as string) || '';
  const configuredReviewerPassword = (import.meta.env.VITE_DEMO_REVIEWER_PASSWORD as string) || '';

  const fillDemoAdminCredentials = () => {
    if (!isDemoAdminEnabled || !configuredAdminEmail || !configuredAdminPassword) {
      return null;
    }
    return {
      email: configuredAdminEmail,
      password: configuredAdminPassword,
    };
  };

  const fillDemoReviewerCredentials = () => {
    if (!isDemoReviewerEnabled || !configuredReviewerEmail || !configuredReviewerPassword) {
      return null;
    }
    return {
      email: configuredReviewerEmail,
      password: configuredReviewerPassword,
    };
  };

  const loginDemoAdmin = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isDemoAdminEnabled) {
      return {
        success: false,
        error: 'ESG Admin demo authentication is disabled. Backend integration will be connected in future phases.',
      };
    }

    const trimmedInputEmail = email.trim().toLowerCase();
    const targetEmail = configuredAdminEmail.trim().toLowerCase();

    if (trimmedInputEmail === targetEmail && password === configuredAdminPassword) {
      const demoSessionData: DemoSession = {
        authenticated: true,
        role: 'esg_admin',
        mode: 'demo',
        loginTime: new Date().toISOString(),
        user: {
          name: 'Demo ESG Administrator',
          email: configuredAdminEmail,
        },
      };

      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(demoSessionData));
        sessionStorage.setItem(LEGACY_ADMIN_KEY, JSON.stringify(demoSessionData));
      } catch (e) {
        console.error('Failed to write session to sessionStorage:', e);
      }

      setSession(demoSessionData);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid ESG Admin credentials. Please check the email and password.',
    };
  };

  const loginDemoReviewer = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isDemoReviewerEnabled) {
      return {
        success: false,
        error: 'Reviewer demo authentication is disabled. Backend integration will be connected in future phases.',
      };
    }

    const trimmedInputEmail = email.trim().toLowerCase();
    const targetEmail = configuredReviewerEmail.trim().toLowerCase();

    if (trimmedInputEmail === targetEmail && password === configuredReviewerPassword) {
      const demoSessionData: DemoSession = {
        authenticated: true,
        role: 'reviewer',
        mode: 'demo',
        loginTime: new Date().toISOString(),
        user: {
          name: 'Demo Reviewer',
          email: configuredReviewerEmail,
        },
      };

      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(demoSessionData));
        sessionStorage.removeItem(LEGACY_ADMIN_KEY);
      } catch (e) {
        console.error('Failed to write session to sessionStorage:', e);
      }

      setSession(demoSessionData);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid Reviewer / Approver credentials. Please check the email and password.',
    };
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      sessionStorage.removeItem(LEGACY_ADMIN_KEY);
    } catch {
      // Ignore
    }
    setSession(null);
  };

  return (
    <DemoAuthContext.Provider
      value={{
        session,
        isAuthenticated: Boolean(session?.authenticated),
        isAdminAuthenticated: Boolean(session?.authenticated && session?.role === 'esg_admin'),
        isReviewerAuthenticated: Boolean(session?.authenticated && session?.role === 'reviewer'),
        userRole: session?.role || null,
        isDemoAdminEnabled,
        isDemoReviewerEnabled,
        loginDemoAdmin,
        loginDemoReviewer,
        fillDemoAdminCredentials,
        fillDemoReviewerCredentials,
        logout,
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  );
};

export const useDemoAuth = (): DemoAuthContextType => {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
};
