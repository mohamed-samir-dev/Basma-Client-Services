import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceRequest from "@/lib/models/ServiceRequest";
import { TRANSACTION_LABELS, STATUS_LABELS, TransactionType, RequestStatus } from "@/lib/types";

export async function GET() {
  try {
    await connectDB();
    const requests = await ServiceRequest.find().sort({ createdAt: -1 }).lean();

    const BOM = "\uFEFF";
    const header = "رقم المتابعة,الاسم,رقم الهوية,رقم الطلب,نوع المعاملة,الحالة,التاريخ\n";
    const rows = requests.map((r: any) =>
      `${r.trackingNumber},${r.fullName},${r.identityNumber},${r.orderNumber},${TRANSACTION_LABELS[r.transactionType as TransactionType]},${STATUS_LABELS[r.status as RequestStatus]},${new Date(r.createdAt).toLocaleDateString("ar-SA")}`
    ).join("\n");

    return new NextResponse(BOM + header + rows, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=requests.csv",
      },
    });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
