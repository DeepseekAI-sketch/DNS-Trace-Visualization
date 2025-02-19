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
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface AnalyticsProps {
  data?: {
    urls: string[];
    avgLatencies: number[];
    successRates: number[];
    timestamps: string[];
    trendData: number[];
  };
}

const defaultData = {
  urls: ["google.com", "github.com", "example.com"],
  avgLatencies: [45, 145, 345],
  successRates: [98, 85, 65],
  timestamps: Array.from({ length: 10 }, (_, i) =>
    new Date(Date.now() - (9 - i) * 60000).toISOString().substr(11, 8),
  ),
  trendData: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
};

export default function Analytics({ data = defaultData }: AnalyticsProps) {
  const trendChartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: "Average Latency Trend",
        data: data.trendData,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const latencyChartData = {
    labels: data.urls,
    datasets: [
      {
        label: "Average Latency (ms)",
        data: data.avgLatencies,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
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
    },
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        <Card className="p-6 bg-white">
          <h2 className="text-2xl font-bold mb-6">Latency Trend</h2>
          <div className="h-[300px]">
            <Line data={trendChartData} options={options} />
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-2">Average Latency</h3>
            <div className="text-3xl font-bold text-green-600">
              {Math.round(
                data.avgLatencies.reduce((a, b) => a + b, 0) /
                  data.avgLatencies.length,
              )}
              ms
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-2">Success Rate</h3>
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(
                data.successRates.reduce((a, b) => a + b, 0) /
                  data.successRates.length,
              )}
              %
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-2">Total Pings</h3>
            <div className="text-3xl font-bold text-purple-600">
              {data.urls.length * 10}
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-white">
          <h2 className="text-2xl font-bold mb-6">Latency by URL</h2>
          <div className="h-[300px]">
            <Line
              data={latencyChartData}
              options={{
                ...options,
                indexAxis: "y" as const,
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
