import React from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import type { AnalysisHistory } from "@/lib/types";

interface PingHistoryProps {
  history?: AnalysisHistory[];
}

const defaultHistory: AnalysisHistory[] = [
  {
    id: "1",
    url: "google.com",
    timestamp: new Date().toISOString(),
    latency: 45,
    status: "good",
  },
  {
    id: "2",
    url: "github.com",
    timestamp: new Date(Date.now() - 5000).toISOString(),
    latency: 145,
    status: "warning",
  },
  {
    id: "3",
    url: "example.com",
    timestamp: new Date(Date.now() - 10000).toISOString(),
    latency: 345,
    status: "critical",
  },
];

export default function PingHistory({
  history = defaultHistory,
}: PingHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6">Ping History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Latency (ms)</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.url}</TableCell>
                <TableCell>
                  {new Date(item.timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {Math.round(item.latency)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={`${getStatusColor(item.status)} text-white`}
                    variant="secondary"
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
