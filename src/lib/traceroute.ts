export interface TraceHop {
  ip: string;
  name: string;
  latency: number;
  packetLoss: number;
  status: "good" | "warning" | "critical";
}

export interface TracerouteResult {
  hops: TraceHop[];
  totalTime: number;
  packetLoss: number;
}

function getHopStatus(
  latency: number,
  packetLoss: number,
): "good" | "warning" | "critical" {
  if (packetLoss > 3) return "critical";
  if (latency > 300 || packetLoss > 1) return "warning";
  return "good";
}

async function measureLatency(url: string): Promise<number> {
  const measurements: number[] = [];
  const numPings = 3; // Number of pings to average

  for (let i = 0; i < numPings; i++) {
    const start = performance.now();
    try {
      await fetch(url, { mode: "no-cors", cache: "no-cache" });
    } catch (e) {
      // Even if fetch fails, we still got a latency measurement
    }
    measurements.push(performance.now() - start);
  }

  // Calculate average latency
  const avgLatency =
    measurements.reduce((a, b) => a + b, 0) / measurements.length;
  return Math.round(avgLatency); // Round to nearest millisecond
}

async function getHostInfo(url: string) {
  try {
    const hostname = new URL(url).hostname;
    const response = await fetch(`https://dns.google/resolve?name=${hostname}`);
    const data = await response.json();
    return {
      ip: data.Answer?.[0]?.data || hostname,
      name: hostname,
    };
  } catch (e) {
    return { ip: url, name: url };
  }
}

export async function performTraceroute(
  url: string,
): Promise<TracerouteResult> {
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    const hostInfo = await getHostInfo(url);
    const latency = await measureLatency(url);

    const hops: TraceHop[] = [
      {
        ip: hostInfo.ip,
        name: hostInfo.name,
        latency,
        packetLoss: 0,
        status: getHopStatus(latency, 0),
      },
    ];

    return {
      hops,
      totalTime: latency,
      packetLoss: 0,
    };
  } catch (error) {
    console.error("Traceroute failed:", error);
    return {
      hops: [],
      totalTime: 0,
      packetLoss: 100,
    };
  }
}
