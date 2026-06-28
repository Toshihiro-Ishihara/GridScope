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
        pointRadius: 2,
        pointHoverRadius: 7,
        tension: 0.35,
      },
      {
        label: "東京",
        data: tokyoPriceData,
        borderColor: "#ff6b6b",
        backgroundColor: "#ff6b6b",
        pointRadius: 2,
        pointHoverRadius: 6,
        borderWidth: 3,
        tension: 0.35,
      },
      {
        label: "関西",
        data: kansaiPriceData,
        borderColor: "#4dabf7",
        backgroundColor: "#4dabf7",
        pointRadius: 2,
        pointHoverRadius: 6,
        borderWidth: 3,
        tension: 0.35,
      },
      {
        label: "九州",
        data: kyushuPriceData,
        borderColor: "#69db7c",
        backgroundColor: "#69db7c",
        pointRadius: 2,
        pointHoverRadius: 6,
        borderWidth: 3,
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
            size: 13,
            weight: "bold",
          },
          padding: 14,
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
          font: { size: 11 },
          maxRotation: 55,
          minRotation: 55,
          autoSkip: true,
          maxTicksLimit: 12,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.22)",
        },
      },
      y: {
        title: {
          display: true,
          text: "円/kWh",
          color: "#ffffff",
          font: {
            size: 13,
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
          color: "rgba(255, 255, 255, 0.25)",
        },
      },
    },
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "20px",
        color: "#ffffff",
      }}
    >
      <h2 style={{ textAlign: "center" }}>📈 価格推移</h2>

      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PriceChart;