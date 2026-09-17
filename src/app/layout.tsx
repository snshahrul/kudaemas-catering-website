import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

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
  title: "KudaEmas Catering — The Golden Standard of Malaysian Catering",
  description:
    "Award-winning Malaysian catering house for weddings, corporate summits and private celebrations. Signature grand feasts, live stations and grand buffets across Malaysia since 2025.",
  keywords: [
    "catering",
    "Malaysian catering",
    "wedding catering",
    "buffet catering Malaysia",
    "corporate catering",
    "KudaEmas",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="grain bg-forest text-cream antialiased">{children}</body>
    </html>
  );
}
