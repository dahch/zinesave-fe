"use client";
import DashboardHeader from "@/components/DashboardHeader";
import JobActions from "@/components/JobActions";
import api from "@/lib/api";
import { Job, User } from "@/types/dashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  FileText,
  Loader2
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
      const res = await api.get("/jobs");
      return res.data;
    },
  });

  const { data: user } = useQuery<User>({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });

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
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="w-full text-left border-collapse">
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
                        <span className="font-medium text-brand-navy truncate max-w-[140px] sm:max-w-xs md:max-w-md block">
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
                        new Date(job.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
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
