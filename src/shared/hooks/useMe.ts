import api from "@/shared/api/api";
import { User } from "@/shared/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
    return useQuery<User>({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await api.get("/me");
            return res.data;
        },
    });
}
