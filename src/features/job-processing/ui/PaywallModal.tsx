"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/shared/api/api";
import { useQueryClient } from "@tanstack/react-query";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/intentions", { tier_requested: "pro_monthly" });
      if (response.data?.reward_granted) {
        toast.success(t('job_processor.paywall_success'), { duration: 6000 });
        queryClient.invalidateQueries({ queryKey: ["me-usage"] });
      } else {
        toast.info(t('job_processor.paywall_soon'));
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="relative p-6 text-center">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="mx-auto bg-orange-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-brand-orange" />
          </div>
          
          <h2 className="text-2xl font-bold text-brand-navy mb-2">
            {t('job_processor.paywall_title')}
          </h2>
          
          <p className="text-gray-600 mb-8">
            {t('job_processor.paywall_desc')}
          </p>
          
          <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              t('job_processor.paywall_button')
            )}
          </button>
          
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full mt-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    </div>
  );
}
