"use client";
import GuestGuard from "@/features/auth/ui/GuestGuard";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <GuestGuard>{children}</GuestGuard>;
}
