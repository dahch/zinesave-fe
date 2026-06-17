import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { AxiosError } from "axios";
import api from "@/shared/api/api";
import { useAuthStore } from "@/entities/auth/model/store";
import { Job } from "@/shared/types/dashboard";
import { logger } from "@/shared/lib/logger";

import { JobSchema, ApiErrorSchema } from "@/shared/types/schemas";

export function useJobProcessor() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  const [urlInput, setUrlInput] = useState("");
  const [jobType, setJobType] = useState<"simple" | "composite">("simple");
  const [urlsInput, setUrlsInput] = useState<string[]>(["", ""]);
  const [titleInput, setTitleInput] = useState("");
  
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [uploadingProvider, setUploadingProvider] = useState<string | null>(null);

  const createJobMutation = useMutation({
    mutationFn: async (url: string) => {
      logger.info("Creating new job", { url });
      const res = await api.post("/jobs", { url });
      return JobSchema.parse(res.data);
    },
    onSuccess: (data) => {
      logger.info("Job created successfully", { jobId: data.id });
      setCurrentJobId(data.id);
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status;
      const data = ApiErrorSchema.safeParse(error.response?.data);
      const detail = data.success ? data.data.detail : undefined;
      logger.error("Job creation failed", error, { status, detail });

      if (status === 403 && detail === 'INSUFFICIENT_CREDITS') {
        setIsPaywallOpen(true);
      } else if (status === 409) {
        toast.error(t('job_processor.error_conflict'));
      } else if (status === 429) {
        toast.error(t('job_processor.error_rate_limit'));
      } else if (status === 400 && detail) {
        toast.error(detail);
      } else {
        toast.error(detail || t('job_processor.create_error'));
      }
    },
  });

  const createCompositeJobMutation = useMutation({
    mutationFn: async (payload: { urls: string[]; title: string }) => {
      logger.info("Creating new composite job", { count: payload.urls.length });
      const res = await api.post("/jobs/composite", payload);
      return JobSchema.parse(res.data);
    },
    onSuccess: (data) => {
      logger.info("Composite job created successfully", { jobId: data.id });
      setCurrentJobId(data.id);
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status;
      const data = ApiErrorSchema.safeParse(error.response?.data);
      const detail = data.success ? data.data.detail : undefined;
      logger.error("Composite job creation failed", error, { status, detail });

      if (status === 403 && detail === 'INSUFFICIENT_CREDITS') {
        setIsPaywallOpen(true);
      } else if (status === 409) {
        toast.error(t('job_processor.error_conflict'));
      } else if (status === 429) {
        toast.error(t('job_processor.error_rate_limit'));
      } else if (status === 400 && detail) {
        toast.error(typeof detail === 'string' ? detail : JSON.stringify(detail));
      } else if (status === 422 && detail) {
        toast.error(t('job_processor.urls_required'));
      } else {
        toast.error(typeof detail === 'string' ? detail : t('job_processor.create_error'));
      }
    },
  });

  const jobStatusQuery = useQuery({
    queryKey: ["job", currentJobId],
    queryFn: async () => {
      const res = await api.get(`/jobs/${currentJobId}`);
      return JobSchema.parse(res.data);
    },
    enabled: !!currentJobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      setJobId(query.state.data?.id ?? null);
      if (status === "done" || status === "failed") return false;
      return 1500;
    },
  });

  const handleReset = () => {
    logger.info("Resetting job state");
    setCurrentJobId(null);
    setUrlInput("");
    setUrlsInput(["", ""]);
    setTitleInput("");
    if (currentJobId) {
      queryClient.removeQueries({ queryKey: ["job", currentJobId] });
    }
  };

  const handleUpload = async (provider: string) => {
    if (!currentJobId) return;
    setUploadingProvider(provider);
    logger.info("Uploading job to external provider", { jobId: currentJobId, provider });
    try {
      await api.post(`/jobs/${currentJobId}/upload`, { provider });
      toast.success(t('job_processor.upload_success'));
      queryClient.invalidateQueries({ queryKey: ["job", currentJobId] });
    } catch (error) {
      logger.error("Failed to upload job", error, { jobId: currentJobId, provider });
      toast.error(t('job_processor.upload_error'));
    } finally {
      setUploadingProvider(null);
    }
  };

  const handleDownload = async () => {
    if (!jobId) return;
    logger.info("Initiating download", { jobId });
    try {
      const token = useAuthStore.getState().token;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}/download`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        window.open(data.download_url, '_blank');
      } else {
        logger.error("Download failed response", null, { status: res.status });
        toast.error(t('job_processor.upload_error'));
      }
    } catch (error) {
      logger.error("Download exception", error);
      toast.error(t('job_processor.upload_error'));
    }
  };

  const status = jobStatusQuery.data?.status;
  const progress = jobStatusQuery.data?.progress || 0;

  return {
    jobType,
    setJobType,
    urlInput,
    setUrlInput,
    urlsInput,
    setUrlsInput,
    titleInput,
    setTitleInput,
    currentJobId,
    jobId,
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
  };
}
