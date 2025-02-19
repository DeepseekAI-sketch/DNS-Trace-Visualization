import React, { useState, useCallback } from "react";
import type { AnalysisHistory } from "@/lib/types";
import { performTraceroute, type TracerouteResult } from "@/lib/traceroute";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import NetworkGrid from "./NetworkGrid";
import LatencyGraph from "./LatencyGraph";

const Home = () => {
  const [traceResults, setTraceResults] = useState<TracerouteResult | null>(
    null,
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [interval, setInterval] = useState(30000); // Default 30s
  const [latencyData, setLatencyData] = useState({
    timestamps: [] as string[],
    values: [] as number[],
  });
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistory[]>([]);

  const handleIntervalChange = (value: string) => {
    const ms = value.endsWith("s")
      ? parseInt(value) * 1000
      : parseInt(value) * 60 * 1000; // For minutes
    setInterval(ms);
  };

  const handleAnalyze = useCallback(
    async (url: string, shouldStart: boolean) => {
      if (!url) return;

      if (!shouldStart) {
        setIsAnalyzing(false);
        return;
      }

      setCurrentUrl(url);
      setIsAnalyzing(true);

      const results = await performTraceroute(url);
      setTraceResults(results);

      // Add to history
      const historyEntry: AnalysisHistory = {
        id: crypto.randomUUID(),
        url,
        timestamp: new Date().toISOString(),
        latency: results.totalTime,
        status: results.hops[0]?.status || "critical",
      };
      setAnalysisHistory((prev) => [...prev, historyEntry]);

      // Update latency graph
      const now = new Date().toISOString().substr(11, 8);
      setLatencyData((prev) => ({
        timestamps: [...prev.timestamps, now].slice(-10),
        values: [...prev.values, results.totalTime || 0].slice(-10),
      }));
    },
    [],
  );

  // Effect for continuous tracing
  React.useEffect(() => {
    let timeoutId: number;

    const doTrace = async () => {
      if (!isAnalyzing || !currentUrl) return;

      const results = await performTraceroute(currentUrl);
      setTraceResults(results);

      const now = new Date().toISOString().substr(11, 8);
      setLatencyData((prev) => ({
        timestamps: [...prev.timestamps, now].slice(-10),
        values: [...prev.values, results.totalTime || 0].slice(-10),
      }));

      timeoutId = window.setTimeout(doTrace, interval);
    };

    if (isAnalyzing) {
      doTrace();
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isAnalyzing, currentUrl, interval]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        className="flex-shrink-0"
        history={analysisHistory}
        onHistoryItemClick={(item) => {
          handleAnalyze(item.url, true);
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          onIntervalChange={handleIntervalChange}
          onRefresh={() => {
            if (currentUrl) handleAnalyze(currentUrl, true);
          }}
        />

        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid gap-6">
            <NetworkGrid
              hops={
                traceResults?.hops.map((hop, index) => ({
                  id: index,
                  count: index + 1,
                  ip: hop.ip,
                  name: hop.name,
                  avgLatency: Math.round(hop.latency),
                  minLatency: Math.round(hop.latency * 0.9),
                  currentLatency: Math.round(hop.latency),
                  packetLoss: hop.packetLoss,
                  status: hop.status,
                })) || []
              }
            />
            <LatencyGraph data={latencyData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
