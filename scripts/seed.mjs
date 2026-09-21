// Seed Postgres: creates tables via drizzle-kit push (run separately) and inserts content.
// Connection: DATABASE_URL env var (works for Neon and local Postgres alike), or pass
// the URL as the first CLI argument:  node scripts/seed.mjs "postgresql://..."
import pg from "pg";
import { config as loadEnv } from "dotenv";

// Match Next.js env loading (dotenv alone only reads .env).
loadEnv({ path: [".env.local", ".env.development.local", ".env"], quiet: true });

const connectionString = process.argv[2] || process.env.DATABASE_URL;

if (!connectionString || !connectionString.startsWith("postgres")) {
  console.error("No DATABASE_URL found. Set it in .env.local or pass it as an argument.");
  process.exit(1);
}

const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
const client = new pg.Client({
  connectionString,
  ssl: isLocal ? undefined : { rejectUnauthorized: false },
});
await client.connect();

const menuItems = [
  ["Nasi Minyak", "Aromatic ghee rice cooked with pandan, lemongrass and fried shallots — the anchor of every Malay wedding spread.", "Main", "RM5.00", "/gallery-1.webp", true, 1],
  ["Nasi Briyani", "Long-grain basmati layered with spiced meat curry, saffron milk and fried onions.", "Main", "RM6.00", "/gallery-2.webp", true, 2],
  ["Ayam Masak Merah", "Chicken braised in a silky chilli-tomato gravy with aromatics — a wedding-table classic.", "Main", "RM7.00", "/gallery-3.png", true, 3],
  ["Rendang Daging", "Beef slow-braised in coconut and spice paste until dark, dry and deeply caramelised.", "Main", "RM9.00", "/gallery-4.jpg", true, 4],
  ["Ikan Bakar", "Charcoal-grilled fish glazed with kecap manis, lime and sambal.", "Main", "RM8.50", "/gallery-5.webp", false, 5],
  ["Udang Harimau", "Tiger prawns wok-tossed in a sweet-spicy sambal sauce.", "Main", "RM12.00", "/gallery-6.png", false, 6],
  ["Kambing Panggang", "Slow-roasted marinated lamb carved at the carving board.", "Main", "RM14.00", "/gallery-7.png", true, 7],
  ["Teh O Ais", "Iced black tea — the universal Malaysian table drink.", "Beverage", "RM2.00", "/gallery-1.webp", false, 8],
  ["Teh Tarik", "Hot pulled tea with a frothy crown.", "Beverage", "RM2.50", "/gallery-2.webp", false, 9],
  ["Sirap Bandung", "Rose cordial with milk, served chilled.", "Beverage", "RM2.50", "/gallery-3.png", false, 10],
  ["Air Katira", "Longan, dates and katira gum in a chilled sweet drink.", "Beverage", "RM3.00", "/gallery-4.jpg", false, 11],
  ["Jus Oren", "Freshly squeezed orange juice.", "Beverage", "RM3.50", "/gallery-5.webp", false, 12],
  ["Ulam-ulaman", "Raw herb and vegetable platter with sambal belacan.", "Vegetable", "RM3.50", "/gallery-6.png", false, 13],
  ["Sayur Lodeh", "Mixed vegetables simmered in fragrant coconut gravy.", "Vegetable", "RM3.50", "/gallery-7.png", false, 14],
  ["Kangkung Belacan", "Water spinach stir-fried with prawn paste and chilli.", "Vegetable", "RM3.00", "/gallery-1.webp", false, 15],
  ["Acar Jelatah", "Pickled cucumber, carrot and pineapple in a sweet-sour dressing.", "Vegetable", "RM2.50", "/gallery-2.webp", false, 16],
  ["Kuih-muih Campur", "Assorted traditional Malay kuih selection.", "Dessert", "RM3.00", "/gallery-3.png", true, 17],
  ["Bubur Kacang Hijau", "Sweet mung bean porridge with coconut milk and pandan.", "Dessert", "RM3.00", "/gallery-4.jpg", false, 18],
  ["Sago Gula Melaka", "Sago pearls with palm sugar syrup and coconut cream.", "Dessert", "RM3.50", "/gallery-5.webp", false, 19],
  ["Pengat Pisang", "Bananas simmered in coconut and palm sugar gravy.", "Dessert", "RM3.00", "/gallery-6.png", false, 20],
];

const testimonials = [
  ["Nurul Aisyah", "Bride, Shah Alam · Wedding for 450 pax", "KudaEmas made our wedding feel like a royal banquet. The carving station and the briyani were the two things every guest still talks about.", 5],
  ["Ahmad Firdaus", "Corporate Services Lead, Kuala Lumpur", "Their team handled a 600-delegate summit lunch with military precision — hot food on time, spotless stations, flawless invoices.", 5],
  ["Lim Wei Jian", "Homeowner, Petaling Jaya", "We booked the chef's table at home for my father's 70th. Chef came with the whole brigade and the kitchen smelled like a five-star hotel.", 5],
  ["Siti Halimah", "Community organiser, Klang", "For our mosque fundraiser they catered 350 pax with vegetarian and halal stations, on a very tight budget. Generous, punctual, kind team.", 5],
  ["Rajesh Kumar", "Product Launch Host, Cyberjaya", "The live satay station became the centrepiece of our launch. Guests queued twice — worth every sen.", 5],
];

await client.query("begin");
try {
  await client.query("truncate table menu_items restart identity");
  await client.query("truncate table testimonials restart identity");
  for (const m of menuItems) {
    await client.query(
      `insert into menu_items (name, description, category, price, image_url, featured, sort_order)
       values ($1,$2,$3,$4,$5,$6,$7)`,
      m,
    );
  }
  for (const q of testimonials) {
    await client.query(
      `insert into testimonials (name, role, quote, rating) values ($1,$2,$3,$4)`,
      q,
    );
  }
  await client.query("commit");
  const m = await client.query("select count(*)::int as n from menu_items");
  const t = await client.query("select count(*)::int as n from testimonials");
  console.log(`Seeded menu_items=${m.rows[0].n}, testimonials=${t.rows[0].n}`);
} catch (e) {
  await client.query("rollback");
  console.error("Seed failed:", e.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
