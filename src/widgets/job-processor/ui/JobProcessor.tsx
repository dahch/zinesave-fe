"use client";
import { UsageStats, Job } from "@/shared/types/dashboard";
import {
  AlertCircle,
  CheckCircle2,
  Cloud,
  Download,
  FileCheck,
  Link as LinkIcon,
  Loader2,
  Plus,
  RefreshCw,
  Trash2,
  ChevronDown,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PaywallModal from "@/features/job-processing/ui/PaywallModal";
import { useJobProcessor } from "@/features/job-processing/model/useJobProcessor";
import { useReaderStore } from "@/features/epub-reader/model/useReaderStore";

interface JobProcessorProps {
  usage?: UsageStats;
  isLoadingUsage?: boolean;
  connectedProviders?: string[];
}

export default function JobProcessor({ usage, connectedProviders = [] }: JobProcessorProps) {
  const { t } = useTranslation();
  
  const {
    jobType,
    setJobType,
    urlInput,
    setUrlInput,
    urlsInput,
    setUrlsInput,
    titleInput,
    setTitleInput,
    currentJobId,
    isPaywallOpen,
    setIsPaywallOpen,
    uploadingProvider,
    createJobMutation,
    createCompositeJobMutation,
    jobStatusQuery,
    status,
    progress,
    handleReset,
    handleUpload,
    handleDownload
  } = useJobProcessor();

  const { openReader } = useReaderStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabSwitch = (mode: 'simple' | 'composite') => {
    if (mode === 'simple' && jobType === 'composite') {
      if (urlsInput[0]) setUrlInput(urlsInput[0]);
    }
    setJobType(mode);
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urlsInput];
    newUrls[index] = value;
    setUrlsInput(newUrls);
  };

  const handleAddUrl = () => {
    setUrlsInput([...urlsInput, ""]);
  };

  const handleRemoveUrl = (index: number) => {
    setUrlsInput(urlsInput.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      {/* Input Area - Se oculta o deshabilita visualmente si hay un job activo para enfocar la atención */}
      <div
        className={`flex flex-col gap-4 mb-8 transition-opacity duration-300 ${currentJobId
          ? "opacity-50 pointer-events-none blur-[1px]"
          : "opacity-100"
          }`}
      >
        {/* Tab Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-2 w-fit">
          <button
            onClick={() => handleTabSwitch('simple')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${jobType === 'simple' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-500 hover:text-brand-navy'}`}
          >
            {t('job_processor.mode_simple')}
          </button>
          <button
            onClick={() => handleTabSwitch('composite')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${jobType === 'composite' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-500 hover:text-brand-navy'}`}
          >
            {t('job_processor.mode_composite')}
          </button>
        </div>

        {jobType === 'simple' ? (
          <>
            <label className="text-sm font-semibold text-brand-navy uppercase tracking-wider">
              {t('job_processor.url_label')}
            </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={t('job_processor.url_placeholder')}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition text-brand-navy"
            />
          </div>
          <button
            onClick={() => createJobMutation.mutate(urlInput)}
            disabled={!urlInput || createJobMutation.isPending}
            className="bg-brand-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-900/10 flex items-center gap-2"
          >
            {createJobMutation.isPending ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              t('job_processor.convert_button')
            )}
          </button>
        </div>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-brand-navy uppercase tracking-wider">
              {t('job_processor.title_label')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder={t('job_processor.title_placeholder')}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition text-brand-navy"
              />
            </div>
            
            <label className="text-sm font-semibold text-brand-navy uppercase tracking-wider mt-2">
              {t('job_processor.url_label')}s
            </label>
            {urlsInput.map((url, index) => (
              <div key={index} className="flex gap-3">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder={`${t('job_processor.url_label')} ${index + 1}`}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition text-brand-navy"
                  />
                </div>
                {urlsInput.length > 2 && (
                  <button
                    onClick={() => handleRemoveUrl(index)}
                    className="p-4 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition"
                    title={t('job_processor.remove_url')}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={handleAddUrl}
              disabled={urlsInput.length >= (usage?.plan === 'pro' ? 10 : 4)}
              className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl font-medium hover:border-brand-orange hover:text-brand-orange transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              {t('job_processor.add_url')}
            </button>
            {urlsInput.length >= (usage?.plan === 'pro' ? 10 : 4) && (
              <p className="text-xs text-brand-orange">
                {usage?.plan === 'pro' ? t('job_processor.max_urls_pro') : t('job_processor.max_urls_free')}
              </p>
            )}
            
            <button
              onClick={() => createCompositeJobMutation.mutate({ urls: urlsInput.filter(Boolean), title: titleInput })}
              disabled={!titleInput.trim() || urlsInput.every(u => !u.trim()) || createCompositeJobMutation.isPending}
              className="bg-brand-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 mt-2"
            >
              {createCompositeJobMutation.isPending ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                t('job_processor.convert_button')
              )}
            </button>
          </div>
        )}
        {usage && usage.credits === 0 && (
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-red-600 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-100 gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {t('job_processor.limit_reached')}
            </div>
            <button
              onClick={() => setIsPaywallOpen(true)}
              className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold hover:bg-opacity-90 transition whitespace-nowrap shadow-sm"
            >
              {t('job_processor.paywall_button')}
            </button>
          </div>
        )}
      </div>

      {/* Status Area */}
      {currentJobId && (
        <div className="bg-brand-light/50 p-6 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
          {/* Header del Card de Estado */}
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2">
              {status === "processing" && (
                <Loader2 className="w-5 h-5 text-brand-orange animate-spin" />
              )}
              {status === "done" && (
                <FileCheck className="w-5 h-5 text-green-600" />
              )}
              {status === "failed" && (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}

              <span className="font-medium text-brand-navy capitalize">
                {status === "processing"
                  ? t('job_processor.status.processing')
                  : status === "done"
                    ? t('job_processor.status.done')
                    : status === "failed"
                      ? t('job_processor.status.failed')
                      : t('job_processor.status.starting')}
              </span>
            </div>
            <span className="text-sm font-bold text-brand-navy">
              {progress}%
            </span>
          </div>

          {/* Barra de Progreso */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-6">
            <div
              className={`h-full transition-all duration-500 ease-out ${status === "failed"
                ? "bg-red-500"
                : status === "done"
                  ? "bg-green-500"
                  : "bg-brand-orange"
                }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Acciones Finales (Descargar y Resetear) */}
          {(status === "done" || status === "failed") && (
            <div className="flex flex-col gap-3 animate-in fade-in zoom-in duration-300">
              {status === "done" && (
                <>
                  {jobType === 'composite' && urlsInput.length > 0 ? (
                    <div className="relative w-full">
                      <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between px-4 w-full bg-brand-navy text-white py-4 rounded-xl font-bold hover:bg-opacity-90 hover:shadow-lg transition transform active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-5 h-5" />
                          {t('job_processor.select_article_open')}
                        </div>
                        <ChevronDown className="w-5 h-5" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-10 overflow-hidden">
                          {urlsInput.filter(Boolean).map((url, i) => (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-3 text-sm text-brand-navy hover:bg-gray-50 border-b border-gray-50 last:border-0 truncate"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {url}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={urlInput}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-brand-navy text-white py-4 rounded-xl font-bold hover:bg-opacity-90 hover:shadow-lg transition transform active:scale-[0.98]"
                    >
                      <LinkIcon className="w-5 h-5" />
                      {t('job_processor.open_article')}
                    </a>
                  )}
                  <button
                    onClick={() => currentJobId && openReader(currentJobId)}
                    className="flex items-center justify-center gap-2 w-full bg-blue-50 text-blue-700 py-4 rounded-xl font-bold hover:bg-blue-100 hover:shadow-lg transition transform active:scale-[0.98]"
                  >
                    <BookOpen className="w-5 h-5" />
                    {t('job_processor.read_epub')}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-opacity-90 hover:shadow-lg transition transform active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" />
                    {t('job_processor.download_article')}
                  </button>

                  {/* Cloud Upload Options - Custom UI for New Job Page */}
                  {connectedProviders.length > 0 && jobStatusQuery.data && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {connectedProviders.map((provider) => {
                        const job = jobStatusQuery.data as Job;
                        const isUploaded = job.external_uploads?.[provider];
                        const isUploading = uploadingProvider === provider;



                        const getProviderName = (p: string) => {
                          if (p === 'google_drive') return 'Google Drive';
                          if (p === 'onedrive') return 'OneDrive';
                          return p.charAt(0).toUpperCase() + p.slice(1);
                        };

                        return (
                          <button
                            key={provider}
                            onClick={() => handleUpload(provider)}
                            disabled={!!isUploaded || isUploading}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition border-2 ${isUploaded
                              ? "bg-green-50 border-green-200 text-green-700 cursor-default"
                              : "bg-white border-gray-100 text-gray-600 hover:border-brand-orange hover:text-brand-orange"
                              }`}
                          >
                            {isUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : isUploaded ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Cloud className="w-4 h-4" />
                            )}
                            <span>
                              {isUploaded ? t('job_processor.saved_in') : t('job_processor.upload_to')} {getProviderName(provider)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* Botón de Reset / Nuevo Job */}
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 w-full bg-white border-2 border-brand-navy/10 text-brand-navy py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-brand-navy/30 transition"
              >
                {status === "failed" ? (
                  <RefreshCw className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {status === "failed"
                  ? t('job_processor.try_another_url')
                  : t('job_processor.convert_another')}
              </button>
            </div>
          )}

          {status === "failed" && (
            <div className="text-center text-red-500 text-sm mt-4">
              {t('job_processor.error_message')}
            </div>
          )}
        </div>
      )}

      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} />
    </div>
  );
}
