import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/lib/models/Customer";
import Admin from "@/lib/models/Admin";
import SiteSettings from "@/lib/models/SiteSettings";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashed = await bcrypt.hash("admin123", 10);
      await Admin.create({ username: "admin", password: hashed });
    }

    const existingCustomer = await Customer.findOne({ identityNumber: "1234567890" });
    if (!existingCustomer) {
      await Customer.create({
        name: "أحمد محمد",
        identityNumber: "1234567890",
        birthDate: "1990-01-15",
        phone: "0501234567",
        orderNumber: "ORD-001",
        verificationCode: "ABC123",
        status: "active",
      });
    }

    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) await SiteSettings.create({});

    return NextResponse.json({ message: "تم تهيئة البيانات بنجاح" });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
