import { z } from "zod";

export const UsageStatsSchema = z.object({
  plan: z.string(),
  credits: z.number(),
  is_beta_tester: z.boolean(),
});

export const JobSchema = z.object({
  id: z.string(),
  base_url: z.string(),
  source_url: z.string(),
  user_id: z.string(),
  current_step: z.string().nullable(),
  error_code: z.string().nullable(),
  error_message: z.string().nullable(),
  started_at: z.string().nullable(),
  status: z.enum(["processing", "done", "failed"]),
  progress: z.number(),
  created_at: z.string(),
  finished_at: z.string().nullable(),
  external_uploads: z.record(z.string(), z.object({
    id: z.string(),
    url: z.string().nullable(),
  })).optional(),
});

export const DashboardDataSchema = z.object({
  usage: UsageStatsSchema,
  recent_jobs: z.array(JobSchema),
  connected_providers: z.array(z.string()),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  created_at: z.string(),
  updated_at: z.string(),
  is_company: z.boolean().optional(),
  country: z.string().nullable().optional(),
  vat_number: z.string().nullable().optional(),
  connected_providers: z.array(z.string()).optional(),
  credits: z.number(),
  is_beta_tester: z.boolean(),
});

export const ApiErrorSchema = z.object({
  detail: z.string().optional(),
  message: z.string().optional()
});

export type UsageStatsType = z.infer<typeof UsageStatsSchema>;
export type JobType = z.infer<typeof JobSchema>;
export type DashboardDataType = z.infer<typeof DashboardDataSchema>;
export type UserType = z.infer<typeof UserSchema>;
