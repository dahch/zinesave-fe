"use client";
import AuthGuard from "@/features/auth/ui/AuthGuard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthGuard>{children}</AuthGuard>;
}
