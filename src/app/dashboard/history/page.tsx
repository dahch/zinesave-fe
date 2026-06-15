"use client";
import DashboardHeader from "@/widgets/dashboard/ui/DashboardHeader";
import JobActions from "@/widgets/job-processor/ui/JobActions";
import { useMe } from "@/shared/hooks/useMe";
import api from "@/shared/api/api";
import { Job } from "@/shared/types/dashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  FileText
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";


export default function HistoryPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery<Job[]>({
    queryKey: ["jobs-history"],
    queryFn: async () => {
      const res = await api.get("/jobs?per_page=100");
      return res.data.jobs;
    },
  });

  const { data: user } = useMe();

  return (
    <div className="min-h-screen bg-brand-light">
      <DashboardHeader activeTab="history" />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 bg-white rounded-full hover:bg-gray-100 text-gray-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">
              {t('dashboard.history.title')}
            </h1>
            <p className="text-gray-500 text-sm">
              {t('dashboard.history.subtitle')}
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-full"></div>
              <div className="h-16 bg-gray-100 rounded w-full"></div>
              <div className="h-16 bg-gray-100 rounded w-full"></div>
              <div className="h-16 bg-gray-100 rounded w-full"></div>
            </div>
          </div>
        )}

        {isError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {t('dashboard.history.error_loading')}
          </div>
        )}

        {jobs && jobs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              {t('dashboard.history.empty.title')}
            </h3>
            <p className="text-gray-500 mb-6">
              {t('dashboard.history.empty.message')}
            </p>
            <Link
              href="/dashboard"
              className="text-brand-orange font-medium hover:underline"
            >
              {t('dashboard.history.empty.action')}
            </Link>
          </div>
        )}

        {jobs && jobs.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse whitespace-nowrap md:whitespace-normal">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 md:px-6 py-4">{t('dashboard.history.table.article_url')}</th>
                    <th className="px-4 md:px-6 py-4">{t('dashboard.history.table.status')}</th>
                    <th className="hidden md:table-cell px-6 py-4 text-right">{t('dashboard.history.table.created_at')}</th>
                    <th className="px-4 md:px-6 py-4 text-right">{t('dashboard.history.table.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-brand-navy truncate max-w-[180px] sm:max-w-xs md:max-w-md block">
                            {job.source_url}
                          </span>
                          <span className="text-xs text-gray-400 font-mono mt-1 hidden sm:block">
                            ID: {job.id.substring(0, 8)}...
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
                          <span className="flex items-center gap-2 justify-end">
                            <Clock className="w-4 h-4 text-gray-300 animate-pulse" />
                            {t('dashboard.history.table.unknown_date')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-right">
                        <JobActions
                          job={job}
                          connectedProviders={user?.connected_providers || []}
                          onJobUpdate={() => {
                            queryClient.invalidateQueries({ queryKey: ["jobs-history"] });
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
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
