import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import HomeAnimations from "./components/HomeAnimations";

export const metadata: Metadata = {
  title: "بصمة هاتفي المعتمد | بوابة العملاء",
  description: "بوابة عملاء بصمة هاتفي المعتمد — منظومة التحقق من مقدرتك على السداد الشهري. نظام استقطاع تلقائي آمن ومرخص من البنك المركزي السعودي.",
  alternates: { canonical: "https://pasmthatfe.com" },
  openGraph: {
    url: "https://pasmthatfe.com",
    title: "بصمة هاتفي المعتمد | بوابة العملاء",
    description: "منظومة التحقق من مقدرتك على السداد الشهري. نظام استقطاع تلقائي آمن ومرخص من البنك المركزي السعودي.",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="grow flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16 lg:py-24 relative overflow-hidden pb-24 md:pb-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" aria-hidden="true"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-secondary-container/20 rounded-full blur-[120px]" aria-hidden="true"></div>
        <HomeAnimations />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
