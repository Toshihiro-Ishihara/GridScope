import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type PriceChartProps = {
  labels: string[];
  systemPriceData: number[];
  tokyoPriceData: number[];
  kansaiPriceData: number[];
  kyushuPriceData: number[];
};

function PriceChart({
  labels,
  systemPriceData,
  tokyoPriceData,
  kansaiPriceData,
  kyushuPriceData,
}: PriceChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "システム",
        data: systemPriceData,
        borderColor: "#ffffff",
        backgroundColor: "#ffffff",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#ffffff",
        borderWidth: 4,
        pointRadius: 0,
        pointHoverRadius: 6,
        tension: 0.35,
      },
      {
        label: "東京",
        data: tokyoPriceData,
        borderColor: "#ff5c66",
        backgroundColor: "#ff5c66",
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 4,
        tension: 0.35,
      },
      {
        label: "関西",
        data: kansaiPriceData,
        borderColor: "#4dabf7",
        backgroundColor: "#4dabf7",
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 4,
        tension: 0.35,
      },
      {
        label: "九州",
        data: kyushuPriceData,
        borderColor: "#69db7c",
        backgroundColor: "#69db7c",
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 4,
        tension: 0.35,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          color: "#ffffff",
          font: {
            size: 15,
            weight: "bold",
          },
          padding: 18,
          boxWidth: 42,
          boxHeight: 4,
        },
      },
      tooltip: {
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
            weight: "bold",
          },
          autoSkip: true,
          maxTicksLimit: 12,
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "rgba(255,255,255,0.22)",
        },
      },
      y: {
        title: {
          display: true,
          text: "円/kWh",
          color: "#ffffff",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(255,255,255,0.25)",
        },
      },
    },
  };

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.45)",
        borderRadius: "12px",
        padding: "18px",
        marginTop: "20px",
        background: "rgba(255,255,255,0.03)",
        color: "#ffffff",
      }}
    >
      <h2 style={{ textAlign: "left", marginTop: 0 }}>
        📈 価格推移
      </h2>

      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PriceChart;