"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by waiting for mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center space-x-2 text-sm">
            <button
                onClick={() => changeLanguage("es")}
                className={`px-2 py-1 rounded transition hover:bg-gray-100 ${i18n.resolvedLanguage === "es" ? "font-bold text-brand-navy" : "text-gray-500"
                    }`}
            >
                ES
            </button>
            <span className="text-gray-300">|</span>
            <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1 rounded transition hover:bg-gray-100 ${i18n.resolvedLanguage === "en" ? "font-bold text-brand-navy" : "text-gray-500"
                    }`}
            >
                EN
            </button>
        </div>
    );
}
