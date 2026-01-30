"use client";
import DashboardHeader from "@/components/DashboardHeader";
import JobActions from "@/components/JobActions";
import api from "@/lib/api";
import { DashboardData } from "@/types/dashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  FileText,
  Loader2,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    data: dashboard,
    isLoading,
    isError,
  } = useQuery<DashboardData>({
    queryKey: ["dashboard-home"],
    queryFn: async () => {
      const res = await api.get("/me/dashboard");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light">
        <DashboardHeader activeTab="home" />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
        </div>
      </div>
    );
  }

  if (isError || !dashboard) {
    return (
      <div className="min-h-screen bg-brand-light">
        <DashboardHeader activeTab="home" />
        <div className="max-w-4xl mx-auto p-6 mt-8">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {t('dashboard.home.error_loading')}
          </div>
        </div>
      </div>
    );
  }

  const { usage, recent_jobs } = dashboard;

  return (
    <div className="min-h-screen bg-brand-light">
      <DashboardHeader activeTab="home" />
      <main className="max-w-6xl mx-auto p-6 mt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">{t('dashboard.home.title')}</h1>
            <p className="text-gray-500">
              {t('dashboard.home.subtitle')}
            </p>
          </div>
          <Link
            href="/dashboard/new"
            className="bg-brand-orange text-white px-6 py-2.5 rounded-lg font-bold hover:bg-opacity-90 transition flex items-center gap-2 shadow-sm"
          >
            <Zap className="w-4 h-4" />
            {t('dashboard.home.new_job_button')}
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            label={t('dashboard.home.plan_card.title')}
            value={usage.plan.toUpperCase()}
            icon={<FileText className="w-5 h-5 text-blue-500" />}
            subtitle={t('dashboard.home.plan_card.renewal')}
          />
          <StatCard
            label={t('dashboard.home.usage_card.title')}
            value={usage.jobs_limit ? `${usage.jobs_created} / ${usage.jobs_limit}` : usage.jobs_created}
            icon={<BarChart3 className="w-5 h-5 text-purple-500" />}
            subtitle={t('dashboard.home.usage_card.subtitle')}
          />
          <StatCard
            label={t('dashboard.home.remaining_card.title')}
            value={usage.jobs_limit ? `${usage.jobs_remaining} / ${usage.jobs_limit}` : t('dashboard.home.remaining_card.unlimited')}
            icon={<CheckCircle className="w-5 h-5 text-green-500" />}
            subtitle={t('dashboard.home.remaining_card.subtitle')}
            highlight={usage.jobs_remaining === 0}
          />
        </div>

        {/* Recent Jobs Section */}
        <div>
          <h2 className="text-xl font-bold text-brand-navy mb-4">
            {t('dashboard.home.recent_jobs.title')}
          </h2>
          {recent_jobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100">
              <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">{t('dashboard.home.recent_jobs.no_jobs')}</p>
              <Link
                href="/dashboard/new"
                className="text-brand-orange font-medium hover:underline"
              >
                {t('dashboard.home.recent_jobs.create_first')}
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 md:px-6 py-4">{t('dashboard.home.recent_jobs.table.article')}</th>
                    <th className="px-4 md:px-6 py-4">{t('dashboard.home.recent_jobs.table.status')}</th>
                    <th className="hidden md:table-cell px-6 py-4 text-right">{t('dashboard.home.recent_jobs.table.date')}</th>
                    <th className="px-4 md:px-6 py-4 text-right">{t('dashboard.home.recent_jobs.table.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recent_jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-brand-navy truncate max-w-[120px] sm:max-w-[200px] md:max-w-sm block">
                            {job.source_url}
                          </span>
                          <span className="text-xs text-gray-400 font-mono mt-1 truncate max-w-[120px] sm:max-w-[200px]">
                            {job.base_url}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <BadgeStatus status={job.status} />
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-right text-sm text-gray-500">
                        {job.created_at ? (
                          new Date(job.created_at).toLocaleDateString()
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-right">
                        <JobActions
                          job={job}
                          connectedProviders={dashboard.connected_providers || []}
                          onJobUpdate={() => {
                            queryClient.invalidateQueries({ queryKey: ["dashboard-home"] });
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
                <Link
                  href="/dashboard/history"
                  className="text-sm text-brand-navy font-medium hover:underline"
                >
                  {t('dashboard.home.recent_jobs.view_all')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  subtitle,
  highlight = false,
}: {
  label: string;
  value: string | number;
  icon: any;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        {highlight && (
          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
            !!
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{label}</h3>
      <div className="text-2xl font-bold text-brand-navy mb-1">{value}</div>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

function BadgeStatus({ status }: { status: string }) {
  const { t } = useTranslation();
  if (status === "done") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        {t('common.status.completed')}
      </span>
    );
  }
  if (status === "processing") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 animate-pulse">
        {t('common.status.processing')}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
      {status === "failed" ? t('common.status.failed') : t('common.status.error')}
    </span>
  );
}
