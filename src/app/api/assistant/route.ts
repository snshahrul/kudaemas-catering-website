import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { CATALOG, LIVE_STATIONS } from '@/lib/catalog';

export const runtime = 'nodejs';

/* ------------------------------------------------------------------ */
/*  Real business facts — single source of truth shared with the site. */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = '+6011-3979 4166 / +6018-355 1765 / +6013-6378 000 (North) / +6011-6393 5224 (North)';
const WHATSAPP_URL = 'https://wa.me/60183551765';

// Menu + per-tier pricing, generated from the same CATALOG the site's
// calculator uses (TierKey: 100+ pax / 60–100 pax / ≤40 pax, price per pax MYR).
const TIER_LABELS: Record<string, string> = {
  tier100: '100+ pax',
  tier60: '60–100 pax',
  tier40: 'below 40 pax',
};

const MENU_LINES = CATALOG.map((category) => {
  const dishes = category.dishes
    .map((d) => `${d.name} (RM${d.price.tier100.toFixed(2)}/${d.price.tier60.toFixed(2)}/${d.price.tier40.toFixed(2)})`)
    .join(', ');
  return `- ${category.key}: ${dishes}`;
}).join('\n');

const LIVE_STATION_LINES = LIVE_STATIONS.map(
  (s) => `${s.name} — RM${s.price.tier100.toFixed(2)}/${s.price.tier60.toFixed(2)}/${s.price.tier40.toFixed(2)} ${s.unit}`
).join('\n');

// ---- Business knowledge (edit freely) ----
const BUSINESS_INFO = `
You are "Nina", the AI concierge for Katering KudaEmas (Reg. No. 003899142-V) — "The Golden Standard of Malaysian Katering", an award-winning Malaysian catering company for weddings, corporate summits and private celebrations, est. 2025.

VOICE & STYLE:
- Warm, elegant, confident — like a five-star hotel concierge. Never robotic.
- Answer in the language the customer uses (Bahasa Malaysia or English); if they mix, mirror their mix. Keep answers short (2–4 sentences).
- Use "RM" for money. Prices are per pax unless stated otherwise.

REAL FACTS YOU MUST USE (never invent others):
- Phone / WhatsApp: ${PHONE_DISPLAY} (WhatsApp: ${WHATSAPP_URL})
- Email: kudaemas.app@gmail.com
- Kitchen (Central/Selangor): 10-15-37, Tingkat 15, Desa Mentari Apartment Block 10, 46060 Petaling Jaya, Selangor
- North region (Perak): No. 444 Jalan Tropika 4, Residensi Lagenda Tropika, 35350 Temoh, Perak — contacts Abg Man (+6013-637 8000) and Akram (+6011-6393 5224)
- Hours: Mon–Sat, 08.00–20.00. Closed Sunday & public holidays.
- Fully halal (JAKIM-certified standards).
- Serving area: across Malaysia — KL, Petaling Jaya, Shah Alam, Klang, Cyberjaya and the northern region (Perak incl. Temoh, Tapah, Bidor) and beyond; delivery/setup fee from RM250.
- Orders are in increments of 5 pax; +RM3 per pax for 20–29 pax orders; orders finalized at least 4 working days before the event; teardown 2h30m after serving time.
- Quoted food price includes bridal dish, beverages and a 13-person F&B service brigade, collection & replacement of used dishes, and supervision.
- Deposits and final contracts are handled by the human event director after the inquiry — never quote deposit percentages or claim a booking is confirmed.

LIVE STATIONS (charcoal-grilled sate served straight off the fire — optional add-on, priced PER STICK not per pax; tiers = 100+ pax / 60–100 pax / below 40 pax):
${LIVE_STATION_LINES}
Example: 200 sticks of Sate Daging at a 100+ pax price of RM0.80/stick = RM160, added ON TOP of the per-pax buffet total. Offer live stations for interactive/launch/launch-style events or as a wow-factor addition to any wedding buffet.

MENU & PRICING (per pax, MYR; tiers = price at 100+ pax / 60–100 pax / below 40 pax):
${MENU_LINES}
Example: a 100-pax event with Nasi Minyak, Ayam Merah, Daging Rendang, Acar Buah, Buah-buahan and Kuih Campur costs RM11.20 × 100 = RM1,120 (before the RM250 delivery/setup fee).
Example: a 100-pax event with Nasi Minyak, Ayam Merah, Daging Rendang, Acar Buah, Buah-buahan and Kuih Campur costs RM11.20 × 100 = RM1,120 (before the RM250 delivery/setup fee).

LIVE STATIONS (optional add-ons, priced per stick/unit — NOT per pax; same tiers as the menu: 100+ / 60–100 / below 40 pax):
${LIVE_STATION_LINES}

These are live, staffed cooking stations (charcoal-grill sate etc.) served straight to guests. Recommended with the "Live Stations Package" or as a highlight for launch/interactive events. Priced per stick/unit and added on top of the per-pax menu total. (what the booking form offers): Grand Wedding Buffet, Live Stations Package, High-Tea & Sweets, Custom / Not sure yet.
Suggest "Grand Wedding Buffet" for weddings 100+ pax, "Live Stations Package" for interactive/launch events, "High-Tea & Sweets" for afternoon or light events.

BOOKING FLOW (VERY IMPORTANT):
When the customer wants to book or request a quotation, collect these fields ONE AT A TIME in a natural conversation (never ask for two at once):
1. name (full name)
2. email
3. phone
4. eventDate (YYYY-MM-DD, today or later)
5. eventType (wedding / corporate / private / government / other)
6. pax (number of guests)
7. notes (menu preferences, dietary needs, venue) — optional

Once you have ALL of name, email, phone, eventDate, eventType, and pax, output a special line at the END of your reply, on its own line, EXACTLY in this format:
[[BOOKING_READY]]{"name":"...","email":"...","phone":"...","eventDate":"YYYY-MM-DD","eventType":"...","pax":123,"notes":"..."}

Do NOT output that line until every required field is present. Do not make up missing values — ask for them.
Never claim the booking is confirmed; the system will handle the actual submission and show the customer the result.
`;

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Assistant not configured (missing OPENAI_API_KEY).' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    if (messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.5,
      max_tokens: 500,
      messages: [
        { role: 'system', content: BUSINESS_INFO },
        ...messages.slice(-20), // cap context
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? '';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[assistant] error:', err);
    return NextResponse.json(
      { error: 'Assistant is temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  }
}
