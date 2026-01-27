"use client";
import GuestGuard from "@/components/auth/GuestGuard";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import { FileDown, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <GuestGuard>
      <div className="flex flex-col min-h-screen">
        {/* Navbar Simple */}
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="space-x-4 flex items-center">
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
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-10">
          <h1 className="text-5xl md:text-6xl font-bold text-brand-navy mb-6 tracking-tight">
            {t('landing.hero_title_prefix')} <span className="text-brand-orange">{t('landing.hero_vocab_epub')}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-10">
            {t('landing.hero_subtitle')}
          </p>

          <Link
            href="/login"
            className="px-8 py-4 bg-brand-navy text-white text-lg rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition transform duration-200"
          >
            {t('landing.cta_start')}
          </Link>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl w-full text-left">
            <FeatureIcon
              icon={<Zap className="w-6 h-6 text-brand-orange" />}
              title={t('landing.features.fast_title')}
              desc={t('landing.features.fast_desc')}
            />
            <FeatureIcon
              icon={<FileDown className="w-6 h-6 text-brand-orange" />}
              title={t('landing.features.download_title')}
              desc={t('landing.features.download_desc')}
            />
            <FeatureIcon
              icon={<ShieldCheck className="w-6 h-6 text-brand-orange" />}
              title={t('landing.features.secure_title')}
              desc={t('landing.features.secure_desc')}
            />
          </div>
        </main>

        <footer className="py-8 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
          <p>{t('landing.footer_rights', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-navy transition-colors">
              {t('common.privacy_policy')}
            </Link>
            <Link href="/terms" className="hover:text-brand-navy transition-colors">
              {t('common.terms_of_service')}
            </Link>
          </div>
        </footer>
      </div>
    </GuestGuard>
  );
}

function FeatureIcon({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="mb-4 bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg">
        {icon}
      </div>
      <h3 className="font-bold text-brand-navy mb-2">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
}
