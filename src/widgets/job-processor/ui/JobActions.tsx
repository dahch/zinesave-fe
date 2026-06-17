"use client";

import api from "@/shared/api/api";
import { JobType } from "@/shared/types/schemas";
import {
    CheckCircle2,
    Cloud,
    Download,
    HardDrive,
    Link as LinkIcon,
    Loader2,
    BookOpen
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useJobActions } from "@/features/job-processing/model/useJobActions";
import { useReaderStore } from "@/features/epub-reader/model/useReaderStore";
import { useTranslation } from "react-i18next";

interface JobActionsProps {
    job: JobType;
    connectedProviders: string[];
    onJobUpdate?: () => void;
}

export default function JobActions({ job, connectedProviders, onJobUpdate }: JobActionsProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const {
        uploadingProvider,
        providerName,
        uploadToCloud,
        downloadJob
    } = useJobActions(job.id, onJobUpdate);
    const { openReader } = useReaderStore();

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
        await uploadToCloud(provider);
        setIsOpen(false);
    };

    const hasUpload = (provider: string) => {
        return job.external_uploads && job.external_uploads[provider];
    };

    if (job.status !== "done") {
        return <span className="text-gray-300 text-sm">-</span>;
    }

    return (
        <div className="relative flex items-center justify-end gap-2" ref={menuRef}>
            {/* Read Button */}
            <button
                onClick={() => openReader(job.id)}
                className="text-gray-400 hover:text-brand-navy transition p-1"
                title={t('job_processor.read_epub')}
            >
                <BookOpen className="w-5 h-5" />
            </button>

            {/* Original Link Button (Always visible) */}
            <a
                href={job.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-navy transition p-1"
                title={t('job_processor.open_original_link')}
            >
                <LinkIcon className="w-5 h-5" />
            </a>
            {/* Download Button */}
            <button
                onClick={downloadJob}
                className="text-gray-400 hover:text-brand-navy transition p-1"
                title={t('job_processor.download')}
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
                        title={t('job_processor.save_to_cloud')}
                    >
                        <Cloud className="w-5 h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {t('job_processor.save_to_ellipsis')}
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
                                                    {t('job_processor.upload_action')}
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
