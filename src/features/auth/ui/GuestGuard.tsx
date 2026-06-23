"use client";
import { useAuthStore } from "@/entities/auth/model/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isHydrated } = useAuthStore();
    const router = useRouter();
    const isReady = isHydrated && !isAuthenticated();

    useEffect(() => {
        console.log("GuestGuard check:", { isHydrated, isAuthenticated: isAuthenticated() });
        if (isHydrated && isAuthenticated()) {
            console.log("GuestGuard: Redirecting to dashboard");
            router.push("/dashboard");
        }
    }, [isHydrated, isAuthenticated, router]);

    if (!isHydrated || !isReady) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
            </div>
        );
    }

    return <>{children}</>;
}
