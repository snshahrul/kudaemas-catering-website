import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { MenuSection } from "@/components/menu-section";
import { Gallery } from "@/components/gallery";
import { QualityManagement } from "@/components/quality-management";
import { BookingForm } from "@/components/booking-form";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Katering KudaEmas (003899142-V) — The Golden Standard of Malaysian Katering",
  description:
    "Award-winning Malaysian katering for weddings, corporate summits and private celebrations — grand buffets, live sate stations and full styling across Malaysia. Call +6011-3979 4166.",
};

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <MenuSection />
      <Gallery />
      <QualityManagement />
      <BookingForm />
      <Footer />
    </main>
  );
}
