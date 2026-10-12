import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { CalculatorProvider } from "@/components/calculator-context";
import AssistantWidget from "@/components/AssistantWidget";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Katering KudaEmas (003899142-V) — The Golden Standard of Malaysian Katering",
  description:
    "Award-winning Malaysian katering for weddings, corporate summits and private celebrations. Signature grand feasts, live stations and grand buffets across Malaysia since 2025.",
  keywords: [
    "katering",
    "Malaysian katering",
    "wedding katering",
    "buffet katering Malaysia",
    "corporate katering",
    "KudaEmas",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="grain bg-forest text-cream antialiased">
        <LanguageProvider>
          <CalculatorProvider>
            {children}
            <WhatsAppButton />
            <AssistantWidget />
          </CalculatorProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
