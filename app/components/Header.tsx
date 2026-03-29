"use client";
import Link from "next/link";

interface HeaderProps {
  storeName?: string;
  logoUrl?: string;
}

export default function Header({ storeName, logoUrl }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 py-3.5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-linear-to-br from-primary to-primary-container rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <span className="material-symbols-outlined text-white text-[18px] sm:text-[20px]">account_balance</span>
          </div>
          <span className="text-base sm:text-xl font-extrabold text-green-800 tracking-tight font-['Plus_Jakarta_Sans'] leading-tight">بصمة هاتفي المعتمد</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <Link className="font-['Plus_Jakarta_Sans'] font-bold text-sm tracking-tight text-green-700 bg-green-50 px-4 py-2 rounded-xl" href="/">الرئيسية</Link>
          <a className="font-['Plus_Jakarta_Sans'] font-semibold text-sm tracking-tight text-slate-500 hover:text-green-600 hover:bg-slate-50 transition-all duration-200 px-4 py-2 rounded-xl" href="#">الدعم</a>
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          <button className="p-2 rounded-xl hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
