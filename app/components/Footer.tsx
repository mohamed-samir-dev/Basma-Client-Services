"use client";

export default function Footer() {
  return (
    <footer className="w-full mt-auto py-8 bg-surface-container-low/50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-4">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="material-symbols-outlined text-sm">info</span>
          <p className="text-sm font-medium">
            هذه البوابة تابعة لبصمة هاتفي المعتمد ومخصصة للعملاء الحاليين فقط.
          </p>
        </div>
        <div className="flex gap-6 text-[11px] font-bold text-slate-400">
          <a className="hover:text-primary transition-colors" href="#">سياسة الخصوصية</a>
          <a className="hover:text-primary transition-colors" href="#">شروط الخدمة</a>
          <a className="hover:text-primary transition-colors" href="#">مركز المساعدة</a>
        </div>
        <p className="text-[10px] text-slate-400 pt-2 opacity-60">
          © 2025 بصمة هاتفي المعتمد. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
