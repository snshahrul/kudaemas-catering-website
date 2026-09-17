import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KudaEmas Katering — Digital Business Card",
  description:
    "KudaEmas Katering · The Golden Standard of Malaysian Katering · Est. 2025",
};

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
