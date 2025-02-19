import React from "react";
import { Card } from "./ui/card";

interface Node {
  id: string;
  label: string;
  status: "good" | "warning" | "critical";
  latency: number;
}

interface NetworkMapProps {
  nodes?: Node[];
}

const defaultNodes: Node[] = [
  { id: "1", label: "Local Gateway", status: "good", latency: 5 },
  { id: "2", label: "ISP Router", status: "warning", latency: 25 },
  { id: "3", label: "google.com", status: "good", latency: 45 },
  { id: "4", label: "github.com", status: "critical", latency: 145 },
];

export default function NetworkMap({ nodes = defaultNodes }: NetworkMapProps) {
  return (
    <div className="container mx-auto py-10">
      <Card className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6">Network Topology Map</h2>
        <div className="w-full h-[600px] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-8">
            {nodes.map((node, index) => (
              <div key={node.id} className="relative">
                {index > 0 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[2.5rem] w-0.5 h-8 bg-gray-300" />
                )}
                <div
                  className={`w-48 p-4 rounded-lg shadow-md text-center relative
                    ${
                      node.status === "good"
                        ? "bg-green-100 border-green-500"
                        : node.status === "warning"
                          ? "bg-yellow-100 border-yellow-500"
                          : "bg-red-100 border-red-500"
                    } border-2`}
                >
                  <div className="font-medium">{node.label}</div>
                  <div className="text-sm text-gray-600">{node.latency}ms</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
