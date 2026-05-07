export interface MomentumSignal {
  rank: number;
  ticker: string;
  company: string;
  sector: string;
  composite_score: number;
  price_momentum_score: number;
  earnings_momentum_score: number;
  quality_score: number;
  price_12m_return: number;
  current_price: number;
  market_cap: number;
  operating_margin: number | null;
  earnings_growth: number | null;
}

export interface MomentumData {
  screened_at: string;
  market_regime: "bull" | "bear" | "unknown";
  spy_price: number;
  spy_ma200: number;
  spy_12m_return: number;
  universe_count: number;
  passing_count: number;
  top_picks: MomentumSignal[];
  sector_breakdown: Record<string, number>;
}

export interface Holding {
  ticker: string;
  shares: number;
  avg_price: number;
  buy_date: string;
}

export interface Portfolio {
  updated_at: string;
  holdings: Holding[];
}
