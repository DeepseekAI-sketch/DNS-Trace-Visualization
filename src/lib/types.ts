export interface AnalysisHistory {
  id: string;
  url: string;
  timestamp: string;
  latency: number;
  status: "good" | "warning" | "critical";
}
