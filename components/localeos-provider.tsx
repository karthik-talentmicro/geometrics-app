'use client';

import { useEffect } from 'react';
import LocaleOS from '@localeos/ip-info';

interface LocaleOSProviderProps {
  children: React.ReactNode;
  appId?: string;
  debug?: boolean;
}

export function LocaleOSProvider({
  children,
  appId,
  debug = process.env.NODE_ENV === 'development'
}: LocaleOSProviderProps) {
  useEffect(() => {
    if (!appId) {
      console.warn('LocaleOS: No App ID provided');
      return;
    }

    try {
      LocaleOS.init({
        appId,
        debug,
        apiUrl: typeof window !== 'undefined' ? window.location.origin : '',
      });

      if (debug) {
        console.log('LocaleOS initialized with App ID:', appId);
        console.log('System fingerprint:', LocaleOS.getFingerprint());
        console.log('Device info:', LocaleOS.getDeviceInfo());
      }
    } catch (error) {
      console.error('Failed to initialize LocaleOS:', error);
    }
  }, [appId, debug]);

  return <>{children}</>;
}

// Export the LocaleOS instance for manual tracking
export { default as LocaleOS } from '@localeos/ip-info';
