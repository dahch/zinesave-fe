import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zinesave.io";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ZineSave - Convierte la Web en ePub para Kindle",
    template: "%s | ZineSave",
  },
  description:
    "Guarda artículos, guías y tutoriales de la web para leerlos offline en tu Kindle o lector de libros electrónicos favorito, sin distracciones y con formato perfecto.",
  keywords: [
    "epub converter",
    "kindle",
    "web to epub",
    "guardar articulos",
    "leer offline",
    "read later",
    "ebook generator",
  ],
  authors: [{ name: "ZineSave Team" }],
  openGraph: {
    title: "ZineSave - Convierte la Web en ePub",
    description:
      "La mejor herramienta para guardar artículos web como libros electrónicos EPUB compatibles con Kindle y otros lectores.",
    url: baseUrl,
    siteName: "ZineSave",
    locale: "es_ES",
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
    title: "ZineSave - Tu web en ePub",
    description:
      "Guarda cualquier artículo web para leer después en tu Kindle. Sin distracciones.",
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
  description: "Herramienta para convertir y guardar artículos web en formato ePub.",
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
