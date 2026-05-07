import fs from "fs";
import path from "path";
import { MomentumData, Portfolio } from "./types";

export function getMomentumData(): MomentumData | null {
  const p = path.join(process.cwd(), "data", "momentum_latest.json");
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p, "utf-8")); } catch { return null; }
}

export function getPortfolio(): Portfolio | null {
  const p = path.join(process.cwd(), "data", "portfolio.json");
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p, "utf-8")); } catch { return null; }
}

export function fmt(n: number, digits = 1) {
  return (n >= 0 ? "+" : "") + (n * 100).toFixed(digits) + "%";
}

export function fmtCap(n: number) {
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(1) + "T";
  if (n >= 1e9)  return "$" + (n / 1e9).toFixed(1) + "B";
  return "$" + (n / 1e6).toFixed(0) + "M";
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}
