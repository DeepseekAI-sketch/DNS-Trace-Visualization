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
import type { AnalysisHistory } from "@/lib/types";

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
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    {
      icon: Activity,
      label: "History",
      href: "/history",
      badge: history.length > 0 ? history.length.toString() : undefined,
    },
    { icon: Network, label: "Network Map", href: "/network-map" },
    { icon: BarChart, label: "Analytics", href: "/analytics" },
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
              {!collapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              )}
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
