"use client";
import GuestGuard from "@/features/auth/ui/GuestGuard";
import Header from "@/widgets/landing/ui/Header";
import { 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  BookOpen, 
  Link as LinkIcon, 
  Download,
  Layers,
  Cloud
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <GuestGuard>
      <div className="flex flex-col min-h-screen font-sans">
        <Header />

        <main className="flex-1 w-full">
          {/* Hero Section */}
          <section className="relative pt-20 pb-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-50"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange font-semibold text-sm mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4" /> v2.0 is now live
              </span>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-brand-navy mb-6 tracking-tight leading-tight">
                {t('landing.hero_title_prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">{t('landing.hero_vocab_epub')}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
                {t('landing.hero_subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link
                  href="/login"
                  className="group px-8 py-4 bg-brand-navy text-white text-lg rounded-xl font-bold hover:bg-brand-navy/90 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  {t('landing.cta_start')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-24 bg-white px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">{t('landing.how_it_works.title')}</h2>
                <div className="w-20 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-100 z-0"></div>
                
                <article className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <LinkIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">{t('landing.how_it_works.step1.title')}</h3>
                  <p className="text-gray-500">{t('landing.how_it_works.step1.desc')}</p>
                </article>

                <article className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">{t('landing.how_it_works.step2.title')}</h3>
                  <p className="text-gray-500">{t('landing.how_it_works.step2.desc')}</p>
                </article>

                <article className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">{t('landing.how_it_works.step3.title')}</h3>
                  <p className="text-gray-500">{t('landing.how_it_works.step3.desc')}</p>
                </article>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 bg-gray-50 px-4 border-y border-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Zap className="w-8 h-8 text-yellow-600" />}
                  title={t('landing.features.fast_title')}
                  desc={t('landing.features.fast_desc')}
                  bgColor="bg-yellow-50"
                />
                <FeatureCard
                  icon={<Download className="w-8 h-8 text-blue-600" />}
                  title={t('landing.features.download_title')}
                  desc={t('landing.features.download_desc')}
                  bgColor="bg-blue-50"
                />
                <FeatureCard
                  icon={<Layers className="w-8 h-8 text-purple-600" />}
                  title={t('landing.features.combine_title')}
                  desc={t('landing.features.combine_desc')}
                  bgColor="bg-purple-50"
                />
                <FeatureCard
                  icon={<ShieldCheck className="w-8 h-8 text-green-600" />}
                  title={t('landing.features.secure_title')}
                  desc={t('landing.features.secure_desc')}
                  bgColor="bg-green-50"
                />
                <FeatureCard
                  icon={<BookOpen className="w-8 h-8 text-teal-600" />}
                  title={t('landing.features.reader_title')}
                  desc={t('landing.features.reader_desc')}
                  bgColor="bg-teal-50"
                />
                <FeatureCard
                  icon={<Cloud className="w-8 h-8 text-sky-600" />}
                  title={t('landing.features.cloud_title')}
                  desc={t('landing.features.cloud_desc')}
                  bgColor="bg-sky-50"
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-brand-navy px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl font-bold mb-6">{t('landing.cta_bottom.title')}</h2>
              <p className="text-xl text-blue-100 mb-10 opacity-90">{t('landing.cta_bottom.subtitle')}</p>
              <Link
                href="/login"
                className="inline-block px-10 py-5 bg-brand-orange text-white text-lg rounded-xl font-bold hover:bg-brand-orange/90 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                {t('landing.cta_bottom.button')}
              </Link>
            </div>
          </section>
        </main>

        <footer className="py-12 bg-white text-center text-gray-500 text-sm border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-medium">{t('landing.footer_rights', { year: new Date().getFullYear() })}</p>
            <nav className="flex gap-6">
              <Link href="/privacy" className="hover:text-brand-navy transition-colors font-medium">
                {t('common.privacy_policy')}
              </Link>
              <Link href="/terms" className="hover:text-brand-navy transition-colors font-medium">
                {t('common.terms_of_service')}
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </GuestGuard>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bgColor: string;
}) {
  return (
    <article className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className={`mb-6 ${bgColor} w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-navy mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </article>
  );
}
