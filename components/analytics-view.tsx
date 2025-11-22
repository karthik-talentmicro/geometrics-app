"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Activity, Users, Globe } from "lucide-react";

interface Log {
  id: string;
  systemFingerprint: string;
  ipAddress: string | null;
  userAgent: string | null;
  deviceInfo: any;
  metadata: any;
  createdAt: string;
}

interface App {
  id: string;
  name: string;
  identifier: string;
  appId: string;
  logs: Log[];
  _count: {
    logs: number;
  };
}

interface AnalyticsViewProps {
  app: App;
}

export function AnalyticsView({ app }: AnalyticsViewProps) {
  const [copiedAppId, setCopiedAppId] = useState(false);
  const [copiedIdentifier, setCopiedIdentifier] = useState(false);

  const copyToClipboard = async (text: string, type: "appId" | "identifier") => {
    await navigator.clipboard.writeText(text);
    if (type === "appId") {
      setCopiedAppId(true);
      setTimeout(() => setCopiedAppId(false), 2000);
    } else {
      setCopiedIdentifier(true);
      setTimeout(() => setCopiedIdentifier(false), 2000);
    }
  };

  // Calculate analytics
  const totalLogs = app._count.logs;
  const uniqueDevices = new Set(app.logs.map((log) => log.deviceInfo?.device)).size;
  const uniqueCountries = new Set(
    app.logs.map((log) => log.ipAddress).filter(Boolean)
  ).size;

  // Group logs by device type
  const deviceStats = app.logs.reduce((acc: Record<string, number>, log) => {
    const device = log.deviceInfo?.device || "Unknown";
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {});

  // Group logs by browser
  const browserStats = app.logs.reduce((acc: Record<string, number>, log) => {
    const browser = log.deviceInfo?.browser || "Unknown";
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {});

  // Group logs by OS
  const osStats = app.logs.reduce((acc: Record<string, number>, log) => {
    const os = log.deviceInfo?.os || "Unknown";
    acc[os] = (acc[os] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* App Info Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{app.name}</h1>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">App ID:</span>
            <code className="text-sm bg-muted px-2 py-1 rounded">
              {app.appId}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(app.appId, "appId")}
            >
              {copiedAppId ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Identifier:</span>
            <code className="text-sm bg-muted px-2 py-1 rounded">
              {app.identifier}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(app.identifier, "identifier")}
            >
              {copiedIdentifier ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogs}</div>
            <p className="text-xs text-muted-foreground">
              Unique system visits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Device Types</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueDevices}</div>
            <p className="text-xs text-muted-foreground">
              Different device types
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IP Addresses</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCountries}</div>
            <p className="text-xs text-muted-foreground">
              Unique IP addresses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Device, Browser, OS Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Device Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(deviceStats).map(([device, count]) => (
                <div key={device} className="flex justify-between items-center">
                  <span className="text-sm">{device}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Browsers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(browserStats).slice(0, 5).map(([browser, count]) => (
                <div key={browser} className="flex justify-between items-center">
                  <span className="text-sm truncate">{browser}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Operating Systems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(osStats).slice(0, 5).map(([os, count]) => (
                <div key={os} className="flex justify-between items-center">
                  <span className="text-sm truncate">{os}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Logs</CardTitle>
          <CardDescription>
            Latest {Math.min(app.logs.length, 10)} system visits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {app.logs.slice(0, 10).map((log) => (
              <div
                key={log.id}
                className="flex flex-col space-y-2 p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {log.deviceInfo?.device || "Unknown"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {log.ipAddress || "No IP"}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">
                        {log.deviceInfo?.browser || "Unknown Browser"}
                      </span>
                      {" on "}
                      <span className="font-medium">
                        {log.deviceInfo?.os || "Unknown OS"}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <div className="text-xs">
                    <span className="text-muted-foreground">Metadata: </span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {JSON.stringify(log.metadata)}
                    </code>
                  </div>
                )}
              </div>
            ))}
            {app.logs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No logs yet. Integrate the analytics SDK to start tracking.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Integration Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Guide</CardTitle>
          <CardDescription>
            How to integrate analytics tracking in your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">1. Send tracking request</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Send a POST request to the tracking endpoint with your App ID and
                a unique system fingerprint:
              </p>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                {`fetch('${typeof window !== "undefined" ? window.location.origin : ""}/api/track', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    appId: '${app.appId}',
    fingerprint: 'unique-system-fingerprint',
    metadata: {
      // Optional custom data
    }
  })
});`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Generate fingerprint</h4>
              <p className="text-sm text-muted-foreground">
                Use a fingerprinting library or create a unique identifier based on
                system properties to ensure only one log per system.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
