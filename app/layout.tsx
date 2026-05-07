import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "MomentumSys",
  description: "US 멀티팩터 모멘텀 투자 시스템",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full" style={{ background: "var(--bg)" }}>
        <Nav />
        <main className="pt-14">{children}</main>
      </body>
    </html>
  );
}
