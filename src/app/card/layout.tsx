import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KudaEmas Catering House — Digital Business Card",
  description:
    "KudaEmas Catering House · The Golden Standard of Malaysian Catering · Est. 2025",
};

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
