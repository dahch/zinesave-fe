import { z } from "zod";

export const UsageStatsSchema = z.object({
  plan: z.string(),
  credits: z.number(),
  is_beta_tester: z.boolean(),
});

export const JobSchema = z.object({
  id: z.string(),
  source_url: z.string(),
  status: z.enum(["queued", "processing", "done", "failed"]),
  progress: z.number(),
  created_at: z.string(),
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
  email: z.string().email(),
  name: z.string().nullable(),
  plan: z.string(),
  credits: z.number(),
  is_beta_tester: z.boolean(),
  is_active: z.boolean(),
  is_company: z.boolean(),
  country: z.string().nullable(),
  vat_number: z.string().nullable(),
  connected_providers: z.array(z.string()).optional(),
  created_at: z.string(),
});

export const ApiErrorSchema = z.object({
  detail: z.string().optional(),
  message: z.string().optional()
});

export type UsageStatsType = z.infer<typeof UsageStatsSchema>;
export type JobType = z.infer<typeof JobSchema>;
export type DashboardDataType = z.infer<typeof DashboardDataSchema>;
export type UserType = z.infer<typeof UserSchema>;
