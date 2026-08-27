import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { menuItems } from "@/db/schema";

export async function GET() {
  try {
    const items = await db.select().from(menuItems).orderBy(asc(menuItems.sortOrder));
    return NextResponse.json({ ok: true, items });
  } catch (error) {
    console.error("Failed to load menu:", error);
    return NextResponse.json({ ok: false, items: [] }, { status: 500 });
  }
}
