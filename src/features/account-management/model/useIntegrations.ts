import api from "@/shared/api/api";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { logger } from "@/shared/lib/logger";

export function useIntegrations() {
  const { t } = useTranslation();

  const connectGoogleDrive = async () => {
    try {
      logger.info("Initiating Google Drive connection");
      const { data } = await api.get('/auth/google/authorize');
      if (data.auth_url) window.location.href = data.auth_url;
    } catch (e) {
      logger.error("Failed to connect Google Drive", e);
      toast.error(t('dashboard.account.integrations.error_google'));
    }
  };

  const connectDropbox = async () => {
    try {
      logger.info("Initiating Dropbox connection");
      const { data } = await api.get('/auth/dropbox/authorize');
      if (data.auth_url) window.location.href = data.auth_url;
    } catch (e) {
      logger.error("Failed to connect Dropbox", e);
      toast.error(t('dashboard.account.integrations.error_dropbox'));
    }
  };

  const connectOneDrive = async () => {
    try {
      logger.info("Initiating OneDrive connection");
      const { data } = await api.get('/auth/onedrive/authorize');
      if (data.auth_url) window.location.href = data.auth_url;
    } catch (e) {
      logger.error("Failed to connect OneDrive", e);
      toast.error(t('dashboard.account.integrations.error_onedrive'));
    }
  };

  return {
    connectGoogleDrive,
    connectDropbox,
    connectOneDrive,
  };
}
