"use client";
import DashboardHeader from "@/components/DashboardHeader";
import JobProcessor from "@/components/JobProcessor";
import { useMe } from "@/hooks/useMe";
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

    const { data: user } = useMe();

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



                <JobProcessor
                    usage={usage}
                    isLoadingUsage={isLoading}
                    connectedProviders={user?.connected_providers || []}
                />
            </main>
        </div>
    );
}
