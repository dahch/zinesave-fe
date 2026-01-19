"use client";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useAuthStore((s) => s.setToken);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token);

      api.get("/me")
        .then((res) => {
          const user = res.data;
          if (!user.country) {
            router.replace("/onboarding");
          } else {
            router.replace("/dashboard");
          }
        })
        .catch(() => {
          router.replace("/dashboard");
        });

    } else {
      router.push("/login?error=auth_failed");
    }
  }, [searchParams, router, setToken]);

  return (
    <div className="h-screen flex items-center justify-center bg-brand-navy text-white">
      <div className="animate-pulse">Autenticando...</div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-brand-navy text-white">
        <div className="animate-pulse">Autenticando...</div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
