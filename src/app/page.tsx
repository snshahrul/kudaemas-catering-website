import { asc } from "drizzle-orm";
import { db } from "@/db";
import { menuItems } from "@/db/schema";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { MenuSection } from "@/components/menu-section";
import { Gallery } from "@/components/gallery";
import { QualityManagement } from "@/components/quality-management";
import { BookingForm } from "@/components/booking-form";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

async function getMenuItems() {
  try {
    return await db.select().from(menuItems).orderBy(asc(menuItems.sortOrder));
  } catch (error) {
    console.error("Could not load menu items:", error);
    return [];
  }
}

export default async function Home() {
  const menu = await getMenuItems();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <MenuSection items={menu} />
      <Gallery />
      <QualityManagement />
      <BookingForm />
      <Footer />
    </main>
  );
}
