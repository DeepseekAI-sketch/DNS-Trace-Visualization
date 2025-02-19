import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import NetworkGrid from "./NetworkGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";

interface NetworkMonitorProps {
  onIntervalChange?: (interval: number) => void;
}

export default function NetworkMonitor({
  onIntervalChange,
}: NetworkMonitorProps) {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [interval, setInterval] = useState(30); // Default 30 seconds
  const [hops, setHops] = useState([]);

  // Simulate network monitoring
  useEffect(() => {
    let timeoutId: number;

    const updateHops = () => {
      // Simulate new hop data
      const newHops = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        count: i + 1,
        ip: [
          `192.168.1.1`,
          `10.0.0.1`,
          `172.16.0.1`,
          `208.67.222.222`,
          `142.250.72.100`,
        ][i],
        name: [
          `Local Gateway`,
          `ISP Router`,
          `Regional Router`,
          `DNS Server`,
          `Target Server`,
        ][i],
        avgLatency: Math.random() * 100 + i * 50,
        minLatency: Math.random() * 50 + i * 25,
        currentLatency: Math.random() * 150 + i * 50,
        packetLoss: Math.random() * 5,
        status:
          Math.random() > 0.7
            ? "critical"
            : Math.random() > 0.4
              ? "warning"
              : "good",
      }));

      setHops(newHops);

      if (isMonitoring) {
        timeoutId = window.setTimeout(updateHops, interval * 1000);
      }
    };

    if (isMonitoring) {
      updateHops();
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isMonitoring, interval]);

  const handleIntervalChange = (value: string) => {
    const seconds = parseInt(value);
    setInterval(seconds);
    if (onIntervalChange) onIntervalChange(seconds);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select
              value={interval.toString()}
              onValueChange={handleIntervalChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Every 10 seconds</SelectItem>
                <SelectItem value="30">Every 30 seconds</SelectItem>
                <SelectItem value="60">Every 1 minute</SelectItem>
                <SelectItem value="180">Every 3 minutes</SelectItem>
                <SelectItem value="300">Every 5 minutes</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={isMonitoring ? "destructive" : "default"}
              onClick={() => setIsMonitoring(!isMonitoring)}
            >
              {isMonitoring ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Monitoring
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Monitoring
                </>
              )}
            </Button>
          </div>
          {isMonitoring && (
            <div className="text-sm text-muted-foreground">
              Next update in {interval} seconds
            </div>
          )}
        </div>
      </Card>
      <NetworkGrid hops={hops} />
    </div>
  );
}
