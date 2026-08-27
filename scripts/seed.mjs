import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const menuItems = [
  {
    name: "Rendang Minang Kuda Emas",
    description:
      "Beef short rib slow-braised for eight hours in coconut, galangal and toasted spice paste — finished over smoldering coconut husk until lacquered and dark.",
    category: "Signature Mains",
    price: "Rp 68.000 / pax",
    imageUrl:
      "https://images.pexels.com/photos/37279765/pexels-photo-37279765.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
    sortOrder: 1,
  },
  {
    name: "Sate Lilit Bali",
    description:
      "Hand-minced snapper and prawn wrapped around lemongrass torches, grilled over coconut charcoal and glazed with sambal matah beurre blanc.",
    category: "Signature Mains",
    price: "Rp 52.000 / pax",
    imageUrl:
      "https://images.pexels.com/photos/37179934/pexels-photo-37179934.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
    sortOrder: 2,
  },
  {
    name: "Nasi Kuning Raja",
    description:
      "Saffron-turmeric coconut rice crowned with serundal, telur balado and our chef's daily opor — a royal breakfast table in every portion.",
    category: "Signature Mains",
    price: "Rp 48.000 / pax",
    imageUrl:
      "https://images.pexels.com/photos/37081081/pexels-photo-37081081.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: false,
    sortOrder: 3,
  },
  {
    name: "Sate Ayam Madura Station",
    description:
      "A live grill where master sateers fan skewers of honey-lacquered chicken over flame, served with peanut kacang and pickled acar.",
    category: "Live Stations",
    price: "Rp 45.000 / pax",
    imageUrl:
      "https://images.pexels.com/photos/37205362/pexels-photo-37205362.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
    sortOrder: 4,
  },
  {
    name: "Nasi Goreng Kuda Emas",
    description:
      "Smoked beef fried rice fired in a wok of rendering fat, topped with a 63° egg, krupuk udang and house sambal oelek.",
    category: "Live Stations",
    price: "Rp 42.000 / pax",
    imageUrl:
      "https://images.pexels.com/photos/37081070/pexels-photo-37081070.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
    sortOrder: 5,
  },
  {
    name: "Rijsttafel Nusantara",
    description:
      "Our table of kings — fourteen dishes from Sabang to Merauke, paraded course by course with a dedicated serving brigade.",
    category: "Feast Packages",
    price: "Rp 185.000 / pax",
    imageUrl:
      "https://images.pexels.com/photos/37068399/pexels-photo-37068399.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
    sortOrder: 6,
  },
  {
    name: "Grand Wedding Buffet",
    description:
      "A golden banquet designed for your first night as hosts — chafing lines, floral styling, carving board and dessert pavilion included.",
    category: "Feast Packages",
    price: "Rp 250.000 / pax",
    imageUrl:
      "https://images.pexels.com/photos/37976954/pexels-photo-37976954.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: false,
    sortOrder: 7,
  },
  {
    name: "Bandung Garden High-Tea",
    description:
      "Twenty-tier sweet table of kue tradisional, eclairs and pandan chiffon, styled beneath fresh florals for daytime celebrations.",
    category: "Sweet Finishes",
    price: "Rp 38.000 / pax",
    imageUrl:
      "https://images.pexels.com/photos/38692610/pexels-photo-38692610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: false,
    sortOrder: 8,
  },
  {
    name: "Kue Nusantara Petit Fours",
    description:
      "Bite-size legacies — klepon, lapis legit, putri salju and onde-onde, reimagined with European pastry discipline.",
    category: "Sweet Finishes",
    price: "Rp 35.000 / pax",
    imageUrl:
      "https://images.pexels.com/photos/35985243/pexels-photo-35985243.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: false,
    sortOrder: 9,
  },
];

const testimonials = [
  {
    name: "Sari & Bimo Wijaya",
    role: "Wedding of 600 guests · The Glass House, Jakarta",
    quote:
      "KudaEmas did not cater our wedding — they directed it. The rijsttafel parade gave our guests goosebumps, and six months later people still talk about the rendang. Worth every rupiah.",
    rating: 5,
  },
  {
    name: "Amanda Hartono",
    role: "Head of Events · Nusantara Tech Summit",
    quote:
      "800 delegates, three venues, zero compromise. Their brigade ran like a military operation with the warmth of a family feast. The only vendor our board asks for by name.",
    rating: 5,
  },
  {
    name: "Daniel Prasetyo",
    role: "Private client · Uluwatu Cliff Villa",
    quote:
      "They turned my mother's 70th into theater — live sate station at sunset, kue tower at midnight. Chef Bayu personally walked every dish to the table. Unforgettable.",
    rating: 5,
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM menu_items");
    await client.query("DELETE FROM testimonials");

    for (const item of menuItems) {
      await client.query(
        `INSERT INTO menu_items (name, description, category, price, image_url, featured, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          item.name,
          item.description,
          item.category,
          item.price,
          item.imageUrl,
          item.featured,
          item.sortOrder,
        ],
      );
    }

    for (const t of testimonials) {
      await client.query(
        `INSERT INTO testimonials (name, role, quote, rating) VALUES ($1, $2, $3, $4)`,
        [t.name, t.role, t.quote, t.rating],
      );
    }

    await client.query("COMMIT");
    console.log(
      `Seeded ${menuItems.length} menu items and ${testimonials.length} testimonials.`,
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
