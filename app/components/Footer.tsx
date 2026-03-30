"use client";

export default function Footer({ storeName }: { storeName?: string }) {
  return (
    <footer className="w-full mt-auto py-8 bg-surface-container-low/50" aria-label="تذييل الصفحة">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-4">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">info</span>
          <p className="text-sm font-medium">
            هذه البوابة تابعة لـ {storeName || "بصمة هاتفي المعتمد"} ومخصصة للعملاء الحاليين فقط.
          </p>
        </div>
        <nav aria-label="روابط الموقع" className="flex gap-6 text-[11px] font-bold text-slate-400">
          <a className="hover:text-primary transition-colors" href="/privacy">سياسة الخصوصية</a>
          <a className="hover:text-primary transition-colors" href="/terms">شروط الخدمة</a>
          <a className="hover:text-primary transition-colors" href="/support">مركز المساعدة</a>
        </nav>
        <p className="text-[10px] text-slate-400 pt-2 opacity-60">
          <span>© {new Date().getFullYear()} بصمة هاتفي المعتمد. جميع الحقوق محفوظة.</span>
        </p>
      </div>
    </footer>
  );
}
