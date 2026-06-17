"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import CookieBanner from "@/shared/analytics/CookieBanner";
import { CookieConsentProvider } from "@/shared/analytics/CookieConsentContext";
import GoogleAnalyticsWrapper from "@/shared/analytics/GoogleAnalyticsWrapper";
import I18nProvider from "./I18nProvider";
import EpubReaderModal from "@/features/epub-reader/ui/EpubReaderModal";

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
          <EpubReaderModal />
        </CookieConsentProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}
