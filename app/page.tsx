import Link from "next/link";
import { getMomentumData, fmt, fmtDate } from "@/lib/data";
import StatCard from "@/components/StatCard";
import ScoreBar from "@/components/ScoreBar";

export default function HomePage() {
  const data = getMomentumData();

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-6">📊</div>
        <h1 className="text-2xl font-bold text-white mb-3">MomentumSys</h1>
        <p className="mb-2" style={{ color: "#4a5580" }}>스크리너를 아직 실행하지 않았습니다.</p>
        <p className="text-sm mb-8" style={{ color: "#3a4a6a" }}>
          첫 실행은 약 30-60분 소요됩니다 (500+ 종목 데이터 다운로드).
        </p>
        <code
          className="block text-sm px-5 py-4 rounded-xl text-left"
          style={{ background: "#0d0d1e", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          cd C:/Users/laser/Desktop/trade-dashboard<br />
          python scripts/momentum_screener.py
        </code>
        <p className="text-xs mt-4" style={{ color: "#2a3050" }}>
          실행 후 data/momentum_latest.json을 이 프로젝트의 data/ 폴더에 복사하거나<br />
          screener의 OUTPUT_FILE 경로를 이 프로젝트로 변경하세요.
        </p>
      </div>
    );
  }

  const isBull = data.market_regime === "bull";
  const top5 = data.top_picks.slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <span
            className="text-xs px-3 py-1 rounded-full font-semibold"
            style={
              isBull
                ? { background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }
                : { background: "rgba(239,68,68,0.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }
            }
          >
            {isBull ? "● BULL MARKET" : "● BEAR MARKET"}
          </span>
        </div>
        <p className="text-sm" style={{ color: "#3a4a6a" }}>
          마지막 스크리닝: {fmtDate(data.screened_at)} &nbsp;·&nbsp; 유니버스 {data.universe_count}종목 중 {data.passing_count}종목 통과
        </p>
      </div>

      {/* 마켓 레짐 배너 */}
      <div
        className="rounded-2xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4"
        style={{
          background: isBull ? "rgba(52,211,153,0.04)" : "rgba(239,68,68,0.04)",
          border: `1px solid ${isBull ? "rgba(52,211,153,0.15)" : "rgba(239,68,68,0.15)"}`,
        }}
      >
        <div>
          <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "#3a4a6a" }}>Market Regime</div>
          <div className="text-2xl font-bold" style={{ color: isBull ? "#34d399" : "#ef4444" }}>
            {isBull ? "신규 매수 가능" : "신규 매수 중단"}
          </div>
          <div className="text-sm mt-1" style={{ color: "#4a5580" }}>
            SPY ${data.spy_price} &nbsp;/&nbsp; MA200 ${data.spy_ma200} &nbsp;
            ({isBull ? "+" : ""}{((data.spy_price / data.spy_ma200 - 1) * 100).toFixed(1)}%)
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "#3a4a6a" }}>SPY 12M Return</div>
          <div
            className="text-3xl font-bold"
            style={{ color: data.spy_12m_return >= 0 ? "#34d399" : "#ef4444" }}
          >
            {fmt(data.spy_12m_return)}
          </div>
          <div className="text-xs mt-1" style={{ color: "#3a4a6a" }}>벤치마크</div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard
          label="유니버스"
          value={`${data.universe_count}`}
          sub="S&P500 + NASDAQ100"
          accent="linear-gradient(90deg, #818cf8, #38bdf8)"
        />
        <StatCard
          label="품질 필터 통과"
          value={`${data.passing_count}`}
          sub={`통과율 ${((data.passing_count / data.universe_count) * 100).toFixed(0)}%`}
          accent="linear-gradient(90deg, #34d399, #38bdf8)"
        />
        <StatCard
          label="선정 종목"
          value={`TOP ${data.top_picks.length}`}
          sub="동일 비중 · 월 리밸런싱"
          accent="linear-gradient(90deg, #818cf8, #f59e0b)"
        />
        <StatCard
          label="SPY vs MA200"
          value={`${isBull ? "위" : "아래"}`}
          sub={isBull ? "매수 신호 활성" : "매수 신호 중단"}
          subColor={isBull ? "green" : "red"}
          accent={isBull ? "linear-gradient(90deg, #34d399, #818cf8)" : "linear-gradient(90deg, #ef4444, #818cf8)"}
        />
      </div>

      {/* TOP 5 미리보기 */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <span className="font-semibold text-white">TOP 5 모멘텀 종목</span>
          <Link
            href="/screener"
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{ color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            전체 보기 →
          </Link>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(99,102,241,0.06)" }}>
              {["#", "종목", "섹터", "12M 수익", "실적성장", "종합점수"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider" style={{ color: "#3a4a6a" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {top5.map((s) => (
              <tr key={s.ticker} className="tr-hover" style={{ borderBottom: "1px solid rgba(99,102,241,0.05)" }}>
                <td className="px-4 py-3 text-sm" style={{ color: "#3a4a6a" }}>{s.rank}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-white text-sm">{s.ticker}</div>
                  <div className="text-xs truncate max-w-[140px]" style={{ color: "#4a5580" }}>{s.company}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}>
                    {s.sector.split(" ")[0]}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-sm" style={{ color: s.price_12m_return >= 0 ? "#34d399" : "#ef4444" }}>
                  {fmt(s.price_12m_return)}
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: "#8090b0" }}>
                  {s.earnings_growth != null ? fmt(s.earnings_growth) : <span style={{ color: "#2a3050" }}>-</span>}
                </td>
                <td className="px-4 py-3 w-32">
                  <ScoreBar score={s.composite_score} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 리스크 규칙 요약 */}
      <div
        className="rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        {[
          { label: "포지션 크기", value: "4-5%", sub: "종목당 최대" },
          { label: "섹터 상한", value: "30%", sub: "단일 섹터 최대" },
          { label: "손절선", value: "-15%", sub: "종목당" },
          { label: "리밸런싱", value: "월 1회", sub: "매월 첫 거래일" },
        ].map((r) => (
          <div key={r.label}>
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "#3a4a6a" }}>{r.label}</div>
            <div className="text-lg font-bold text-white">{r.value}</div>
            <div className="text-xs" style={{ color: "#3a4a6a" }}>{r.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
