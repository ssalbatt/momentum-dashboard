import { getMomentumData, getPortfolio, fmt, fmtDate } from "@/lib/data";
import { Holding } from "@/lib/types";

function empty() {
  return (
    <div
      className="rounded-2xl p-8 text-center"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="text-3xl mb-4">📁</div>
      <p className="text-white font-semibold mb-2">보유 종목 없음</p>
      <p className="text-sm mb-6" style={{ color: "#3a4a6a" }}>
        data/portfolio.json 파일을 생성하면 보유 종목과 리밸런싱 신호가 표시됩니다.
      </p>
      <code
        className="block text-xs px-4 py-3 rounded-lg text-left"
        style={{ background: "#080812", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
      >
        {`// data/portfolio.json 예시
{
  "updated_at": "2026-05-07T00:00:00",
  "holdings": [
    {
      "ticker": "NVDA",
      "shares": 10,
      "avg_price": 880.0,
      "buy_date": "2026-04-01"
    }
  ]
}`}
      </code>
    </div>
  );
}

export default function PortfolioPage() {
  const data   = getMomentumData();
  const port   = getPortfolio();

  const topTickers = new Set((data?.top_picks ?? []).map((s) => s.ticker));

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Portfolio</h1>
        <p className="text-sm" style={{ color: "#3a4a6a" }}>
          보유 종목 현황 · 월별 리밸런싱 신호
          {port && <span> · 업데이트: {fmtDate(port.updated_at)}</span>}
        </p>
      </div>

      {!port ? (
        empty()
      ) : (
        <div className="space-y-5">
          {/* 보유 종목 */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="font-semibold text-white">보유 종목</span>
              <span className="text-xs ml-3" style={{ color: "#3a4a6a" }}>{port.holdings.length}종목</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
                  {["티커", "수량", "평균단가", "매수일", "모멘텀 TOP25"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider" style={{ color: "#3a4a6a" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {port.holdings.map((h: Holding) => {
                  const inTop = topTickers.has(h.ticker);
                  return (
                    <tr key={h.ticker} className="tr-hover" style={{ borderBottom: "1px solid rgba(99,102,241,0.05)" }}>
                      <td className="px-4 py-3 font-semibold text-white">{h.ticker}</td>
                      <td className="px-4 py-3" style={{ color: "#8090b0" }}>{h.shares}주</td>
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "#8090b0" }}>${h.avg_price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "#4a5580" }}>{h.buy_date}</td>
                      <td className="px-4 py-3">
                        {inTop ? (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.12)", color: "#34d399" }}>
                            ● 유지
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
                            ● 매도 검토
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 리밸런싱 신호 */}
          {data && (
            <div
              className="rounded-2xl p-5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="font-semibold text-white mb-4">이번 달 리밸런싱 신호</div>
              <div className="grid md:grid-cols-2 gap-4">
                {/* 매도 후보 */}
                <div>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: "#ef4444" }}>
                    매도 검토 (TOP25 이탈)
                  </div>
                  {port.holdings.filter((h) => !topTickers.has(h.ticker)).length === 0 ? (
                    <p className="text-xs" style={{ color: "#3a4a6a" }}>해당 없음 - 모든 보유 종목이 TOP25 내</p>
                  ) : (
                    <div className="space-y-2">
                      {port.holdings
                        .filter((h) => !topTickers.has(h.ticker))
                        .map((h) => (
                          <div
                            key={h.ticker}
                            className="flex items-center justify-between px-3 py-2 rounded-lg"
                            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}
                          >
                            <span className="font-semibold text-white">{h.ticker}</span>
                            <span className="text-xs" style={{ color: "#ef4444" }}>TOP25 이탈 → 매도</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* 신규 매수 후보 */}
                <div>
                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: "#34d399" }}>
                    신규 매수 후보 (TOP5 중 미보유)
                  </div>
                  {data.top_picks.slice(0, 5).filter((s) =>
                    !port.holdings.some((h) => h.ticker === s.ticker)
                  ).length === 0 ? (
                    <p className="text-xs" style={{ color: "#3a4a6a" }}>해당 없음 - TOP5 모두 보유 중</p>
                  ) : (
                    <div className="space-y-2">
                      {data.top_picks
                        .slice(0, 5)
                        .filter((s) => !port.holdings.some((h) => h.ticker === s.ticker))
                        .map((s) => (
                          <div
                            key={s.ticker}
                            className="flex items-center justify-between px-3 py-2 rounded-lg"
                            style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)" }}
                          >
                            <div>
                              <span className="font-semibold text-white">{s.ticker}</span>
                              <span className="text-xs ml-2" style={{ color: "#4a5580" }}>{s.company.split(" ")[0]}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-semibold" style={{ color: "#34d399" }}>
                                {fmt(s.price_12m_return)}
                              </div>
                              <div className="text-xs" style={{ color: "#3a4a6a" }}>순위 #{s.rank}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                className="mt-4 pt-4 text-xs"
                style={{ borderTop: "1px solid rgba(99,102,241,0.1)", color: "#3a4a6a" }}
              >
                리밸런싱 기준: 매월 첫 거래일 &nbsp;·&nbsp; 종목당 4-5% 동일 비중 &nbsp;·&nbsp; 손절 -15%
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
