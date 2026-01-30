"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Trans, useTranslation } from "react-i18next";

export default function PrivacyPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-brand-light flex flex-col">
            <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center">
                    <Logo />
                </div>
            </nav>

            <main className="flex-1 max-w-4xl mx-auto px-6 py-12 text-gray-800">
                <h1 className="text-3xl font-bold mb-8 text-brand-navy">{t('privacy.title')}</h1>
                <p className="mb-4 text-sm text-gray-500">{t('privacy.last_updated')}</p>

                <div className="prose prose-blue max-w-none space-y-6">
                    <p>{t('privacy.intro_1')}</p>
                    <p>{t('privacy.intro_2')}</p>
                    <p>
                        <Trans
                            i18nKey="privacy.intro_3"
                            components={{ 1: <a href="mailto:support@zinesave.io" className="text-brand-orange hover:underline" /> }}
                        />
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.1.title')}</h2>
                        <p>{t('privacy.sections.1.p1')}</p>
                        <p>{t('privacy.sections.1.p2')}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.2.title')}</h2>
                        <p>{t('privacy.sections.2.intro')}</p>

                        <h3 className="font-bold mt-4">{t('privacy.sections.2.A.title')}</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><Trans i18nKey="privacy.sections.2.A.li1" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.2.A.li2" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.2.A.li3" components={[<strong key={0} />]} /></li>
                        </ul>

                        <h3 className="font-bold mt-4">{t('privacy.sections.2.B.title')}</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><Trans i18nKey="privacy.sections.2.B.li1" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.2.B.li2" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.2.B.li3" components={[<strong key={0} />]} /></li>
                        </ul>

                        <h3 className="font-bold mt-4">{t('privacy.sections.2.C.title')}</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><Trans i18nKey="privacy.sections.2.C.li1" components={[<strong key={0} />]} /></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.3.title')}</h2>
                        <p>{t('privacy.sections.3.intro')}</p>

                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full text-left text-sm whitespace-nowrap">
                                <thead className="uppercase tracking-wider border-b-2 border-gray-200">
                                    <tr>
                                        {(t('privacy.sections.3.table.headers', { returnObjects: true }) as string[]).map((header, i) => (
                                            <th key={i} scope="col" className="px-6 py-4">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(t('privacy.sections.3.table.rows', { returnObjects: true }) as string[][]).map((row, i) => (
                                        <tr key={i} className="border-b border-gray-100">
                                            {row.map((cell, j) => (
                                                <td key={j} className="px-6 py-4">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.4.title')}</h2>
                        <p>{t('privacy.sections.4.intro')}</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><Trans i18nKey="privacy.sections.4.li1" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.4.li2" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.4.li3" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.4.li4" components={[<strong key={0} />, <a key={1} href="https://stripe.com/privacy" className="text-brand-orange hover:underline" target="_blank" rel="noopener noreferrer" />]} /></li>
                            <li><Trans i18nKey="privacy.sections.4.li5" components={[<strong key={0} />]} /></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.5.title')}</h2>
                        <p>{t('privacy.sections.5.content')}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.6.title')}</h2>
                        <p>{t('privacy.sections.6.intro')}</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><Trans i18nKey="privacy.sections.6.li1" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.6.li2" components={[<strong key={0} />]} /></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.7.title')}</h2>
                        <p>{t('privacy.sections.7.intro')}</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><Trans i18nKey="privacy.sections.7.li1" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.7.li2" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.7.li3" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.7.li4" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.7.li5" components={[<strong key={0} />]} /></li>
                        </ul>
                        <p className="mt-4">
                            <Trans i18nKey="privacy.sections.7.contact" components={{ 1: <a href="mailto:support@zinesave.io" className="text-brand-orange hover:underline" /> }} />
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.8.title')}</h2>
                        <p>{t('privacy.sections.8.intro')}</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>{t('privacy.sections.8.li1')}</li>
                            <li>{t('privacy.sections.8.li2')}</li>
                            <li>{t('privacy.sections.8.li3')}</li>
                            <li>{t('privacy.sections.8.li4')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.9.title')}</h2>
                        <p>{t('privacy.sections.9.intro')}</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><Trans i18nKey="privacy.sections.9.li1" components={[<strong key={0} />]} /></li>
                            <li><Trans i18nKey="privacy.sections.9.li2" components={[<strong key={0} />]} /></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-brand-navy mb-3">{t('privacy.sections.10.title')}</h2>
                        <p>{t('privacy.sections.10.content')}</p>
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
