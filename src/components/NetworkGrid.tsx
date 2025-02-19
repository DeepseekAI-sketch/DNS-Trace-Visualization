import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface NetworkHop {
  id: number;
  count: number;
  ip: string;
  name: string;
  avgLatency: number;
  minLatency: number;
  currentLatency: number;
  packetLoss: number;
  status: "good" | "warning" | "critical";
}

interface NetworkGridProps {
  hops?: NetworkHop[];
}

const defaultHops: NetworkHop[] = [
  {
    id: 1,
    count: 1,
    ip: "192.168.1.1",
    name: "Local Gateway",
    avgLatency: 5.2,
    minLatency: 2.1,
    currentLatency: 4.8,
    packetLoss: 0,
    status: "good",
  },
  {
    id: 2,
    count: 2,
    ip: "10.0.0.1",
    name: "ISP Router",
    avgLatency: 15.7,
    minLatency: 8.3,
    currentLatency: 22.1,
    packetLoss: 1.2,
    status: "warning",
  },
  {
    id: 3,
    count: 3,
    ip: "172.16.0.1",
    name: "Regional Router",
    avgLatency: 45.2,
    minLatency: 25.6,
    currentLatency: 89.4,
    packetLoss: 0.5,
    status: "good",
  },
  {
    id: 4,
    count: 4,
    ip: "208.67.222.222",
    name: "DNS Server",
    avgLatency: 95.8,
    minLatency: 55.3,
    currentLatency: 102.4,
    packetLoss: 2.1,
    status: "warning",
  },
  {
    id: 5,
    count: 5,
    ip: "142.250.72.100",
    name: "Target Server",
    avgLatency: 145.2,
    minLatency: 85.6,
    currentLatency: 189.4,
    packetLoss: 4.5,
    status: "critical",
  },
];

const NetworkGrid = ({ hops = defaultHops }: NetworkGridProps) => {
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
    <Card className="p-6 bg-white w-full h-[400px] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Hop Count</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Avg Latency (ms)</TableHead>
            <TableHead className="text-right">Min Latency (ms)</TableHead>
            <TableHead className="text-right">Current Latency (ms)</TableHead>
            <TableHead className="text-right">Packet Loss (%)</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hops.map((hop) => (
            <TableRow key={hop.id}>
              <TableCell className="font-medium">{hop.count}</TableCell>
              <TableCell>{hop.ip}</TableCell>
              <TableCell>{hop.name}</TableCell>
              <TableCell className="text-right">
                {Math.round(hop.avgLatency)}
              </TableCell>
              <TableCell className="text-right">
                {Math.round(hop.minLatency)}
              </TableCell>
              <TableCell className="text-right">
                {Math.round(hop.currentLatency)}
              </TableCell>
              <TableCell className="text-right">
                {hop.packetLoss?.toFixed(1) || "0.0"}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={`${getStatusColor(hop.status)} text-white`}
                  variant="secondary"
                >
                  {hop.status.charAt(0).toUpperCase() + hop.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default NetworkGrid;
