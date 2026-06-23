"use client";

import Cookies from "js-cookie";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useIsMounted } from "@/shared/hooks/useIsMounted";

interface CookieConsentContextType {
    consent: boolean | null;
    acceptCookies: () => void;
    rejectCookies: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
    undefined
);

export const COOKIE_CONSENT_KEY = "cookie_consent";

export function CookieConsentProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMounted = useIsMounted();
    const [sessionConsent, setSessionConsent] = useState<boolean | null>(null);

    const consent = useMemo(() => {
        if (!isMounted) return null;
        if (sessionConsent !== null) return sessionConsent;

        const savedConsent = Cookies.get(COOKIE_CONSENT_KEY);
        if (savedConsent === "true") return true;
        if (savedConsent === "false") return false;
        return null;
    }, [isMounted, sessionConsent]);

    const acceptCookies = () => {
        setSessionConsent(true);
        Cookies.set(COOKIE_CONSENT_KEY, "true", { expires: 365, sameSite: "Lax" });
    };

    const rejectCookies = () => {
        setSessionConsent(false);
        Cookies.set(COOKIE_CONSENT_KEY, "false", { expires: 365, sameSite: "Lax" });
    };

    return (
        <CookieConsentContext.Provider
            value={{ consent, acceptCookies, rejectCookies }}
        >
            {children}
        </CookieConsentContext.Provider>
    );
}

export function useCookieConsent() {
    const context = useContext(CookieConsentContext);
    if (context === undefined) {
        throw new Error(
            "useCookieConsent must be used within a CookieConsentProvider"
        );
    }
    return context;
}
