import { useState } from "react";
import api from "@/shared/api/api";
import { toast } from "sonner";
import { logger } from "@/shared/lib/logger";

export function useJobActions(jobId: string, onJobUpdate?: () => void) {
  const [uploadingProvider, setUploadingProvider] = useState<string | null>(null);

  const providerName = (key: string) => {
    switch (key) {
      case 'google_drive': return 'Google Drive';
      case 'dropbox': return 'Dropbox';
      case 'onedrive': return 'OneDrive';
      default: return key;
    }
  };

  const uploadToCloud = async (provider: string) => {
    setUploadingProvider(provider);
    try {
      logger.info(`Initiating upload to ${provider}`, { jobId, provider });
      await api.post(`/jobs/${jobId}/upload`, { provider });
      toast.success(`Iniciada subida a ${providerName(provider)}`);
      if (onJobUpdate) onJobUpdate();
    } catch (error) {
      logger.error(`Failed to upload to ${provider}`, error, { jobId, provider });
      toast.error(`Error al subir a ${providerName(provider)}`);
    } finally {
      setUploadingProvider(null);
    }
  };

  const downloadJob = async () => {
    const newWindow = window.open('', '_blank');

    try {
      logger.info("Initiating job download", { jobId });
      const res = await api.get(`/jobs/${jobId}/download`);

      if (res.data?.download_url) {
        if (newWindow) {
          newWindow.location.href = res.data.download_url;
        } else {
          window.location.href = res.data.download_url;
        }
      } else {
        if (newWindow) newWindow.close();
        throw new Error("No download URL returned");
      }
    } catch (error) {
      if (newWindow) newWindow.close();
      logger.error("Failed to download job", error, { jobId });
      toast.error("Error al descargar el archivo");
    }
  };

  return {
    uploadingProvider,
    providerName,
    uploadToCloud,
    downloadJob,
  };
}
