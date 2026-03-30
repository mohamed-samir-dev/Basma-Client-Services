"use client";

export function useSettings() {
  return {
    settings: {
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
    },
    loading: false,
  };
}
