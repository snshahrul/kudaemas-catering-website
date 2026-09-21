import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { MenuSection } from "@/components/menu-section";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { QualityManagement } from "@/components/quality-management";
import { BookingForm } from "@/components/booking-form";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

let dbWarned = false;

// Testimonials are optional content: if the database is unreachable, render
// the section empty instead of throwing. Log at warn level (once) so the dev
// overlay doesn't raise an issue on every request.
function warnDbDown(error: unknown) {
  if (dbWarned) return;
  dbWarned = true;
  const msg = error instanceof Error ? error.message : String(error);
  console.warn(`[kudaemas] database unreachable — testimonials will be empty: ${msg}`);
}

async function getTestimonials() {
  try {
    return await db.select().from(testimonials);
  } catch (error) {
    warnDbDown(error);
    return [];
  }
}

export default async function Home() {
  const quotes = await getTestimonials();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <MenuSection />
      <Gallery />
      <Testimonials quotes={quotes} />
      <QualityManagement />
      <BookingForm />
      <Footer />
    </main>
  );
}
