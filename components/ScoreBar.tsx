export default function ScoreBar({ score }: { score: number }) {
  const color = score >= 75 ? "#34d399" : score >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: "#151528" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-xs w-7 text-right font-mono" style={{ color }}>{score.toFixed(0)}</span>
    </div>
  );
}
