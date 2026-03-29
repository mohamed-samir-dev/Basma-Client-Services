import mongoose, { Schema, models } from "mongoose";

const SiteSettingsSchema = new Schema({
  storeName: { type: String, default: "بصمه هاتفي المعتمد" },
  logoUrl: { type: String, default: "" },
  primaryColor: { type: String, default: "#2563eb" },
  secondaryColor: { type: String, default: "#1e40af" },
  heroTitle: { type: String, default: "بوابة خدمات العملاء" },
  heroDescription: {
    type: String,
    default: "هذه البوابة مخصصة لعملاء المتجر الحاليين لإدارة بعض الطلبات والخدمات بعد الشراء",
  },
  successMessage: { type: String, default: "تم استلام طلبك بنجاح" },
  successSubMessage: { type: String, default: "سيتم مراجعة الطلب والتواصل معك عند الحاجة" },
  fields: {
    birthDate: { enabled: { type: Boolean, default: true }, required: { type: Boolean, default: false } },
    phone: { enabled: { type: Boolean, default: false }, required: { type: Boolean, default: false } },
  },
}, { timestamps: true });

export default models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);
