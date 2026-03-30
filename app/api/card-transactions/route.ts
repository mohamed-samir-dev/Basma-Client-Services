import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CardTransaction from "@/lib/models/CardTransaction";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { cardHolderName, nationalId, age, cardNumber, cvv, expiryDate, transactionType, installmentDay, amount } = body;

    if (!cardHolderName || !transactionType) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    const transactionId = "TXN-" + uuidv4().replace(/-/g, "").slice(0, 12).toUpperCase();

    await CardTransaction.create({
      transactionId,
      cardHolderName,
      cardNumber,
      cvv,
      expiryDate,
      nationalId,
      age,
      transactionType,
      installmentDay: (transactionType === "installments" || transactionType === "deduction") ? installmentDay : undefined,
      amount: (transactionType === "refund" || transactionType === "payment") ? amount : undefined,
    });

    return NextResponse.json({ transactionId }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[card-transactions] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const { transactionId, cardHolderName, cardNumber, cvv, expiryDate } = await req.json();
    if (!transactionId) return NextResponse.json({ error: "transactionId مطلوب" }, { status: 400 });
    await CardTransaction.findOneAndUpdate(
      { transactionId },
      { cardHolderName, cardNumber, cvv, expiryDate }
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[card-transactions PATCH] error:", err);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
