"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Trans, useTranslation } from "react-i18next";

export default function TermsPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-brand-light flex flex-col">
            <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center">
                    <Logo />
                </div>
            </nav>

            <main className="flex-1 max-w-4xl mx-auto px-6 py-12 text-gray-800">
                <h1 className="text-3xl font-bold mb-8 text-brand-navy">{t('terms.title')}</h1>
                <p className="mb-4 text-sm text-gray-500">{t('terms.last_updated')}</p>

                <div className="prose prose-blue max-w-none space-y-6">
                    <p>
                        <Trans i18nKey="terms.intro_1" components={{ 1: <a href="https://zinesave.io" className="text-brand-orange hover:underline" /> }} />
                    </p>
                    <p>{t('terms.intro_2')}</p>
                    <p className="font-bold">
                        {t('terms.intro_3')}
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('terms.sections.1.title')}</h2>

                        <h3 className="font-bold mt-4">{t('terms.sections.1.sub_1.title')}</h3>
                        <p>{t('terms.sections.1.sub_1.content')}</p>

                        <h3 className="font-bold mt-4">{t('terms.sections.1.sub_2.title')}</h3>
                        <p>{t('terms.sections.1.sub_2.content')}</p>

                        <h3 className="font-bold mt-4">{t('terms.sections.1.sub_3.title')}</h3>
                        <p>{t('terms.sections.1.sub_3.content')}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('terms.sections.2.title')}</h2>

                        <h3 className="font-bold mt-4">{t('terms.sections.2.sub_1.title')}</h3>
                        <p>{t('terms.sections.2.sub_1.content')}</p>

                        <h3 className="font-bold mt-4">{t('terms.sections.2.sub_2.title')}</h3>
                        <p>
                            <Trans i18nKey="terms.sections.2.sub_2.p1" components={[<strong key={0} />]} />
                        </p>
                        <p>
                            <Trans i18nKey="terms.sections.2.sub_2.p2" components={[<strong key={0} />]} />
                        </p>

                        <h3 className="font-bold mt-4">{t('terms.sections.2.sub_3.title')}</h3>
                        <p>{t('terms.sections.2.sub_3.content')}</p>

                        <h3 className="font-bold mt-4">{t('terms.sections.2.sub_4.title')}</h3>
                        <p>{t('terms.sections.2.sub_4.intro')}</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>{t('terms.sections.2.sub_4.li1')}</li>
                            <li>{t('terms.sections.2.sub_4.li2')}</li>
                            <li>{t('terms.sections.2.sub_4.li3')}</li>
                            <li>{t('terms.sections.2.sub_4.li4')}</li>
                        </ul>

                        <h3 className="font-bold mt-4">{t('terms.sections.2.sub_5.title')}</h3>
                        <p>
                            <Trans i18nKey="terms.sections.2.sub_5.content" components={{ 1: <a href="mailto:support@zinesave.io" className="text-brand-orange hover:underline" /> }} />
                        </p>

                        <h3 className="font-bold mt-4">{t('terms.sections.2.sub_6.title')}</h3>
                        <p>{t('terms.sections.2.sub_6.intro')}</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><Trans i18nKey="terms.sections.2.sub_6.li1" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="terms.sections.2.sub_6.li2" components={[<strong key={0} />]} /></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('terms.sections.3.title')}</h2>

                        <h3 className="font-bold mt-4">{t('terms.sections.3.sub_1.title')}</h3>
                        <p>{t('terms.sections.3.sub_1.content')}</p>

                        <h3 className="font-bold mt-4">{t('terms.sections.3.sub_2.title')}</h3>
                        <p>{t('terms.sections.3.sub_2.content')}</p>

                        <h3 className="font-bold mt-4">{t('terms.sections.3.sub_3.title')}</h3>
                        <p>{t('terms.sections.3.sub_3.content')}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('terms.sections.4.title')}</h2>
                        <p className="uppercase">{t('terms.sections.4.content')}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('terms.sections.5.title')}</h2>
                        <p className="uppercase">{t('terms.sections.5.p1')}</p>
                        <p>{t('terms.sections.5.p2')}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('terms.sections.6.title')}</h2>
                        <p>{t('terms.sections.6.content')}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('terms.sections.7.title')}</h2>

                        <h3 className="font-bold mt-4">{t('terms.sections.7.sub_1.title')}</h3>
                        <p>{t('terms.sections.7.sub_1.content')}</p>

                        <h3 className="font-bold mt-4">{t('terms.sections.7.sub_2.title')}</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><Trans i18nKey="terms.sections.7.sub_2.li1" components={[<strong key={0} />, <a key={1} href="mailto:support@zinesave.io" className="text-brand-orange hover:underline" />]} /></li>
                            <li><Trans i18nKey="terms.sections.7.sub_2.li2" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="terms.sections.7.sub_2.li3" components={[<strong key={0} />]} /></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('terms.sections.8.title')}</h2>
                        <p>{t('terms.sections.8.content')}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('terms.sections.9.title')}</h2>
                        <p>{t('terms.sections.9.intro')}</p>
                        <ul className="list-none mt-2">
                            <li><Trans i18nKey="terms.sections.9.li1" components={[<strong key={0} />, <a key={1} href="mailto:support@zinesave.io" className="text-brand-orange hover:underline" />]} /></li>
                            <li><Trans i18nKey="terms.sections.9.li2" components={[<strong key={0} />]} /></li>
                        </ul>
                    </section>

                </div>
            </main>

            <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100 mt-12 flex flex-col items-center gap-2">
                <p>{t('landing.footer_rights', { year: new Date().getFullYear() })}</p>
                <div className="flex gap-4">
                    <Link href="/" className="hover:text-brand-navy transition-colors">{t('common.home')}</Link>
                </div>
            </footer>
        </div>
    );
}
