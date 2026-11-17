import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { inquirySchema } from "@/lib/inquiry";
import { saveInquiry } from "@/server/inquiries";
export const runtime = "nodejs";
const recent = new Map<string, { count: number; expires: number }>();
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.get("host"))
        return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    } catch {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
  }
  const now = Date.now();
  for (const [key, entry] of recent) {
    if (entry.expires < now) recent.delete(key);
  }
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const hit = recent.get(ip) || { count: 0, expires: now + 60000 };
  if (hit.count >= 8)
    return NextResponse.json(
      { error: "Too many attempts. Try again shortly." },
      { status: 429 },
    );
  hit.count++;
  recent.set(ip, hit);
  try {
    const raw = await req.text();
    if (raw.length > 16000)
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success)
      return NextResponse.json(
        { error: "Check your details and try again." },
        { status: 400 },
      );
    const id = randomUUID();
    await saveInquiry({
      ...parsed.data,
      id,
      created_at: new Date().toISOString(),
      status: "new",
    });
    return NextResponse.json(
      { id, message: "Demo inquiry saved successfully." },
      { status: 201 },
    );
  } catch (e) {
    console.error(
      "Inquiry request failed",
      e instanceof Error ? e.message : "Unknown error",
    );
    return NextResponse.json(
      { error: "Unable to save the inquiry. Try again." },
      { status: 500 },
    );
  }
}
