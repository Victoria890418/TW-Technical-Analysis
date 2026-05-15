import { useState } from "react";
import { TrendingUp } from "lucide-react";

export default function App() {
  const [stock, setStock] = useState("2330");

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-400 text-slate-950 p-3 rounded-2xl">
            <TrendingUp />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Stock Agent</h1>
            <p className="text-slate-400">TW Technical Analysis Platform</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">AI 台股技術分析</h2>
            <div className="flex gap-3 mb-6">
              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="輸入股票代號"
                className="flex-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-3 text-white"
              />
              <button className="bg-emerald-400 text-slate-950 px-6 rounded-2xl font-semibold">
                AI 解盤
              </button>
            </div>

            <div className="h-80 rounded-3xl border border-dashed border-slate-700 flex items-center justify-center text-slate-400 bg-slate-950">
              {stock} TradingView / K-Line Chart
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">AI 分析結果</h3>
            <div className="space-y-4 text-slate-300 leading-7">
              <p>• MA20 與 MA60 呈現多頭排列</p>
              <p>• RSI 位於 68，動能偏強</p>
              <p>• 上方壓力區約 1080</p>
              <p>• 下方支撐區約 1000</p>
              <p>• 短線趨勢偏多觀察</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-8">
          {[
            "Portfolio 投資組合",
            "Watchlist 追蹤清單",
            "AI 報告收藏"
          ].map((item) => (
            <div key={item} className="bg-slate-900 rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3">{item}</h3>
              <p className="text-slate-400">即將串接 Supabase / Firebase 儲存會員資料。</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
