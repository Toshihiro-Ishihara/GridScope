import { useEffect, useState } from "react";

import AiInsightCard from "./components/AiInsightCard";
import PriceCard from "./components/PriceCard";
import PriceChart from "./components/PriceChart";
import MarketAlertCard from "./components/MarketAlertCard";
import AreaPriceTable from "./components/AreaPriceTable";

import { fetchJepxPrice } from "./services/jepxService";

type AreaPrice = {
  name: string;
  price: number;
};

function formatSlotTime(slot: string) {
  const slotNumber = Number(slot);

  if (!slotNumber || slotNumber < 1 || slotNumber > 48) {
    return "";
  }

  const startMinutes = (slotNumber - 1) * 30;
  const endMinutes = slotNumber * 30;

  const format = (minutes: number) => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    if (hour === 24) {
      return "24:00";
    }

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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPrice() {
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
      } catch (err) {
        setError("JEPXデータ取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    }

    loadPrice();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "200px",
          fontSize: "32px",
          color: "#ffffff",
        }}
      >
        ⚡ データ取得中...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "200px",
          fontSize: "32px",
          color: "#ffffff",
        }}
      >
        ❌ {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        fontFamily: "Arial",
        color: "#ffffff",
      }}
    >
      <h1>⚡ GridScope</h1>

      <p
        style={{
          color: "#ffffff",
          fontSize: "20px",
          marginBottom: "4px",
        }}
      >
        JEPX Spot Market Dashboard
      </p>

      <p
        style={{
          color: "#ffffff",
        }}
      >
        今日の電力市場が3分で分かる。
      </p>

      <hr />

      <div
        style={{
          textAlign: "right",
          color: "#ffffff",
          marginTop: "10px",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        対象日：{marketDate} {formatSlotTime(marketSlot)}
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
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
      </div>

      <MarketAlertCard
        systemPriceData={systemPriceData}
        tokyoPriceData={tokyoPriceData}
        kansaiPriceData={kansaiPriceData}
        kyushuPriceData={kyushuPriceData}
      />

      <AreaPriceTable areaPrices={areaPrices} />

      <PriceChart
        labels={chartLabels}
        systemPriceData={systemPriceData}
        tokyoPriceData={tokyoPriceData}
        kansaiPriceData={kansaiPriceData}
        kyushuPriceData={kyushuPriceData}
      />
    </div>
  );
}

export default App;