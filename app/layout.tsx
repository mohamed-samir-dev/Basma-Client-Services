import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap" });
const siteUrl = "https://pasmthatfe.com";
const siteName = "بصمة هاتفي المعتمد";
const siteDescription = "بوابة عملاء بصمة هاتفي المعتمد — منظومة التحقق من مقدرتك على السداد الشهري. نظام استقطاع تلقائي آمن ومرخص من البنك المركزي السعودي.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | بوابة العملاء`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ["بصمة هاتفي", "بوابة العملاء", "السداد الشهري", "الاستقطاع التلقائي", "التحقق المالي", "البنك المركزي السعودي", "أقساط شهرية"],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName,
    title: `${siteName} | بوابة العملاء`,
    description: siteDescription,
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | بوابة العملاء`,
    description: siteDescription,
    images: [`${siteUrl}/opengraph-image`],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {},
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  areaServed: { "@type": "Country", name: "Saudi Arabia" },
  availableLanguage: "Arabic",
  logo: `${siteUrl}/android-chrome-512x512.png`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
        <style>{`.material-symbols-outlined { visibility: hidden; } .fonts-loaded .material-symbols-outlined { visibility: visible; }`}</style>
      </head>
      <body suppressHydrationWarning className={`${dmSans.variable} ${plusJakarta.variable} bg-surface font-['DM_Sans'] text-on-background min-h-screen flex flex-col`}>
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        {children}
      </body>
    </html>
  );
}
