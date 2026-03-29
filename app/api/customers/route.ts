import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/lib/models/Customer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { identityNumber, orderNumber, verificationCode } = await req.json();

    const customer = await Customer.findOne({
      identityNumber,
      orderNumber,
      verificationCode,
      status: "active",
    });

    if (!customer) {
      return NextResponse.json(
        { error: "البيانات غير مطابقة، يرجى مراجعة خدمة العملاء" },
        { status: 404 }
      );
    }

    return NextResponse.json({ valid: true, customerId: customer._id });
  } catch {
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
