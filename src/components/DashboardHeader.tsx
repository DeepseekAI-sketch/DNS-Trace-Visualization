import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Settings, RefreshCw, Network, Loader2 } from "lucide-react";
import { Input } from "./ui/input";

interface DashboardHeaderProps {
  onAnalyze?: (url: string, shouldStart: boolean) => void;
  onIntervalChange?: (interval: string) => void;
  onFocusChange?: (focus: string) => void;
  onRefresh?: () => void;
  onSettings?: () => void;
  isAnalyzing?: boolean;
}

const DashboardHeader = ({
  onIntervalChange = () => {},
  onFocusChange = () => {},
  onRefresh = () => {},
  onSettings = () => {},
  onAnalyze = () => {},
  isAnalyzing = false,
}: DashboardHeaderProps) => {
  const [url, setUrl] = useState("");
  return (
    <header className="w-full h-16 bg-background border-b border-border px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Enter URL to analyze"
            className="w-[300px]"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <Button
            variant="default"
            onClick={() => onAnalyze(url, !isAnalyzing)}
            variant={isAnalyzing ? "destructive" : "default"}
          >
            {isAnalyzing ? (
              <>
                <Network className="h-4 w-4 mr-2" />
                Stop Analysis
              </>
            ) : (
              <>
                <Network className="h-4 w-4 mr-2" />
                Analyze
              </>
            )}
          </Button>
        </div>
        <h1 className="text-xl font-semibold">Network Diagnostics</h1>

        <div className="flex items-center space-x-2">
          <Select defaultValue="30s" onValueChange={onIntervalChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Trace Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10s">10 seconds</SelectItem>
              <SelectItem value="30s">30 seconds</SelectItem>
              <SelectItem value="1m">1 minute</SelectItem>
              <SelectItem value="5m">5 minutes</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="1h" onValueChange={onFocusChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Focus Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="6h">Last 6 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onSettings}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
