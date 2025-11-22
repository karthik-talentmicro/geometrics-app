"use client";

import { SessionProvider } from "next-auth/react";
import { LocaleOSProvider } from "./localeos-provider";

const LOCALEOS_APP_ID = "7a9f9a40e7f1c4fcd2b837ccde68dc765e1f5f5b791bc7da7d21ae5670b2ab90";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LocaleOSProvider appId={LOCALEOS_APP_ID} debug={true}>
        {children}
      </LocaleOSProvider>
    </SessionProvider>
  );
}
