"use client";

import Logo from "@/shared/ui/Logo";
import api from "@/shared/api/api";
import { useAuthStore } from "@/entities/auth/model/store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { t } = useTranslation();
    const setToken = useAuthStore((s) => s.setToken);

    // obtaining token from URL
    const token = searchParams.get("token");

    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const verifyCalled = useRef(false);

    useEffect(() => {
        if (!token) {
            setStatus('error');
            return;
        }

        if (verifyCalled.current) return;
        verifyCalled.current = true;

        const verifyEmail = async () => {
            try {
                const res = await api.post("/auth/verify", null, {
                    params: { token } // Sending token as query param per requirements logic "Extract token from URL query params" -> usually backend expects it in query or body.
                    // Wait, user requirement says: "Call backend POST /auth/verify." and "Extract token from URL query params".
                    // Usually verification tokens are sent to backend.
                    // The standard way is usually POST /auth/verify?token=... or POST body { token: ... }
                    // I will assume query param for now as it's common for GET, but for POST it might be body.
                    // Let's try passing it as query param first as it matches "Extract token from URL query params" implicitly.
                    // Actually, let's pass it in query params to receive it in backend.
                });

                if (res.data.access_token) {
                    setToken(res.data.access_token);
                    setStatus('success');
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 3000);
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error("Verification error:", error);
                setStatus('error');
            }
        };

        verifyEmail();
    }, [token, setToken, router]);

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-brand-orange text-center">

            {status === 'verifying' && (
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mb-6"></div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('auth.verify.title')}</h2>
                    <p className="text-gray-600">{t('auth.verify.verifying')}</p>
                </div>
            )}

            {status === 'success' && (
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('auth.verify.title')}</h2>
                    <p className="text-green-600 font-medium mb-4">{t('auth.verify.success')}</p>
                </div>
            )}

            {status === 'error' && (
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('auth.verify.title')}</h2>
                    <p className="text-red-600 mb-6">{t('auth.verify.error')}</p>
                    <Link
                        href="/login"
                        className="bg-brand-orange text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
                    >
                        {t('auth.verify.login_button')}
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function VerifyPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light p-4">
            <div className="mb-8 flex items-center justify-center">
                <Logo scale="lg" linkToHome={false} />
            </div>
            <Suspense fallback={<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>}>
                <VerifyContent />
            </Suspense>
        </div>
    );
}
