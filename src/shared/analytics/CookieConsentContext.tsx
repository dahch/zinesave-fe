"use client";

import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

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
    const [consent, setConsent] = useState<boolean | null>(null);

    useEffect(() => {
        // Check for existing consent cookie on mount
        const savedConsent = Cookies.get(COOKIE_CONSENT_KEY);
        if (savedConsent === "true") {
            setConsent(true);
        } else if (savedConsent === "false") {
            setConsent(false);
        } else {
            setConsent(null);
        }
    }, []);

    const acceptCookies = () => {
        setConsent(true);
        Cookies.set(COOKIE_CONSENT_KEY, "true", { expires: 365, sameSite: "Lax" });
    };

    const rejectCookies = () => {
        setConsent(false);
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
