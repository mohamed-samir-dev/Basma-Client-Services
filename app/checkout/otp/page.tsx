"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useSettings } from "@/lib/useSettings";

export default function OtpPage() {
  const router = useRouter();
  const { settings, loading } = useSettings();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(119);
  const [submitting, setSubmitting] = useState(false);

  const isFilled = otp.length >= 4;

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFilled) return;
    setSubmitting(true);
    router.push("/checkout/review");
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Header storeName={settings.storeName} logoUrl={settings.logoUrl} />
      <main className="flex-grow flex items-center justify-center px-3 sm:px-6 lg:px-8 py-6 sm:py-10 mb-16" dir="rtl">
        <div className="w-full max-w-sm sm:max-w-md">

          {/* Step bar */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-widest mb-2">التحقق</span>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-on-background tracking-tight">التحقق من الهوية</h1>
            <p className="text-secondary mt-1 text-xs sm:text-sm">الخطوة 4 من 4</p>
            <div className="flex gap-1.5 mt-3 sm:mt-4 w-full max-w-[200px] sm:max-w-xs">
              <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full" />
              <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full" />
              <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full" />
              <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full" />
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] p-5 sm:p-8 lg:p-10 text-center relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Icon */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
              <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>

            <h2 className="font-headline text-lg sm:text-xl lg:text-2xl font-extrabold text-on-surface mb-2 sm:mb-3">رمز التحقق البنكي</h2>
            <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
              سيتم إرسال رسالة نصية تحتوي على رمز تحقق على رقمك المسجل لدى البنك. أدخل الرمز لتأكيد العملية.{" "}
              <span className="text-xs text-outline">لا تشارك هذا الرمز مع أي شخص.</span>
            </p>

            <form onSubmit={handleSubmit}>
              <input
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-surface-container-low border border-outline/20 focus:border-primary/40 focus:bg-white focus:outline-none text-on-surface text-sm sm:text-base transition-all duration-200 mb-5 sm:mb-8"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="أدخل رمز التحقق"
                inputMode="numeric"
                dir="ltr"
              />

              <button
                type="submit"
                disabled={submitting || !isFilled}
                className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl text-sm sm:text-base shadow-[0_8px_20px_-4px_rgba(0,110,47,0.3)] hover:scale-[1.02] active:scale-95 transition-all mb-4 sm:mb-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {submitting ? "جاري التحقق مع البنك..." : "تأكيد الرمز وإتمام الدفع"}
              </button>
            </form>

            {/* Resend */}
            <button
              disabled={timeLeft > 0}
              onClick={() => setTimeLeft(119)}
              className="w-full py-2.5 sm:py-3 px-6 sm:px-8 border-2 border-primary text-primary font-bold rounded-xl text-xs sm:text-sm transition-all hover:bg-primary/5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:border-outline-variant disabled:text-outline-variant"
            >
              طلب رمز جديد من البنك
            </button>
          </div>

          {/* Trust bar */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 text-outline/60 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base sm:text-lg">lock</span>
              <span className="text-xs uppercase tracking-widest font-bold">تشفير SSL آمن</span>
            </div>
            <div className="w-1 h-1 bg-outline/20 rounded-full" />
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base sm:text-lg">gpp_good</span>
              <span className="text-xs uppercase tracking-widest font-bold">موثوق بسمة</span>
            </div>
          </div>

        </div>
      </main>
      <BottomNav />
    </>
  );
}
