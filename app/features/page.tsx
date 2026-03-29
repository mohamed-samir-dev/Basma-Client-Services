"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

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

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow px-4 sm:px-6 py-10 sm:py-16 pb-24 md:pb-16 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-secondary-container/20 rounded-full blur-[120px]"></div>

        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-primary transition-colors mb-6">
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              العودة للرئيسية
            </Link>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-4xl font-extrabold text-on-background mb-3">
              منظومة التحقق المالي
            </h1>
            <p className="text-xs sm:text-base text-on-surface-variant/70 max-w-xl mx-auto leading-relaxed">
              نظام متكامل للتحقق من قدرتك على السداد الشهري والاستقطاع الشهري بكل أمان وشفافية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl ghost-shadow border border-outline-variant/10 flex flex-col gap-3"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base text-on-background">{item.title}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
