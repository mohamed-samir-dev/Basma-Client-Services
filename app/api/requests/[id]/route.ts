import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceRequest from "@/lib/models/ServiceRequest";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const updated = await ServiceRequest.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
