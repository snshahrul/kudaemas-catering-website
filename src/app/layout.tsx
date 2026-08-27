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
  title: "KudaEmas Catering — The Golden Standard of Nusantara Catering",
  description:
    "Award-winning Indonesian catering house for weddings, corporate summits and private celebrations. Rijsttafel, live stations and grand buffets across the archipelago since 1998.",
  keywords: [
    "catering",
    "Indonesian catering",
    "wedding catering",
    "rijsttafel",
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
