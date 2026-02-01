"use client";

import Logo from "@/components/Logo";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";

function ResetPasswordContent() {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<'idle' | 'updating' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setStatus('error');
            setErrorMessage(t('auth.reset_password.error_token'));
            return;
        }

        setStatus('updating');
        setErrorMessage("");

        try {
            await api.post("/auth/reset-password", {
                token,
                new_password: password
            });
            setStatus('success');
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            // Try to get error message from backend
            const detail = error.response?.data?.detail;
            setErrorMessage(detail || t('auth.reset_password.error_token'));
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-brand-orange">

            {status === 'success' ? (
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        {t('auth.reset_password.title')}
                    </h2>
                    <p className="text-green-600 mb-6">
                        {t('auth.reset_password.success_message')}
                    </p>
                    <Link
                        href="/login"
                        className="block w-full bg-brand-orange text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition text-center"
                    >
                        {t('auth.reset_password.back_to_login')}
                    </Link>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                        {t('auth.reset_password.title')}
                    </h2>

                    {status === 'error' && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('auth.reset_password.new_password_label')}
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'updating' || !token}
                            className="w-full bg-brand-orange text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50"
                        >
                            {status === 'updating' ? t('auth.reset_password.updating') : t('auth.reset_password.submit')}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light p-4">
            <div className="mb-8 flex items-center justify-center">
                <Logo scale="lg" linkToHome={false} />
            </div>
            <Suspense fallback={<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}
