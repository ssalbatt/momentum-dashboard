interface Props {
  label: string;
  value: string;
  sub?: string;
  subColor?: "green" | "red" | "muted";
  accent?: string;
  children?: React.ReactNode;
}

export default function StatCard({ label, value, sub, subColor = "muted", accent, children }: Props) {
  const subStyle = {
    green: { color: "var(--green)" },
    red:   { color: "var(--red)"   },
    muted: { color: "#3a5060"      },
  }[subColor];

  return (
    <div
      className="rounded-2xl p-4 md:p-5 relative overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {accent && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />}
      <div className="text-xs uppercase tracking-wider mb-2" style={{ color: "#3a4a6a" }}>{label}</div>
      <div className="text-xl md:text-2xl font-bold text-white truncate">{value}</div>
      {sub && <div className="text-xs mt-1" style={subStyle}>{sub}</div>}
      {children}
    </div>
  );
}
