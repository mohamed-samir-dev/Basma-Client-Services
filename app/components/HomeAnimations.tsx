import Link from "next/link";

export default function HomeAnimations() {
  return (
    <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

      {/* Right Side: Visual Card */}
      <div className="order-2 md:order-2 px-2 sm:px-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="relative mx-auto max-w-sm sm:max-w-md md:max-w-full">
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-4xl ghost-shadow border border-outline-variant/10 relative z-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex justify-between items-start mb-8 sm:mb-10">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">verified_user</span>
              </div>
              <div className="text-right">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">الحالة</div>
                <div className="px-2 py-0.5 sm:px-3 sm:py-1 bg-green-50 text-green-700 text-[10px] sm:text-xs font-bold rounded-full border border-green-100">البوابة نشطة</div>
              </div>
            </div>
            <div className="space-y-5 sm:space-y-6">
              <div className="h-3 sm:h-4 w-2/3 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[75%] rounded-full shadow-[0_0_12px_rgba(0,110,47,0.3)]"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-surface-container-low p-3 sm:p-4 rounded-2xl">
                  <div className="text-[10px] sm:text-xs text-slate-500 mb-1">الخدمات</div>
                  <div className="text-base sm:text-xl font-['Plus_Jakarta_Sans'] font-bold text-on-surface">+10 آلاف نشطة</div>
                </div>
                <div className="bg-surface-container-low p-3 sm:p-4 rounded-2xl">
                  <div className="text-[10px] sm:text-xs text-slate-500 mb-1">الطلبات</div>
                  <div className="text-base sm:text-xl font-['Plus_Jakarta_Sans'] font-bold text-on-surface">0 معلقة</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-5 -right-5 bg-glass p-3 sm:p-4 rounded-2xl ghost-shadow border border-white/40 z-20 hidden lg:block animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-sm" aria-hidden="true">lock</span>
              </div>
              <span className="text-xs font-bold text-on-surface">وصول آمن</span>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 bg-glass p-4 sm:p-6 rounded-3xl ghost-shadow border border-white/40 z-20 hidden lg:block animate-fade-in" style={{ animationDelay: "0.65s" }}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl" aria-hidden="true">payments</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400">الفاتورة القادمة</div>
                <div className="text-sm font-bold text-on-surface">24 أكتوبر 2025</div>
              </div>
            </div>
          </div>

          <div className="absolute top-4 left-4 w-full h-full bg-surface-container-low rounded-3xl -z-10 translate-x-4 translate-y-4" aria-hidden="true"></div>
        </div>
      </div>

      {/* Left Side: Content */}
      <div className="order-1 md:order-1 space-y-6 sm:space-y-8 text-center md:text-right">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-4xl lg:text-5xl font-extrabold text-on-background leading-[1.2] animate-slide-up">
            بوابة عملاء بصمة هاتفي المعتمد
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl font-medium text-primary/80 leading-relaxed animate-slide-up" style={{ animationDelay: "0.15s" }}>
            منظومة التحقق من <span className="font-bold text-primary">مقدرتك على السداد الشهري</span>
          </p>
          <p className="text-xs sm:text-base text-on-surface-variant/70 max-w-md leading-relaxed mx-auto md:mx-0 animate-slide-up" style={{ animationDelay: "0.25s" }}>
            هذه البوابة مخصصة حصرياً لعملاء بصمة هاتفي المعتمد لإدارة خدماتهم بأمان وكفاءة.
          </p>
          <p className="text-xs sm:text-base text-on-surface-variant/70 max-w-md leading-relaxed mx-auto md:mx-0 animate-slide-up" style={{ animationDelay: "0.32s" }}>
            نظام استقطاع تلقائي في التاريخ الذي تختاره <span className="font-semibold text-on-surface">لضمان انتظام السداد دون أي تأخير.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start animate-slide-up" style={{ animationDelay: "0.35s" }}>
          <Link href="/checkout/verify">
            <button className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-linear-to-br from-primary to-primary-container text-white font-semibold rounded-2xl text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 flex items-center justify-center gap-2 group">
              ابدأ الآن
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform" aria-hidden="true">arrow_back</span>
            </button>
          </Link>
          <Link href="/features">
            <button className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white text-on-surface font-semibold rounded-2xl text-base border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
              اعرف أكتر
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 justify-center md:justify-start pt-2 animate-slide-up" style={{ animationDelay: "0.45s" }}>
          <div className="flex -space-x-3" aria-label="عملاء موثوقون">
            <img className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-surface object-cover" alt="عميل" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-khQDMCfpn7tnncDcJzZaBty3Y2D7AUr8orhRuUrkk9NbIpl_CtXeDl75ui8JzygMXLKovpQrLgAqOBh1jYKneBibRg1nLvgVSc-Xn_ZjN-7fIbdyTcrD4JcMB3ilII4UZwMLEL2MM8vxoFkHUeRcqb3gwl0Hs10rMef5kyAS3sIgzlAplw5mJBtdnJGUonESjeKuIvGycaKa8trt_okkdrqMEr2CIozIIWoZBg_SW3GDqR0Vjz2i0MZyzoQwPVj29LoL_IQForA" />
            <img className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-surface object-cover" alt="عميل" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlJgHdUY-mSlnpfUx1NpGA7laSe_RFtMHy0MxHmYwdOIXMkSQBVU4SrytzIzr_TjVsjewdKQdwwj0VPMP4XSW01blc7p4XV-5UahDfsqqeUPQTyJDUTSJt_mSYac7TEF8z6WFJyhHhQxJmhnccnckXN3lURog5Djjgxd8qz91leca0j-csxGTdlwOpZY7jDqCsw5amLui1cSN41l-YxFvM3bbeFTgOAQDWGn95tRWhBKJdan8vGRxCHKX-Srdc8bVhCZg0a2h-wp8" />
            <img className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-surface object-cover" alt="عميل" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC63C0x5rawVVVGja5lChuQX2eK_7yGCgUQs4YS5zuAX5tTuC2dzp9RhXHVxt_X8zwgZucAxmZHtmjYtbpv9s-YUUPLB9eQpUTYUeug-Ixzkyn3sNA5bSceNrvvyzy-itzHsXFfGtEwpVv4J6ssA013ytcN3nqH3Csfy8z8bOOH-tOmVNshwjFqGX40gU0jb7ib8oXNU6mHr5QOnqxtWNRG00m_CvMNxyttu6eFeLeReiIlLCbCeMVuGdBVKjcEjST9cDecSkOGOSM" />
          </div>
          <div className="text-xs sm:text-sm text-on-surface-variant font-medium">
            موثوق من أكثر من <span className="text-primary font-bold">+10 آلاف</span> عميل نشط
          </div>
        </div>
      </div>

    </div>
  );
}
