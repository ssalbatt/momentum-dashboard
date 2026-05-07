import { getMomentumData, fmt, fmtCap, fmtDate } from "@/lib/data";
import { MomentumSignal } from "@/lib/types";
import ScoreBar from "@/components/ScoreBar";

function SectorBar({ name, count, max }: { name: string; count: number; max: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs w-28 truncate" style={{ color: "#8090b0" }}>{name}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: "#151528" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${(count / max) * 100}%`, background: "linear-gradient(90deg,#818cf8,#38bdf8)" }}
        />
      </div>
      <span className="text-xs w-4 text-right font-mono" style={{ color: "#4a5580" }}>{count}</span>
    </div>
  );
}

export default function ScreenerPage() {
  const data = getMomentumData();

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-white mb-2">데이터 없음</p>
        <p className="text-sm" style={{ color: "#3a4a6a" }}>
          python scripts/momentum_screener.py 실행 후 data/ 폴더에 결과를 넣어주세요.
        </p>
      </div>
    );
  }

  const isBull = data.market_regime === "bull";
  const maxSector = Math.max(...Object.values(data.sector_breakdown));

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* 헤더 */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Screener</h1>
          <p className="text-sm" style={{ color: "#3a4a6a" }}>
            가격모멘텀 40% + 실적모멘텀 35% + 품질 25% &nbsp;·&nbsp; 업데이트: {fmtDate(data.screened_at)}
          </p>
        </div>
        <span
          className="text-xs px-3 py-1.5 rounded-full font-semibold"
          style={
            isBull
              ? { background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }
              : { background: "rgba(239,68,68,0.1)",  color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)"  }
          }
        >
          {isBull ? "● BULL - 매수 가능" : "● BEAR - 매수 중단"}
        </span>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* 종목 테이블 */}
        <div
          className="md:col-span-3 rounded-2xl overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
                  {["#", "종목", "섹터", "현재가", "시총", "12M 수익", "실적성장", "영업이익률", "종합점수"].map((h) => (
                    <th key={h} className="px-3 py-3 text-left text-xs uppercase tracking-wider whitespace-nowrap" style={{ color: "#3a4a6a" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.top_picks.map((s: MomentumSignal) => (
                  <tr
                    key={s.ticker}
                    className="tr-hover"
                    style={{ borderBottom: "1px solid rgba(99,102,241,0.05)" }}
                  >
                    <td className="px-3 py-3" style={{ color: "#3a4a6a" }}>{s.rank}</td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-white">{s.ticker}</div>
                      <div className="text-xs max-w-[130px] truncate" style={{ color: "#4a5580" }}>{s.company}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}>
                        {s.sector.split(" ")[0]}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-white font-mono text-xs">${s.current_price.toFixed(2)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "#6070a0" }}>{fmtCap(s.market_cap)}</td>
                    <td className="px-3 py-3 font-semibold" style={{ color: s.price_12m_return >= 0 ? "#34d399" : "#ef4444" }}>
                      {fmt(s.price_12m_return)}
                    </td>
                    <td className="px-3 py-3" style={{ color: "#8090b0" }}>
                      {s.earnings_growth != null ? fmt(s.earnings_growth) : <span style={{ color: "#2a3050" }}>-</span>}
                    </td>
                    <td className="px-3 py-3" style={{ color: "#8090b0" }}>
                      {s.operating_margin != null ? fmt(s.operating_margin) : <span style={{ color: "#2a3050" }}>-</span>}
                    </td>
                    <td className="px-3 py-3 w-28">
                      <ScoreBar score={s.composite_score} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 섹터 분포 + 팩터 설명 */}
        <div className="space-y-4">
          <div
            className="rounded-2xl p-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="text-sm font-semibold text-white mb-4">섹터 분포</div>
            <div className="space-y-3">
              {Object.entries(data.sector_breakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([sector, count]) => (
                  <SectorBar key={sector} name={sector} count={count} max={maxSector} />
                ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-4 text-xs space-y-3"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="text-sm font-semibold text-white mb-1">팩터 가중치</div>
            {[
              { label: "가격 모멘텀", pct: "40%", desc: "12-1개월 수익률 순위" },
              { label: "실적 모멘텀", pct: "35%", desc: "EPS 성장률 순위" },
              { label: "품질 점수",   pct: "25%", desc: "영업이익률 순위" },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex justify-between mb-1">
                  <span style={{ color: "#8090b0" }}>{f.label}</span>
                  <span style={{ color: "#818cf8" }}>{f.pct}</span>
                </div>
                <div className="text-xs" style={{ color: "#3a4a6a" }}>{f.desc}</div>
              </div>
            ))}

            <div className="pt-2" style={{ borderTop: "1px solid rgba(99,102,241,0.1)", color: "#3a4a6a" }}>
              <div className="font-semibold text-white mb-1.5 text-xs">품질 필터 기준</div>
              <div>시총 ≥ $1B</div>
              <div>영업이익률 &gt; 0%</div>
              <div>부채비율 ≤ 150%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
