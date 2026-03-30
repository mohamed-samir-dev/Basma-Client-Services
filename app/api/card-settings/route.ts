import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CardFieldSettings from "@/lib/models/CardFieldSettings";

export async function GET() {
  try {
    await connectDB();
    let doc = await CardFieldSettings.findOne().lean();
    if (!doc) doc = await CardFieldSettings.create({});
    return NextResponse.json(doc);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { showExpiryDate, showCvv } = await req.json();
    const doc = await CardFieldSettings.findOneAndUpdate(
      {},
      { $set: { showExpiryDate, showCvv } },
      { upsert: true, new: true }
    ).lean();
    return NextResponse.json(doc);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
