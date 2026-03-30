"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useSettings } from "@/lib/useSettings";

export default function VerifyPage() {
  const router = useRouter();
  const { settings } = useSettings();

  return (
    <>
      <Header storeName={settings.storeName} logoUrl={settings.logoUrl} />
      <main className="flex items-start justify-center px-3 pt-4 pb-6 sm:px-4 sm:pt-6 sm:pb-10 mb-16" dir="rtl">
        <div className="w-full max-w-2xl flex flex-col items-center gap-5 sm:gap-7">

          {/* Step bar */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 w-full">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-widest">التحقق</span>
            <h1 className="text-base sm:text-3xl font-extrabold text-on-background text-center">إكمال التحقق لإتمام الطلب</h1>
            <p className="text-secondary text-[11px] sm:text-sm">الخطوة 1 من 4</p>
            <div className="flex gap-1.5 sm:gap-2 mt-2 w-full max-w-[240px] sm:max-w-sm">
              <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full"></div>
              <div className="h-1.5 sm:h-2 w-full bg-surface-container-highest rounded-full"></div>
              <div className="h-1.5 sm:h-2 w-full bg-surface-container-highest rounded-full"></div>
              <div className="h-1.5 sm:h-2 w-full bg-surface-container-highest rounded-full"></div>
            </div>
          </div>

          {/* Card */}
          <div className="w-full bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-5">

            {/* Verified badge */}
            <div className="flex items-center justify-center gap-3 w-full bg-primary/5 rounded-2xl py-4 px-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <p className="font-bold text-xs sm:text-base text-on-surface">مرخص من البنك المركزي السعودي</p>
            </div>

            {/* Logo */}
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-2xl overflow-hidden">
              <Image
                src="/ChatGPT Image Mar 29, 2026, 07_38_12 PM.webp"
                alt="شعار بصمة هاتفي المعتمد"
                fill
                className="object-contain p-3"
              />
            </div>

            {/* Trust block */}
            <div className="w-full bg-surface-container-low rounded-2xl p-3 sm:p-4 grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
                <p className="text-[10px] sm:text-xs text-on-surface-variant leading-tight">تحقق ثنائي فقط</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="material-symbols-outlined text-primary text-[20px]">storage</span>
                <p className="text-[10px] sm:text-xs text-on-surface-variant leading-tight">بدون حفظ بيانات</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="material-symbols-outlined text-primary text-[20px]">encrypted</span>
                <p className="text-[10px] sm:text-xs text-on-surface-variant leading-tight">تشفير آمن</p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => router.push("/checkout/details")}
              className="w-full py-3.5 sm:py-5 rounded-xl bg-linear-to-br from-primary to-primary-container text-white text-xs sm:text-lg font-bold shadow-[0_8px_20px_-4px_rgba(0,110,47,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              متابعة للخطوة التالية
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>

          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
