import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    const admin = await Admin.findOne({ username });
    if (!admin) return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
