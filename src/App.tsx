import { useEffect, useState } from "react";

import "./App.css";

import AiInsightCard from "./components/AiInsightCard";
import PriceCard from "./components/PriceCard";
import PriceChart from "./components/PriceChart";
import MarketAlertCard from "./components/MarketAlertCard";
import AreaPriceTable from "./components/AreaPriceTable";
import MarketNewsCard from "./components/MarketNewsCard";

import { fetchJepxPrice, fetchMarketNews } from "./services/jepxService";

type AreaPrice = {
  name: string;
  price: number;
};

type MarketNews = {
  title: string;
  link: string;
  publishedAt?: string;
  source: string;
};

function formatSlotTime(slot: string) {
  const slotNumber = Number(slot);
  if (!slotNumber || slotNumber < 1 || slotNumber > 48) return "";

  const startMinutes = (slotNumber - 1) * 30;
  const endMinutes = slotNumber * 30;

  const format = (minutes: number) => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    if (hour === 24) return "24:00";
    return `${hour}:${minute.toString().padStart(2, "0")}`;
  };

  return `${format(startMinutes)}〜${format(endMinutes)}`;
}

function App() {
  const [systemPrice, setSystemPrice] = useState(0);
  const [tokyoPrice, setTokyoPrice] = useState(0);
  const [kansaiPrice, setKansaiPrice] = useState(0);
  const [kyushuPrice, setKyushuPrice] = useState(0);

  const [marketDate, setMarketDate] = useState("");
  const [marketSlot, setMarketSlot] = useState("");

  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [systemPriceData, setSystemPriceData] = useState<number[]>([]);
  const [tokyoPriceData, setTokyoPriceData] = useState<number[]>([]);
  const [kansaiPriceData, setKansaiPriceData] = useState<number[]>([]);
  const [kyushuPriceData, setKyushuPriceData] = useState<number[]>([]);
  const [areaPrices, setAreaPrices] = useState<AreaPrice[]>([]);
  const [marketNews, setMarketNews] = useState<MarketNews[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const price = await fetchJepxPrice();

        setSystemPrice(price.systemPrice);
        setTokyoPrice(price.tokyoPrice);
        setKansaiPrice(price.kansaiPrice);
        setKyushuPrice(price.kyushuPrice);

        setMarketDate(price.date);
        setMarketSlot(price.slot);

        setChartLabels(price.labels);
        setSystemPriceData(price.systemPriceData);
        setTokyoPriceData(price.tokyoPriceData);
        setKansaiPriceData(price.kansaiPriceData);
        setKyushuPriceData(price.kyushuPriceData);
        setAreaPrices(price.areaPrices);

        try {
  const newsResponse = await fetchMarketNews();
  setMarketNews(newsResponse.news || []);
} catch (newsError) {
  console.error("ニュース取得に失敗しました", newsError);
  setMarketNews([]);
}
      } catch (err) {
        setError("データ取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return <div className="status-screen">⚡ データ取得中...</div>;
  }

  if (error) {
    return <div className="status-screen">❌ {error}</div>;
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>⚡ GridScope</h1>
        <p className="english-title">JEPX Spot Market Dashboard</p>
        <p className="subtitle">今日の電力市場が3分で分かる。</p>
      </header>

      <div className="date-row">
        対象日：{marketDate} {formatSlotTime(marketSlot)}
      </div>

      <section className="top-cards">
        <PriceCard
          systemPrice={systemPrice}
          tokyoPrice={tokyoPrice}
          kansaiPrice={kansaiPrice}
          kyushuPrice={kyushuPrice}
        />

        <AiInsightCard
          systemPrice={systemPrice}
          tokyoPrice={tokyoPrice}
          kansaiPrice={kansaiPrice}
          kyushuPrice={kyushuPrice}
        />
      </section>

      <MarketAlertCard
        systemPriceData={systemPriceData}
        tokyoPriceData={tokyoPriceData}
        kansaiPriceData={kansaiPriceData}
        kyushuPriceData={kyushuPriceData}
      />

      <AreaPriceTable areaPrices={areaPrices} />

      <MarketNewsCard news={marketNews} />

      <PriceChart
        labels={chartLabels}
        systemPriceData={systemPriceData}
        tokyoPriceData={tokyoPriceData}
        kansaiPriceData={kansaiPriceData}
        kyushuPriceData={kyushuPriceData}
      />
    </main>
  );
}

export default App;