import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  vCard — single source of truth synced with the card page UI.       */
/*  Served as a file download so any phone saves the contact directly. */
/* ------------------------------------------------------------------ */

const CARD_URL = "https://www.kateringkudaemas.com/card";

function esc(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

const vcard = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:;Katering KudaEmas;;;",
  "FN:Katering KudaEmas",
  "ORG:Katering KudaEmas",
  "TITLE:Reg. No. 003899142-V",
  "NOTE:Katering KudaEmas - The Golden Standard of Malaysian Katering. Weddings\\, corporate summits & private celebrations across Malaysia.",
  `URL:${CARD_URL}`,
  "item1.TEL;TYPE=CELL:+6018-3551765",
  "item1.X-ABLabel:Our Chef - Azman",
  "item2.TEL;TYPE=CELL:+6011-39794166",
  "item2.X-ABLabel:Azmi",
  "item3.TEL;TYPE=CELL:+6013-6378000",
  "item3.X-ABLabel:North - Abg Man",
  "item4.TEL;TYPE=CELL:+6011-63935224",
  "item4.X-ABLabel:North - Akram",
  "EMAIL;TYPE=INTERNET:kudaemas.app@gmail.com",
  "ADR;TYPE=WORK:;;No. 444 Jalan Tropika 4\\, Residensi Lagenda Tropika;Temoh;Perak;35350;Malaysia",
  "ADR;TYPE=HOME:;;Unit 10-15-37 Tingkat 15\\, Block 10\\, Desa Mentari Apartment;Petaling Jaya;Selangor;46060;Malaysia",
  "REV:2025-10-13T00:00:00Z",
  "END:VCARD",
].join("\r\n");

export async function GET() {
  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Katering-KudaEmas.vcf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
