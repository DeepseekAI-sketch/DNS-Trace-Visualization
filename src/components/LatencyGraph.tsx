import React from "react";
import { Card } from "./ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface LatencyGraphProps {
  data?: {
    timestamps: string[];
    values: number[];
  };
  thresholds?: {
    warning: number;
    critical: number;
  };
}

const defaultData = {
  timestamps: Array.from({ length: 10 }, (_, i) =>
    new Date(Date.now() - (9 - i) * 60000).toISOString().substr(11, 8),
  ),
  values: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
};

const defaultThresholds = {
  warning: 50,
  critical: 80,
};

export default function LatencyGraph({
  data = defaultData,
  thresholds = defaultThresholds,
}: LatencyGraphProps) {
  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: "Latency",
        data: data.values,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Network Latency Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: (context: any) => {
            if (context.tick.value === thresholds.warning) {
              return "rgba(255, 205, 86, 0.5)";
            } else if (context.tick.value === thresholds.critical) {
              return "rgba(255, 99, 132, 0.5)";
            }
            return "rgba(0, 0, 0, 0.1)";
          },
        },
      },
    },
  };

  return (
    <Card className="w-full h-[400px] p-4 bg-white">
      <div className="w-full h-full">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
}
