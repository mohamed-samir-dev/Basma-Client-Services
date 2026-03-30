"use client";

import { useRouter } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)]">
      <button onClick={() => router.push("/")} className="flex flex-col items-center justify-center bg-green-50 text-green-800 rounded-2xl px-5 py-2 scale-90">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
        <span className="font-['DM_Sans'] text-[11px] font-medium mt-1">الرئيسية</span>
      </button>


    </nav>
  );
}
