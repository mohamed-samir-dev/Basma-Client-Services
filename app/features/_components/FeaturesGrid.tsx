"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "verified",
    title: "التحقق من القدرة على السداد",
    desc: "نحلل قدرتك المالية ونتحقق من إمكانية الالتزام بالأقساط الشهرية قبل إتمام أي معاملة.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: "calendar_month",
    title: "الاستقطاع الشهري المنتظم",
    desc: "نظام استقطاع تلقائي في التاريخ الذي تختاره لضمان انتظام السداد دون أي تأخير.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "shield_check",
    title: "حماية وأمان كامل",
    desc: "جميع بياناتك ومعاملاتك محمية بأعلى معايير الأمان والتشفير.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: "receipt_long",
    title: "سجل المعاملات",
    desc: "تتبع جميع عمليات السداد والاستقطاع بتفاصيل كاملة في أي وقت.",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: "support_agent",
    title: "دعم فوري",
    desc: "فريق دعم متخصص لمساعدتك في أي استفسار يخص معاملاتك المالية.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: "notifications_active",
    title: "تنبيهات استباقية",
    desc: "تلقى إشعارات قبل موعد الاستقطاع لتكون دائماً على علم بمواعيد السداد.",
    color: "bg-rose-50 text-rose-500",
  },
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {features.map((item, i) => (
        <motion.article
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl ghost-shadow border border-outline-variant/10 flex flex-col gap-3"
        >
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.color}`} aria-hidden="true">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base text-on-background">{item.title}</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant/70 leading-relaxed">{item.desc}</p>
        </motion.article>
      ))}
    </div>
  );
}
