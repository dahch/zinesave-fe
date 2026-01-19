export interface UsageStats {
    plan: string;
    jobs_created: number;
    jobs_limit: number;
    jobs_remaining: number;
}

export interface Job {
    id: string;
    base_url: string;
    source_url: string;
    user_id: string;
    current_step: string | null;
    error_code: string | null;
    error_message: string | null;
    started_at: string | null;
    status: "processing" | "done" | "failed";
    progress: number;
    created_at: string;
    finished_at: string | null;
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
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    is_company?: boolean;
    country?: string | null;
    vat_number?: string | null;
    connected_providers?: Array<string>;
}

