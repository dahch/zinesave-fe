import { useQuery } from "@tanstack/react-query";
import api from "@/shared/api/api";
import { DashboardDataSchema, DashboardDataType } from "@/shared/types/schemas";

export function useDashboardStats() {
  return useQuery<DashboardDataType>({
    queryKey: ["dashboard-home"],
    queryFn: async () => {
      const res = await api.get("/me/dashboard");
      return DashboardDataSchema.parse(res.data);
    },
  });
}
