import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";

export async function GET() {
  try {
    const quotes = await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));
    return NextResponse.json({ ok: true, quotes });
  } catch (error) {
    console.error("Failed to load testimonials:", error);
    return NextResponse.json({ ok: false, quotes: [] }, { status: 500 });
  }
}
