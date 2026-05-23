"use client";

import api from "@/lib/api";
import { Job } from "@/types/dashboard";
import {
    CheckCircle2,
    Cloud,
    Download,
    HardDrive,
    Link as LinkIcon,
    Loader2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

interface JobActionsProps {
    job: Job;
    connectedProviders: string[];
    onJobUpdate?: () => void;
}

export default function JobActions({ job, connectedProviders, onJobUpdate }: JobActionsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [uploadingProvider, setUploadingProvider] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleUpload = async (provider: string) => {
        setUploadingProvider(provider);
        try {
            await api.post(`/jobs/${job.id}/upload`, { provider });
            toast.success(`Iniciada subida a ${providerName(provider)}`);
            if (onJobUpdate) onJobUpdate();
        } catch (error) {
            console.error(error);
            toast.error(`Error al subir a ${providerName(provider)}`);
        } finally {
            setUploadingProvider(null);
            setIsOpen(false);
        }
    };

    const handleDownload = async () => {
        try {
            const token = useAuthStore.getState().token;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${job.id}/download`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                window.open(data.download_url, '_blank');
            } else {
                toast.error("Error al descargar el archivo");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al descargar el archivo");
        }
    };

    const providerName = (key: string) => {
        switch (key) {
            case 'google_drive': return 'Google Drive';
            case 'dropbox': return 'Dropbox';
            case 'onedrive': return 'OneDrive';
            default: return key;
        }
    };

    const hasUpload = (provider: string) => {
        return job.external_uploads && job.external_uploads[provider];
    };

    if (job.status !== "done") {
        return <span className="text-gray-300 text-sm">-</span>;
    }

    return (
        <div className="relative flex items-center justify-end gap-2" ref={menuRef}>
            {/* Download Button (Always visible) */}
            <a
                href={job.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-navy transition p-1"
                title="Abrir enlace original"
            >
                <LinkIcon className="w-5 h-5" />
            </a>
            {/* Download Button */}
            <button
                onClick={handleDownload}
                className="text-gray-400 hover:text-brand-navy transition p-1"
                title="Descargar"
            >
                <Download className="w-5 h-5" />
            </button>

            {/* Cloud Menu Trigger */}
            {connectedProviders.length > 0 && (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`p-1 transition rounded-full hover:bg-gray-100 ${isOpen ? 'text-brand-orange bg-brand-orange/10' : 'text-gray-400 hover:text-brand-navy'
                            }`}
                        title="Guardar en la nube"
                    >
                        <Cloud className="w-5 h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Guardar en...
                            </div>
                            <div className="p-1">
                                {connectedProviders.map((provider) => {
                                    const uploadData = hasUpload(provider);
                                    const isUploading = uploadingProvider === provider;

                                    return (
                                        <button
                                            key={provider}
                                            onClick={() => !uploadData && handleUpload(provider)}
                                            disabled={!!uploadData || isUploading}
                                            className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-left rounded-lg hover:bg-gray-50 transition disabled:opacity-75 disabled:cursor-default"
                                        >
                                            <span className="flex items-center gap-2 text-gray-700 font-medium">
                                                <HardDrive className="w-4 h-4 text-gray-400" />
                                                {providerName(provider)}
                                            </span>

                                            {isUploading ? (
                                                <Loader2 className="w-3.5 h-3.5 text-brand-orange animate-spin" />
                                            ) : uploadData ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <span className="text-xs text-brand-orange font-medium hover:underline">
                                                    Subir
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
