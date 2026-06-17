export interface UsageStats {
    plan: string;
    credits: number;
    is_beta_tester: boolean;
}

export interface Job {
    id: string;
    source_url: string;
    status: "queued" | "processing" | "done" | "failed";
    progress: number;
    created_at: string;
    external_uploads?: {
        [key: string]: {
            id: string;
            url: string | null;
        };
    };
}

export interface DashboardData {
    usage: UsageStats;
    recent_jobs: Job[];
    connected_providers: Array<string>;
}

export interface User {
    id: string;
    email: string;
    name: string | null;
    plan: string;
    credits: number;
    is_beta_tester: boolean;
    is_active: boolean;
    is_company: boolean;
    country: string | null;
    vat_number: string | null;
    connected_providers?: Array<string>;
    created_at: string;
}

