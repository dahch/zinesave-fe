"use client";

import { clsx, type ClassValue } from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useCookieConsent } from "./CookieConsentContext";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function CookieBanner() {
    const { consent, acceptCookies, rejectCookies } = useCookieConsent();
    const [isVisible, setIsVisible] = useState(false);

    // Delay showing to avoid flash if consent is already determined (though Context handles init fast, a small delay is nice for hydration)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (consent === null) {
                setIsVisible(true);
            }
        }, 500); // 0.5s delay
        return () => clearTimeout(timer);
    }, [consent]);

    if (consent !== null) return null;
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
            <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-gray-900 p-6 shadow-xl ring-1 ring-gray-800 sm:p-5 lg:p-6">
                    {/* Content */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                            <h3 className="text-base font-semibold leading-6 text-white">
                                Respetamos tu privacidad
                            </h3>
                            <p className="mt-2 text-sm text-gray-300">
                                Usamos cookies para analizar el tráfico y mejorar tu experiencia.
                                Solo cargamos Google Analytics si nos das tu permiso.
                                Puedes leer más en nuestra{" "}
                                <Link
                                    href="/privacy"
                                    className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
                                >
                                    Política de Privacidad
                                </Link>
                                .
                            </p>
                        </div>
                        <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:flex-row sm:flex-shrink-0">
                            <button
                                type="button"
                                onClick={rejectCookies}
                                className="inline-flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                Rechazar
                            </button>
                            <button
                                type="button"
                                onClick={acceptCookies}
                                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
