/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { DemoSession } from '../types/auth';

/**
 * PROTOTYPE DEMO AUTHENTICATION CONTEXT
 * 
 * SECURITY NOTICE:
 * Vite environment variables (prefixed with VITE_) are embedded directly into the
 * client-side bundle and are visible to anyone inspecting the network/source code.
 * This client-side credential verification is implemented solely for prototype demonstration
 * and UI evaluation of the ESG Admin Portal.
 * 
 * NEVER use client-side authentication or embed real credentials in production.
 * In production, authentication must be verified by a secure backend service using
 * encrypted tokens (e.g. OAuth 2.0 / OIDC / JWT with HttpOnly cookies).
 */

const SESSION_STORAGE_KEY = 'meil_demo_admin_session';

interface DemoAuthContextType {
  session: DemoSession | null;
  isAuthenticated: boolean;
  isDemoAuthEnabled: boolean;
  demoCredentials: {
    email: string;
    hasPasswordConfigured: boolean;
  } | null;
  loginDemoAdmin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  fillDemoCredentials: () => { email: string; password: string } | null;
  logout: () => void;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export const DemoAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<DemoSession | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.authenticated === true && parsed?.role === 'esg_admin') {
          return parsed as DemoSession;
        }
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }
    return null;
  });

  // Read environment variables
  const isDemoAuthEnabled = import.meta.env.VITE_ENABLE_DEMO_AUTH === 'true';
  const configuredEmail = (import.meta.env.VITE_DEMO_ADMIN_EMAIL as string) || '';
  const configuredPassword = (import.meta.env.VITE_DEMO_ADMIN_PASSWORD as string) || '';

  const demoCredentials = isDemoAuthEnabled && configuredEmail
    ? {
        email: configuredEmail,
        hasPasswordConfigured: Boolean(configuredPassword),
      }
    : null;

  const fillDemoCredentials = () => {
    if (!isDemoAuthEnabled || !configuredEmail || !configuredPassword) {
      return null;
    }
    return {
      email: configuredEmail,
      password: configuredPassword,
    };
  };

  const loginDemoAdmin = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isDemoAuthEnabled) {
      return {
        success: false,
        error: 'Demo authentication is disabled. Backend integration will be connected in future phases.',
      };
    }

    // Verify against configured demo credentials
    const trimmedInputEmail = email.trim().toLowerCase();
    const targetEmail = configuredEmail.trim().toLowerCase();

    if (trimmedInputEmail === targetEmail && password === configuredPassword) {
      const demoSessionData: DemoSession = {
        authenticated: true,
        role: 'esg_admin',
        mode: 'demo',
        loginTime: new Date().toISOString(),
        user: {
          name: 'Demo ESG Administrator',
          email: configuredEmail,
        },
      };

      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(demoSessionData));
      } catch (e) {
        console.error('Failed to write demo session to sessionStorage:', e);
      }

      setSession(demoSessionData);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid ESG Admin credentials. Please check the email and password.',
    };
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setSession(null);
  };

  return (
    <DemoAuthContext.Provider
      value={{
        session,
        isAuthenticated: Boolean(session?.authenticated && session?.role === 'esg_admin'),
        isDemoAuthEnabled,
        demoCredentials,
        loginDemoAdmin,
        fillDemoCredentials,
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
