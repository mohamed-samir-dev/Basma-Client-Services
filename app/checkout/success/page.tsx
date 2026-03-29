"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSettings } from "@/lib/useSettings";

export default function SuccessPage() {
  const router = useRouter();
  const { settings, loading } = useSettings();
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    const tn = sessionStorage.getItem("trackingNumber");
    if (!tn) {
      router.replace("/");
      return;
    }
    setTrackingNumber(tn);
    sessionStorage.removeItem("trackingNumber");
  }, [router]);

  if (loading || !trackingNumber) {
    return <div className="flex-1 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  return (
    <>
      <Header storeName={settings.storeName} logoUrl={settings.logoUrl} />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="card max-w-lg w-full text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ background: `${settings.primaryColor}15`, color: settings.primaryColor }}>
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{settings.successMessage}</h1>
          <p className="text-gray-500">{settings.successSubMessage}</p>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">رقم المتابعة</p>
            <p className="text-xl font-bold tracking-wider" style={{ color: settings.primaryColor }}>{trackingNumber}</p>
          </div>
          <p className="text-xs text-gray-400">يرجى الاحتفاظ برقم المتابعة للرجوع إليه</p>
          <button onClick={() => router.push("/")} className="btn-primary" style={{ background: settings.primaryColor }}>
            إنهاء
          </button>
        </div>
      </main>
      <Footer storeName={settings.storeName} />
    </>
  );
}
