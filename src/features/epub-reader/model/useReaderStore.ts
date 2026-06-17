import { create } from 'zustand';

interface ReaderState {
    isOpen: boolean;
    jobId: string | null;
    openReader: (jobId: string) => void;
    closeReader: () => void;
}

export const useReaderStore = create<ReaderState>((set) => ({
    isOpen: false,
    jobId: null,
    openReader: (jobId) => set({ isOpen: true, jobId }),
    closeReader: () => set({ isOpen: false, jobId: null }),
}));
