import { useQuery } from "@tanstack/react-query";
import api from "@/shared/api/api";
import { UsageStatsSchema, UsageStatsType } from "@/shared/types/schemas";

export function useUsageStats() {
  return useQuery<UsageStatsType>({
    queryKey: ["me-usage"],
    queryFn: async () => {
      const res = await api.get("/me/usage");
      return UsageStatsSchema.parse(res.data);
    },
  });
}
