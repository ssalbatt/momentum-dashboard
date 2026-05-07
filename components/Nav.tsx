"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/",          label: "Dashboard" },
  { href: "/screener",  label: "Screener"  },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/backtest",  label: "Backtest"  },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14"
      style={{
        background: "rgba(8,8,18,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(99,102,241,0.12)",
      }}
    >
      <div
        className="text-base font-extrabold tracking-tight"
        style={{
          background: "linear-gradient(135deg, #818cf8, #38bdf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        MomentumSys
      </div>

      <nav className="flex items-center gap-1">
        {links.map((l) => {
          const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-lg text-sm transition-all"
              style={
                active
                  ? {
                      background: "rgba(99,102,241,0.15)",
                      color: "#818cf8",
                      border: "1px solid rgba(99,102,241,0.2)",
                    }
                  : { color: "#4a5580" }
              }
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
