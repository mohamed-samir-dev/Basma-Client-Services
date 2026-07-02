import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap" });
const siteUrl = "https://pasmthatfy-pay.com";
const siteName = "التحقق الموثوق";
const siteDescription = "منصة التحقق من مقدرتك على السداد الشهري — تحقق من رصيدك وقدرتك على الاستقطاع الشهري بأمان وسهولة. مرخص من البنك المركزي السعودي.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | منصة التحقق من السداد`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ["التحقق الموثوق", "منصة التحقق", "السداد الشهري", "الاستقطاع التلقائي", "التحقق المالي", "رصيد الاستقطاع", "البنك المركزي السعودي", "أقساط شهرية"],
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
    title: `${siteName} | منصة التحقق من السداد`,
    description: siteDescription,
    images: [{ url: `${siteUrl}/fav.webp`, width: 512, height: 512, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | منصة التحقق من السداد`,
    description: siteDescription,
    images: [`${siteUrl}/fav.webp`],
  },
  icons: {
    icon: [
      { url: "/fav.webp", type: "image/webp" },
    ],
    apple: "/fav.webp",
    shortcut: "/fav.webp",
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
        <script dangerouslySetInnerHTML={{ __html: `document.fonts.ready.then(() => document.documentElement.classList.add('fonts-loaded'))` }} />
      </head>
      <body suppressHydrationWarning className={`${dmSans.variable} ${plusJakarta.variable} bg-surface font-['DM_Sans'] text-on-background min-h-screen flex flex-col`}>
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        {children}
      </body>
    </html>
  );
}
