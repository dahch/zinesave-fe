"use client";
import DashboardHeader from "@/components/DashboardHeader";
import { useMe } from "@/hooks/useMe";
import api from "@/lib/api";
import { UsageStats } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import {
    Building2,
    Calendar,
    CheckCircle2,
    Cloud,
    CreditCard,
    Link as LinkIcon,
    Loader2,
    Mail,
    MapPin,
    Shield,
    User as UserIcon,
} from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useState } from "react";
import PaywallModal from "@/components/PaywallModal";

export default function AccountPage() {
    console.log(process.env.NEXT_PUBLIC_ONEDRIVE_ENABLED);
    const { t } = useTranslation();
    const { data: user, isLoading: isLoadingUser } = useMe();
    const [isPaywallOpen, setIsPaywallOpen] = useState(false);

    const { data: usage, isLoading: isLoadingUsage } = useQuery<UsageStats>({
        queryKey: ["me-usage"],
        queryFn: async () => {
            const res = await api.get("/me/usage");
            return res.data;
        },
    });

    const isLoading = isLoadingUser || isLoadingUsage;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-light">
                <DashboardHeader activeTab="account" />
                <main className="max-w-4xl mx-auto p-6 mt-8 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
                    <div className="grid gap-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 h-64"></div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 h-48"></div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 h-48"></div>
                    </div>
                </main>
            </div>
        );
    }

    if (!user || !usage) return null;

    return (
        <div className="min-h-screen bg-brand-light">
            <DashboardHeader activeTab="account" />
            <main className="max-w-4xl mx-auto p-6 mt-8">
                <h1 className="text-2xl font-bold text-brand-navy mb-8">{t('dashboard.account.title')}</h1>

                <div className="grid gap-6">
                    {/* Perfil */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <UserIcon className="w-5 h-5 text-brand-orange" />
                            {t('dashboard.account.personal_info.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase mb-1">
                                    {t('dashboard.account.personal_info.name')}
                                </label>
                                <p className="text-gray-900 font-medium">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase mb-1 flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> {t('dashboard.account.personal_info.email')}
                                </label>
                                <p className="text-gray-900 font-medium">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase mb-1 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {t('dashboard.account.personal_info.registered')}
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {new Date(user.created_at).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase mb-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {t('dashboard.account.personal_info.country')}
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {user.country ? (
                                        <span className="flex items-center gap-2">
                                            <img
                                                src={`https://flagcdn.com/20x15/${user.country.toLowerCase()}.png`}
                                                alt={user.country}
                                                className="rounded-sm shadow-sm"
                                            />
                                            {user.country}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 italic">{t('dashboard.account.personal_info.not_specified')}</span>
                                    )}
                                </p>
                            </div>

                            {user.is_company && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 uppercase mb-1 flex items-center gap-1">
                                        <Building2 className="w-3 h-3" /> {t('dashboard.account.personal_info.vat_data')}
                                    </label>
                                    <p className="text-gray-900 font-medium">{user.vat_number}</p>
                                    <span className="inline-block mt-1 text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-semibold tracking-wide">
                                        {t('dashboard.account.personal_info.company_badge')}
                                    </span>
                                </div>
                            )}
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase mb-1">
                                    {t('dashboard.account.personal_info.user_id')}
                                </label>
                                <p className="text-gray-500 font-mono text-sm">{user.id}</p>
                            </div>
                        </div>
                    </section>

                    {/* Plan y Uso */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-brand-orange" />
                            {t('dashboard.account.plan.title')}
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Badge del Plan */}
                            <div className="flex flex-col items-center p-6 bg-brand-light/50 rounded-xl border border-blue-100 min-w-[200px]">
                                <Shield className="w-8 h-8 text-blue-500 mb-2" />
                                <span className="text-sm text-gray-500 font-medium">{t('dashboard.account.plan.current_plan')}</span>
                                <span className="text-xl font-bold text-brand-navy uppercase mt-1">
                                    {usage.plan}
                                </span>
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 border border-green-100">
                                    {t('dashboard.account.plan.status_active')}
                                </span>
                            </div>

                            {/* Credits Info */}
                            <div className="flex-1 w-full bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-gray-600">
                                        {t('dashboard.account.plan.credits_available')}
                                    </span>
                                    <span className={`text-2xl font-bold ${usage.credits === 0 ? "text-red-500" : "text-brand-navy"}`}>
                                        {usage.credits}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                                    <p className="text-sm text-gray-500">
                                        <Trans
                                            i18nKey="dashboard.account.plan.remaining_message"
                                            values={{ remaining: usage.credits }}
                                            components={{ 1: <strong className="text-brand-navy" /> }}
                                        />
                                    </p>
                                    {usage.credits === 0 && (
                                        <button
                                            onClick={() => setIsPaywallOpen(true)}
                                            className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold hover:bg-opacity-90 transition whitespace-nowrap shadow-sm"
                                        >
                                            {t('job_processor.paywall_button')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Integraciones */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-brand-orange" />
                            {t('dashboard.account.integrations.title')}
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <IntegrationCard
                                name="Google Drive"
                                providerKey="google_drive"
                                isConnected={user.connected_providers?.includes('google_drive')}
                                onConnect={async () => {
                                    try {
                                        const { data } = await api.get('/auth/google/authorize');
                                        if (data.auth_url) window.location.href = data.auth_url;
                                    } catch (e) {
                                        toast.error(t('dashboard.account.integrations.error_google'));
                                    }
                                }}
                            />
                            <IntegrationCard
                                name="Dropbox"
                                providerKey="dropbox"
                                isConnected={user.connected_providers?.includes('dropbox')}
                                onConnect={async () => {
                                    try {
                                        const { data } = await api.get('/auth/dropbox/authorize');
                                        if (data.auth_url) window.location.href = data.auth_url;
                                    } catch (e) {
                                        toast.error(t('dashboard.account.integrations.error_dropbox'));
                                    }
                                }}
                            />
                            {process.env.NEXT_PUBLIC_ONEDRIVE_ENABLED === 'true' && (
                                <IntegrationCard
                                    name="OneDrive"
                                    providerKey="onedrive"
                                    isConnected={user.connected_providers?.includes('onedrive')}
                                    onConnect={async () => {
                                        try {
                                            const { data } = await api.get('/auth/onedrive/authorize');
                                            if (data.auth_url) window.location.href = data.auth_url;
                                        } catch (e) {
                                            toast.error(t('dashboard.account.integrations.error_onedrive'));
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </section>
                </div>
            </main>
            <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} />
        </div>
    );
}

function IntegrationCard({ name, providerKey, isConnected, onConnect }: { name: string, providerKey: string, isConnected?: boolean, onConnect: () => void }) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50/50 hover:bg-gray-50 transition">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-brand-navy">
                <Cloud className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">{name}</h3>

            {isConnected ? (
                <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t('dashboard.account.integrations.connected')}
                </div>
            ) : (
                <button
                    onClick={onConnect}
                    className="mt-2 text-sm text-brand-orange font-medium hover:text-brand-navy hover:underline transition"
                >
                    {t('dashboard.account.integrations.connect')}
                </button>
            )}
        </div>
    )
}
