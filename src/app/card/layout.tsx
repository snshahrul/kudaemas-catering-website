import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KudaEmas Katering House — Digital Business Card",
  description:
    "KudaEmas Katering House · The Golden Standard of Malaysian Catering · Est. 2025",
};

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
