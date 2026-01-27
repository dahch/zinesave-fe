"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import CookieBanner from "./analytics/CookieBanner";
import { CookieConsentProvider } from "./analytics/CookieConsentContext";
import GoogleAnalyticsWrapper from "./analytics/GoogleAnalyticsWrapper";
import I18nProvider from "./providers/I18nProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <CookieConsentProvider>
          {children}
          <CookieBanner />
          <GoogleAnalyticsWrapper />
          <Toaster richColors position="top-center" />
        </CookieConsentProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}
