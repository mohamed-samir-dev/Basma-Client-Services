import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";

export async function GET() {
  try {
    await connectDB();
    let doc = await SiteSettings.findOne().lean();
    if (!doc) doc = await SiteSettings.create({});
    return NextResponse.json(doc);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const flatSet: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(body)) {
      if (val && typeof val === "object" && !Array.isArray(val)) {
        for (const [subKey, subVal] of Object.entries(val as Record<string, unknown>)) {
          if (subVal && typeof subVal === "object" && !Array.isArray(subVal)) {
            for (const [deepKey, deepVal] of Object.entries(subVal as Record<string, unknown>)) {
              flatSet[`${key}.${subKey}.${deepKey}`] = deepVal;
            }
          } else {
            flatSet[`${key}.${subKey}`] = subVal;
          }
        }
      } else {
        flatSet[key] = val;
      }
    }
    const doc = await SiteSettings.findOneAndUpdate({}, { $set: flatSet }, { upsert: true, new: true }).lean();
    return NextResponse.json(doc);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
