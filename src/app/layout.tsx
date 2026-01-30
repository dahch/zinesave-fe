import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zinesave.io";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ZineSave - Convert Web Articles to ePub for Kindle",
    template: "%s | ZineSave",
  },
  description:
    "Save articles, guides, and tutorials from the web to read offline on your Kindle or favorite ebook reader, distraction-free and perfectly formatted.",
  keywords: [
    "epub converter",
    "web to epub",
    "kindle converter",
    "read later",
    "offline reading",
    "ebook generator",
    "send to kindle",
    "article saver",
    "distraction free reading",
    "epub downloader",
    "convert website to epub",
    "save web to epub",
    "zinesave",
    "convertir web a epub",
    "guardar articulos",
    "leer offline",
    "enviar a kindle",
    "convertidor epub",
    "descargar epub",
    "leer mas tarde",
    "lectura sin distracciones",
    "articulos a ebook",
  ],
  authors: [{ name: "ZineSave Team" }],
  verification: {
    google: "8Lm_8NUlx0A5HpPoTOFGe3IQqblP3kpTeaMdCDgzFCo",
  },
  openGraph: {
    title: "ZineSave - Convert Web to ePub",
    description:
      "The best tool to save web articles as EPUB ebooks compatible with Kindle and other readers.",
    url: baseUrl,
    siteName: "ZineSave",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png", // Fallback to logo, ideally explicit og-image
        width: 1200,
        height: 630,
        alt: "ZineSave Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZineSave - Your Web in ePub",
    description:
      "Save any web article to read later on your Kindle. Distraction-free.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZineSave",
  url: baseUrl,
  description: "Tool to convert and save web articles in ePub format.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen bg-brand-light">{children}</main>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
