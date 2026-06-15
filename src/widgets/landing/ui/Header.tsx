"use client";

import LanguageSwitcher from "@/shared/ui/LanguageSwitcher";
import Logo from "@/shared/ui/Logo";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="relative bg-white/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center">
                    <Logo />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <LanguageSwitcher />
                    <Link
                        href="/login"
                        className="px-4 py-2 text-brand-navy font-medium hover:text-brand-orange transition"
                    >
                        {t('common.login')}
                    </Link>
                    <Link
                        href="/register"
                        className="px-4 py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-opacity-90 transition"
                    >
                        {t('common.register')}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-brand-navy p-2 hover:bg-gray-100 rounded-lg transition"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-b border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col p-4 space-y-4">
                        <div className="flex justify-end px-2">
                            <LanguageSwitcher />
                        </div>
                        <Link
                            href="/login"
                            className="block px-4 py-3 bg-brand-navy text-white rounded-lg font-medium text-center hover:bg-opacity-90 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('common.login')}
                        </Link>
                        <Link
                            href="/register"
                            className="block px-4 py-3 bg-brand-orange text-white rounded-lg font-medium text-center hover:bg-opacity-90 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('common.register')}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
