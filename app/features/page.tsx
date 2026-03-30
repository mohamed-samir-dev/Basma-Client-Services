import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FeaturesGrid from "./_components/FeaturesGrid";

export const metadata: Metadata = {
  title: "مميزات بصمة هاتفي المعتمد",
  description: "اكتشف منظومة التحقق المالي الكاملة: التحقق من القدرة على السداد، الاستقطاع الشهري التلقائي، الحماية والأمان، سجل المعاملات، والدعم الفوري.",
  alternates: { canonical: "https://pasmthatfe.com/features" },
  openGraph: {
    url: "https://pasmthatfe.com/features",
    title: "مميزات بصمة هاتفي المعتمد",
    description: "منظومة التحقق المالي الكاملة — استقطاع تلقائي، حماية كاملة، ودعم فوري.",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow px-4 sm:px-6 py-10 sm:py-16 pb-24 md:pb-16 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-primary/5 rounded-full blur-[120px]" aria-hidden="true"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-secondary-container/20 rounded-full blur-[120px]" aria-hidden="true"></div>

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-10 sm:mb-14">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-primary transition-colors mb-6">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
              العودة للرئيسية
            </Link>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-4xl font-extrabold text-on-background mb-3">
              منظومة التحقق المالي
            </h1>
            <p className="text-xs sm:text-base text-on-surface-variant/70 max-w-xl mx-auto leading-relaxed">
              نظام متكامل للتحقق من قدرتك على السداد الشهري والاستقطاع الشهري بكل أمان وشفافية
            </p>
          </div>
          <FeaturesGrid />
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
