import api from "@/lib/api";
import { User } from "@/types/dashboard";
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
