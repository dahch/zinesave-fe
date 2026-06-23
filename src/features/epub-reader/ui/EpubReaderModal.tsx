"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { ReactReader } from "react-reader";
import api from "@/shared/api/api";
import { useReaderStore } from "../model/useReaderStore";
import { toast } from "sonner";
import { logger } from "@/shared/lib/logger";
import { useTranslation } from "react-i18next";

export default function EpubReaderModal() {
  const { t } = useTranslation();
  const { isOpen, jobId, closeReader } = useReaderStore();
  
  const [epubData, setEpubData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string | number>(0);

  useEffect(() => {
    if (!isOpen || !jobId) return;

    let isMounted = true;
    let objectUrlToRevoke: string | null = null;
    
    const loadEpub = async () => {
      setLoading(true);
      setEpubData(null);
      // Reset location on open
      setLocation(0);
      
      try {
        logger.info("Fetching epub download URL for reader", { jobId });
        const res = await api.get(`/jobs/${jobId}/download`);
        
        if (res.data?.download_url) {
          logger.info("Downloading epub file as Blob via proxy", { jobId });
          // Fetch the file through our proxy to avoid CORS
          const proxyUrl = `/api/proxy-epub?url=${encodeURIComponent(res.data.download_url)}`;
          const fileRes = await fetch(proxyUrl);
          if (!fileRes.ok) {
             throw new Error(`Failed to fetch epub file: ${fileRes.status}`);
          }
          
          // Use Blob and ObjectURL to avoid ReactReader ArrayBuffer coercion bugs
          const blob = await fileRes.blob();
          const objectUrl = URL.createObjectURL(blob);
          objectUrlToRevoke = objectUrl;
          
          if (isMounted) {
             setEpubData(objectUrl);
          }
        } else {
          throw new Error("No download URL returned");
        }
      } catch (error) {
        logger.error("Failed to load epub for reading", error, { jobId });
        toast.error(t('job_processor.reader_modal.error_loading'));
        if (isMounted) {
           closeReader();
        }
      } finally {
        if (isMounted) {
           setLoading(false);
        }
      }
    };
    
    loadEpub();
    
    return () => {
      isMounted = false;
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [isOpen, jobId, closeReader, t]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-semibold text-gray-700">{t('job_processor.reader_modal.title')}</h2>
          <button
            onClick={closeReader}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition"
            title={t('job_processor.reader_modal.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="relative flex-1 bg-white">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 text-brand-orange">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <span className="text-sm font-medium text-gray-500">{t('job_processor.reader_modal.loading')}</span>
            </div>
          ) : epubData ? (
            <div className="absolute inset-0">
              <ReactReader
                url={epubData}
                location={location}
                locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                epubInitOptions={{
                  openAs: "epub"
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
