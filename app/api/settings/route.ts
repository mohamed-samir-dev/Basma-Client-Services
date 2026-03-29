import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";

async function getSettings() {
  await connectDB();
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  return settings;
}

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
