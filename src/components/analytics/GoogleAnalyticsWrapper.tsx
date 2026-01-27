"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "./CookieConsentContext";

export default function GoogleAnalyticsWrapper() {
    const { consent } = useCookieConsent();
    const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

    // Only render if user has explicitly consented AND we have an ID
    if (!consent || !gaId) {
        return null;
    }

    return <GoogleAnalytics gaId={gaId} />;
}
