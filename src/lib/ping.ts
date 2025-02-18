export interface PingResult {
  ip: string;
  name: string;
  latency: number;
  status: "good" | "warning" | "critical";
}

function getStatus(latency: number): "good" | "warning" | "critical" {
  if (latency < 100) return "good";
  if (latency < 300) return "warning";
  return "critical";
}

export async function pingUrl(url: string): Promise<PingResult[]> {
  try {
    // Ensure URL has protocol
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    const results: PingResult[] = [];

    // First hop - local gateway simulation
    const gatewayLatency = Math.random() * 5; // Simulate 0-5ms local gateway latency
    results.push({
      ip: "192.168.1.1",
      name: "Local Gateway",
      latency: gatewayLatency,
      status: getStatus(gatewayLatency),
    });

    // Second hop - target URL
    const startTime = performance.now();
    try {
      await fetch(url, {
        mode: "no-cors", // Required for cross-origin requests
        cache: "no-cache",
      });
      const endTime = performance.now();
      const latency = endTime - startTime;

      results.push({
        ip: url,
        name: new URL(url).hostname,
        latency,
        status: getStatus(latency),
      });
    } catch (error) {
      // Even if fetch fails, we still got a latency measurement
      const endTime = performance.now();
      const latency = endTime - startTime;

      results.push({
        ip: url,
        name: url,
        latency,
        status: "critical",
      });
    }

    return results;
  } catch (error) {
    console.error("Ping failed:", error);
    return [];
  }
}
