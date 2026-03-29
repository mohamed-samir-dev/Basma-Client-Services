"use client";
import { useEffect, useState } from "react";
import { SiteSettings } from "@/lib/types";

const defaults: SiteSettings = {
  storeName: "بصمه هاتفي المعتمد",
  logoUrl: "",
  primaryColor: "#2563eb",
  secondaryColor: "#1e40af",
  heroTitle: "بوابة خدمات العملاء",
  heroDescription: "هذه البوابة مخصصة لعملاء المتجر الحاليين لإدارة بعض الطلبات والخدمات بعد الشراء",
  successMessage: "تم استلام طلبك بنجاح",
  successSubMessage: "سيتم مراجعة الطلب والتواصل معك عند الحاجة",
  fields: {
    birthDate: { enabled: true, required: false },
    phone: { enabled: false, required: false },
  },
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setSettings({ ...defaults, ...data }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}
