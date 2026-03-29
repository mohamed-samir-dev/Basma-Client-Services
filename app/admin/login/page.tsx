"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error);
        return;
      }
      router.push("/admin");
    } catch {
      toast.error("حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <form onSubmit={handleLogin} className="card max-w-sm w-full space-y-5 text-center">
        <h1 className="text-2xl font-bold">تسجيل دخول الإدارة</h1>
        <div>
          <label className="label">اسم المستخدم</label>
          <input className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label className="label">كلمة المرور</label>
          <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </main>
  );
}
