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
        <Link href="/" className="flex items-center gap-2" aria-label="بصمة هاتفي المعتمد - الصفحة الرئيسية">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-linear-to-br from-primary to-primary-container rounded-xl flex items-center justify-center shadow-sm shrink-0" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] fill-white"><path d="M80-120v-80h80v-280H80v-80l400-200 400 200v80h-80v280h80v80H80Zm178-80h82v-280h-82v280Zm162 0h82v-280h-82v280Zm162 0h82v-280h-82v280ZM240-560h480l-240-120-240 120Zm240-120Z"/></svg>
          </div>
          <span className="text-base sm:text-xl font-extrabold text-green-800 tracking-tight font-['Plus_Jakarta_Sans'] leading-tight">
            {storeName || "بصمة هاتفي المعتمد"}
          </span>
        </Link>
        <nav aria-label="التنقل الرئيسي" className="hidden md:flex items-center gap-1">
          <Link className="font-['Plus_Jakarta_Sans'] font-bold text-sm tracking-tight text-green-700 bg-green-50 px-4 py-2 rounded-xl" href="/" aria-current="page">الرئيسية</Link>
          <Link className="font-['Plus_Jakarta_Sans'] font-semibold text-sm tracking-tight text-slate-500 hover:text-green-600 hover:bg-slate-50 transition-all duration-200 px-4 py-2 rounded-xl" href="/features">المميزات</Link>
          <div className="w-px h-6 bg-slate-200 mx-2" aria-hidden="true"></div>
        </nav>
      </div>
    </header>
  );
}
