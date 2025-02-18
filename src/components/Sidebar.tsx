import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  Network,
  Activity,
  BarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisHistory {
  id: string;
  url: string;
  timestamp: string;
  latency: number;
  status: "good" | "warning" | "critical";
}

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
  history?: AnalysisHistory[];
  onHistoryItemClick?: (item: AnalysisHistory) => void;
}

const Sidebar = ({
  className = "",
  isCollapsed = false,
  onToggle = () => {},
  history = [],
  onHistoryItemClick = () => {},
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  const handleToggle = () => {
    setCollapsed(!collapsed);
    onToggle();
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "#" },
    { icon: Network, label: "Network Map", href: "#" },
    { icon: Activity, label: "Monitoring", href: "#" },
    { icon: BarChart, label: "Analytics", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-[918px] bg-background border-r transition-all duration-300",
        collapsed ? "w-16" : "w-[280px]",
        className,
      )}
    >
      <div className="flex items-center justify-end p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {!collapsed && history.length > 0 && (
          <div className="p-4 border-b">
            <h3 className="font-semibold mb-2">Analysis History</h3>
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onHistoryItemClick(item)}
                  className="p-2 rounded-lg hover:bg-accent cursor-pointer text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.url}</span>
                    <Badge
                      className={cn(
                        "ml-2",
                        item.status === "good" && "bg-green-500",
                        item.status === "warning" && "bg-yellow-500",
                        item.status === "critical" && "bg-red-500",
                      )}
                      variant="secondary"
                    >
                      {Math.round(item.latency)}ms
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <nav className="p-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors",
                "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed ? "justify-center" : "px-3",
          )}
        >
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=network"
              alt="User avatar"
              className="w-6 h-6"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">Network Admin</span>
              <span className="text-xs text-muted-foreground">
                admin@example.com
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
