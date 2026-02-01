import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zinesave.io";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "ZineSave - Convert Web Articles to ePub for Kindle",
    template: "%s | ZineSave",
  },
  description:
    "Save articles, guides, and tutorials from the web to read offline on your Kindle or favorite ebook reader, distraction-free and perfectly formatted.",
  keywords: [
    // --- Original Keywords ---
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

    // --- New English Keywords (100+) ---
    // Direct Conversion & Formats
    "html to epub",
    "url to epub",
    "webpage to epub converter",
    "save page as epub",
    "convert url to ebook",
    "html to ebook",
    "turn website into book",
    "website to epub",
    "web to ebook",
    "save html as epub",
    "print web page to epub",
    "convert blog to epub",
    "turn blog into ebook",
    "rss to epub",
    "online epub creator",
    "create epub from html",
    "epub builder",
    "web content to epub",
    "convert article to epub",
    "browser to epub",
    "chrome web to epub",
    "save website as ebook",
    "epub generation api",
    "batch convert url to epub",
    "compile web pages to epub",

    // Device Specific (Kindle, Kobo, etc.)
    "send web page to kindle",
    "push to kindle",
    "send to kobo",
    "save to remarkable",
    "kindle article sender",
    "format for ereader",
    "ereader friendly format",
    "send to pocketbook",
    "read web on kindle",
    "transfer web to ereader",
    "optimize for kindle",

    // Use Cases (Reading & Archiving)
    "read offline",
    "offline browser reader",
    "save for later reading",
    "read it later app",
    "pocket alternative",
    "instapaper alternative",
    "personal web archive",
    "digital library builder",
    "save stories to epub",
    "fanfic downloader",
    "ao3 to epub",
    "wattpad to epub",
    "download fanfiction",
    "save tutorial as epub",
    "save recipe to epub",
    "research gathering tool",
    "study notes from web",
    "commute reading",
    "airplane mode reading",
    "longform reading tool",
    "save thread to epub",
    "reddit to epub",
    "medium to epub converter",
    "substack to epub",
    "wikipedia to epub",

    // Features & Benefits
    "clean reading view",
    "remove ads from article",
    "declutter web page",
    "reader view to epub",
    "simplify webpage text",
    "text only mode",
    "reflowable text format",
    "dyslexia friendly reading",
    "accessibility reading tool",
    "text to speech ready",
    "listen to articles",
    "customizable font size",
    "night mode reading",
    "extract text from url",
    "web scraper to epub",
    "high quality epub",
    "preserve formatting epub",
    "images to epub",
    "free epub tool",
    "no registration epub converter",
    "fast epub conversion",
    "secure web converter",
    "mobile reading tool",
    "cross platform reading",
    "sync articles to ebook",
    "web clipping tool",
    "productivity tools for readers",
    "digital preservation",
    "personal knowledge management",
    "content curator",

    // --- New Spanish Keywords (100+) ---
    // Conversión Directa y Formatos
    "convertir html a epub",
    "url a epub",
    "pasar web a epub",
    "guardar pagina como epub",
    "convertir url a ebook",
    "html a ebook",
    "transformar web en libro",
    "sitio web a epub",
    "web a ebook",
    "guardar html como epub",
    "imprimir web en epub",
    "convertir blog a epub",
    "transformar blog en ebook",
    "rss a epub",
    "creador de epub online",
    "crear epub desde html",
    "constructor de epub",
    "contenido web a epub",
    "convertir articulo a epub",
    "navegador a epub",
    "extension chrome web a epub",
    "guardar sitio como ebook",
    "api generacion epub",
    "convertir urls en lote",
    "compilar paginas web en epub",

    // Dispositivos (Kindle, Kobo, etc.)
    "enviar pagina web a kindle",
    "mandar a kindle",
    "enviar a kobo",
    "guardar en remarkable",
    "enviar articulos a kindle",
    "formato para ereader",
    "formato compatible ereader",
    "enviar a pocketbook",
    "leer web en kindle",
    "transferir web a ereader",
    "optimizar para kindle",

    // Casos de Uso (Lectura y Archivo)
    "leer sin internet",
    "lector de navegador offline",
    "guardar para leer despues",
    "app para leer mas tarde",
    "alternativa a pocket",
    "alternativa a instapaper",
    "archivo web personal",
    "crear biblioteca digital",
    "guardar historias en epub",
    "descargador de fanfic",
    "ao3 a epub",
    "wattpad a epub",
    "descargar fanfiction",
    "guardar tutorial como epub",
    "guardar receta en epub",
    "herramienta de investigacion",
    "apuntes de estudio web",
    "lectura en transporte",
    "lectura modo avion",
    "herramienta lectura larga",
    "guardar hilo en epub",
    "reddit a epub",
    "convertidor medium a epub",
    "substack a epub",
    "wikipedia a epub",

    // Características y Beneficios
    "vista de lectura limpia",
    "quitar anuncios de articulo",
    "limpiar pagina web",
    "vista de lector a epub",
    "simplificar texto web",
    "modo solo texto",
    "texto reajustable",
    "lectura para dislexia",
    "lectura accesible",
    "listo para texto a voz",
    "escuchar articulos",
    "tamaño de letra ajustable",
    "lectura modo noche",
    "extraer texto de url",
    "web scraper a epub",
    "epub de alta calidad",
    "preservar formato epub",
    "imagenes a epub",
    "herramienta epub gratis",
    "convertidor epub sin registro",
    "conversion epub rapida",
    "convertidor web seguro",
    "herramienta lectura movil",
    "lectura multiplataforma",
    "sincronizar articulos a ebook",
    "recorte web a epub",
    "productividad para lectores",
    "preservacion digital",
    "gestion de conocimiento personal",
    "curador de contenido"
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
