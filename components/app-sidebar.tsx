"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, LayoutDashboard, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface App {
  id: string;
  name: string;
  identifier: string;
  appId: string;
  _count?: {
    logs: number;
  };
}

interface AppSidebarProps {
  apps: App[];
  selectedAppId: string | null;
  onSelectApp: (appId: string) => void;
  onCreateApp: () => void;
}

export function AppSidebar({
  apps,
  selectedAppId,
  onSelectApp,
  onCreateApp,
}: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256); // Default 64 * 4 = 256px
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const MIN_WIDTH = 200;
  const MAX_WIDTH = 500;
  const DEFAULT_WIDTH = 256;
  const COLLAPSED_WIDTH = 64;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleDoubleClick = () => {
    setSidebarWidth(DEFAULT_WIDTH);
  };

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "relative border-r bg-muted/10 transition-all",
        isResizing ? "select-none" : "duration-300"
      )}
      style={{ width: isCollapsed ? COLLAPSED_WIDTH : sidebarWidth }}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 z-10 h-8 w-8 rounded-full border bg-background shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="mb-4">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold mb-4">Your Apps</h2>
          )}
          <Button
            onClick={onCreateApp}
            className="w-full"
            size={isCollapsed ? "icon" : "default"}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Create App</span>}
          </Button>
        </div>

        {/* Apps List */}
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {apps.length === 0 ? (
              !isCollapsed && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No apps yet. Create your first app to get started!
                </p>
              )
            ) : (
              apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => onSelectApp(app.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg transition-colors",
                    "hover:bg-accent",
                    selectedAppId === app.id
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-background"
                  )}
                  title={isCollapsed ? app.name : undefined}
                >
                  <LayoutDashboard className="h-4 w-4 shrink-0" />
                  {!isCollapsed && (
                    <div className="flex-1 text-left overflow-hidden">
                      <div className="font-medium truncate">{app.name}</div>
                      <div className="text-xs opacity-70 truncate">
                        {app.identifier}
                      </div>
                      {app._count && (
                        <div className="text-xs opacity-70 mt-1">
                          {app._count.logs} logs
                        </div>
                      )}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-primary/50 transition-colors group",
            isResizing && "bg-primary"
          )}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          title="Drag to resize, double-click to reset"
        >
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
            <div className="bg-background border rounded-sm p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
