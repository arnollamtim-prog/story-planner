import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Story Planner",
  description: "YouTube & Shorts Content Planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
