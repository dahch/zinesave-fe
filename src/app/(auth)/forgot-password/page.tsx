"use client";

import Logo from "@/shared/ui/Logo";
import api from "@/shared/api/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordPage() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage("");

        try {
            await api.post("/auth/forgot-password", { email });
            setStatus('success');
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setErrorMessage(t('auth.forgot_password.error_message') || "Error sending request");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light p-4">
            <div className="mb-8 flex items-center justify-center">
                <Logo scale="lg" linkToHome={false} />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-brand-orange">
                <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-orange mb-4 transition-colors w-fit"
                >
                    <ArrowLeft size={16} />
                    <span>{t('auth.forgot_password.back_to_login')}</span>
                </Link>

                {status === 'success' ? (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            {t('auth.forgot_password.title')}
                        </h2>
                        <p className="text-green-600 mb-6">
                            {t('auth.forgot_password.success_message')}
                        </p>
                        <Link
                            href="/login"
                            className="block w-full bg-brand-orange text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition text-center"
                        >
                            {t('auth.forgot_password.back_to_login')}
                        </Link>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            {t('auth.forgot_password.title')}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {t('auth.forgot_password.description')}
                        </p>

                        {status === 'error' && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('auth.forgot_password.email_label')}
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-brand-orange text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50"
                            >
                                {status === 'sending' ? t('auth.forgot_password.sending') : t('auth.forgot_password.submit')}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
