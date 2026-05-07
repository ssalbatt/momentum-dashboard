import StatCard from "@/components/StatCard";

const periods = [
  {
    label: "2023 ~ 2026 (AI 강세장)",
    portfolio: { ret: "+20.02%", annualized: "+20.0%/yr", mdd: "N/A" },
    spy:       { ret: "+94.86%", annualized: "+22.0%/yr" },
    regime:    "bull",
    note:      "SPY 우위 +2.0%p. 강세장에서 현금 20%+ETF40% 구조가 드래그로 작용.",
  },
  {
    label: "2020 ~ 2023 (코로나 반등 + 강세)",
    portfolio: { ret: "N/A", annualized: "+9.52%/yr", mdd: "N/A" },
    spy:       { ret: "+56.84%", annualized: "+12.0%/yr" },
    regime:    "bull",
    note:      "SPY 우위 +2.5%p. 강세장 연속으로 패시브 전략이 우위.",
  },
  {
    label: "2022 ~ 2024 (급락 + 회복)",
    portfolio: { ret: "N/A", annualized: "+11.74%/yr", mdd: "N/A" },
    spy:       { ret: "+31.91%", annualized: "+9.7%/yr" },
    regime:    "mixed",
    note:      "포트폴리오 우위 +2.0%p. 하락장 방어 구조가 효과 발휘.",
  },
];

const findings = [
  "혼합 포트폴리오(ETF40+현금20+개별주40)는 하락장+회복 구간에서만 SPY를 앞섬",
  "강세장에서는 현금 20% 드래그로 인해 구조적으로 SPY에 뒤처짐",
  "터틀 트레이딩은 상품선물용 전략 - 무레버리지 주식 적용 시 수익률 제한",
  "승률 33-39%는 정상 범위: 소수 대형 승리로 전체 기대값 플러스 유지",
  "US 시장이 KR보다 추세 지속성 높음 - 터틀/모멘텀 모두 US 적합",
];

export default function BacktestPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Backtest</h1>
        <p className="text-sm" style={{ color: "#3a4a6a" }}>
          터틀 전략 + 혼합 포트폴리오 구조 (ETF 40% + 현금 20% + 개별주 40%) 백테스트 결과
        </p>
      </div>

      {/* 전략 사양 */}
      <div
        className="rounded-2xl p-5 mb-6 grid md:grid-cols-2 gap-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div>
          <div className="text-sm font-semibold text-white mb-3">전략 사양</div>
          <div className="space-y-2 text-xs" style={{ color: "#6070a0" }}>
            {[
              ["유니버스",    "S&P500 + NASDAQ100 (~500종목)"],
              ["진입 조건",   "6/6 점수 + 필수조건 1·2 (MA 정배열 + 돌파)"],
              ["포지션 크기", "ATR 유닛 (포트폴리오 1% / ATR)"],
              ["손절",       "진입가 - 2N (ATR × 2)"],
              ["추적 스탑",  "1N 수익 후 max_high - 3N"],
              ["피라미딩",   "0.5N 상승 시 최대 2회"],
              ["생존 편향",  "-10% 헤어컷 적용"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="w-24 shrink-0" style={{ color: "#3a4a6a" }}>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-white mb-3">KR 단독 백테스트 (2023~2026)</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["초기 자본",   "5,000만원"],
              ["최종 자산",   "6,930만원"],
              ["누적 수익률", "+17.84%"],
              ["연환산",     "+5.1%/yr"],
              ["MDD",        "-31.81%"],
              ["승률",       "33.9%"],
              ["손익비",     "1.96"],
              ["진입 수",    "112건"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg p-2.5" style={{ background: "#080812", border: "1px solid rgba(99,102,241,0.08)" }}>
                <div className="text-xs mb-0.5" style={{ color: "#3a4a6a" }}>{k}</div>
                <div className="text-sm font-semibold text-white">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 기간별 결과 */}
      <div className="space-y-4 mb-8">
        <div className="text-sm font-semibold text-white">US 혼합 포트폴리오 - 기간별 결과</div>
        {periods.map((p) => (
          <div
            key={p.label}
            className="rounded-2xl p-5"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <div className="font-semibold text-white text-sm">{p.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "#3a4a6a" }}>{p.note}</div>
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-full"
                style={
                  p.regime === "bull"
                    ? { background: "rgba(52,211,153,0.1)", color: "#34d399" }
                    : { background: "rgba(245,158,11,0.1)", color: "#f59e0b" }
                }
              >
                {p.regime === "bull" ? "강세장" : "변동성"}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="포트폴리오 연환산" value={p.portfolio.annualized} accent="linear-gradient(90deg,#818cf8,#38bdf8)" />
              <StatCard label="SPY 연환산" value={p.spy.annualized} accent="linear-gradient(90deg,#34d399,#38bdf8)" />
              <StatCard label="SPY 누적" value={p.spy.ret} accent="linear-gradient(90deg,#f59e0b,#ef4444)" />
              <StatCard
                label="초과수익"
                value={
                  p.label.includes("2022") ? "+2.0%p" :
                  p.label.includes("2020") ? "-2.5%p" : "-2.0%p"
                }
                subColor={p.label.includes("2022") ? "green" : "red"}
                sub={p.label.includes("2022") ? "포트폴리오 우위" : "SPY 우위"}
                accent={p.label.includes("2022")
                  ? "linear-gradient(90deg,#34d399,#818cf8)"
                  : "linear-gradient(90deg,#ef4444,#818cf8)"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 핵심 발견 */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="text-sm font-semibold text-white mb-4">핵심 발견 및 결론</div>
        <ul className="space-y-2.5">
          {findings.map((f, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>
                {i + 1}
              </span>
              <span style={{ color: "#8090b0" }}>{f}</span>
            </li>
          ))}
        </ul>
        <div
          className="mt-5 pt-4 text-sm"
          style={{ borderTop: "1px solid rgba(99,102,241,0.1)", color: "#4a5580" }}
        >
          <span className="font-semibold text-white">결론: </span>
          현재 인프라를 유지하되, 터틀 전략에서 <span style={{ color: "#818cf8" }}>멀티팩터 모멘텀</span> 방식으로 전략을 전환하는 방향이 합리적.
          Screener 페이지에서 매월 상위 종목을 확인하고, Portfolio 페이지에서 리밸런싱 신호를 관리.
        </div>
      </div>
    </div>
  );
}
