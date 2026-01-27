"use client";
import DashboardHeader from "@/components/DashboardHeader";
import JobProcessor from "@/components/JobProcessor";
import api from "@/lib/api";
import { UsageStats } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NewJobPage() {
    const { t } = useTranslation();
    const { data: usage, isLoading } = useQuery<UsageStats>({
        queryKey: ["me-usage"],
        queryFn: async () => {
            const res = await api.get("/me/usage");
            return res.data;
        },
    });

    const { data: user } = useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await api.get("/me");
            return res.data;
        }
    });

    return (
        <div className="min-h-screen bg-brand-light">
            <DashboardHeader activeTab="new" />
            <main className="max-w-4xl mx-auto p-6 mt-8">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-800">{t('dashboard.new.title')}</h2>
                    <p className="text-gray-500">
                        {t('dashboard.new.subtitle')}
                    </p>
                </div>

                {/* Notificación de Límite (Visual, aunque JobProcessor también lo maneja) */}
                {usage && usage.jobs_remaining === 0 && (
                    <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 text-red-700">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">{t('dashboard.new.limit_reached.title')}</p>
                            <p className="text-sm">
                                {t('dashboard.new.limit_reached.message', { created: usage.jobs_created, limit: usage.jobs_limit })}
                            </p>
                        </div>
                    </div>
                )}

                <JobProcessor
                    usage={usage}
                    isLoadingUsage={isLoading}
                    connectedProviders={user?.connected_providers || []}
                />
            </main>
        </div>
    );
}
