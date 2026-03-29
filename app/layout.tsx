import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "بصمة - بوابة العملاء",
  description: "إدارة خدماتك وطلباتك بسهولة بعد الشراء",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body suppressHydrationWarning className="bg-surface font-['DM_Sans'] text-on-background min-h-screen flex flex-col">
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        {children}
      </body>
    </html>
  );
}
