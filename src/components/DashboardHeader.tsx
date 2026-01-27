"use client";
import Logo from "@/components/Logo";
import { useAuthStore } from "@/store/auth";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

interface DashboardHeaderProps {
    activeTab: "home" | "new" | "history" | "account";
}

export default function DashboardHeader({ activeTab }: DashboardHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const logout = useAuthStore((s) => s.logout);
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const navLinks = [
        { label: t('common.home'), href: "/dashboard", key: "home" },
        { label: t('dashboard.nav_new_job'), href: "/dashboard/new", key: "new" },
        { label: t('dashboard.nav_history'), href: "/dashboard/history", key: "history" },
    ];

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4 md:gap-8">
                    {/* Logo */}
                    <Logo scale="sm" />

                    {/* Nav Desktop */}
                    <nav className="hidden md:flex gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                className={`text-sm font-medium transition ${activeTab === link.key
                                    ? "text-brand-navy border-b-2 border-brand-orange cursor-default"
                                    : "text-gray-500 hover:text-brand-navy"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    {/* Hamburguesa Mobile */}
                    <button
                        className="md:hidden text-gray-600 focus:outline-none absolute right-4"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Right Side Desktop (Account + Logout) */}
                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />
                    <Link
                        href="/dashboard/account"
                        className={`text-sm font-medium transition ${activeTab === "account"
                            ? "text-brand-navy border-b-2 border-brand-orange cursor-default"
                            : "text-gray-500 hover:text-brand-navy"
                            }`}
                    >
                        {t('common.account')}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-500 hover:text-red-500 transition"
                    >
                        {t('common.logout')}
                    </button>
                </div>
            </div>

            {/* Menú Desplegable Mobile */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col p-4 space-y-2">
                        <div className="px-4 py-2 flex justify-end">
                            <LanguageSwitcher />
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-2 rounded-lg font-medium transition ${activeTab === link.key
                                    ? "bg-brand-orange/10 text-brand-navy"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/dashboard/account"
                            className={`block px-4 py-2 rounded-lg font-medium transition ${activeTab === "account"
                                ? "bg-brand-orange/10 text-brand-navy"
                                : "text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            {t('common.account')}
                        </Link>
                        <div className="border-t border-gray-100 my-2 pt-2">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-500 font-medium hover:bg-red-50 rounded-lg transition"
                            >
                                {t('common.logout')}
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
