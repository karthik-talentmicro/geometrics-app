"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { Search, MapPin, Globe, Wifi, Clock, DollarSign, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the map component to avoid SSR issues with Leaflet
const LocationMap = lazy(() =>
  import("@/components/location-map").then(mod => ({ default: mod.LocationMap }))
);

interface DeviceInfo {
  deviceType: string;
  os: string;
  browser: string;
  browserVersion: string;
  userAgent: string;
}

interface IpLocationData {
  query: string;
  status: string;
  message?: string;
  continent?: string;
  continentCode?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  district?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  offset?: number;
  currency?: string;
  isp?: string;
  org?: string;
  as?: string;
  asname?: string;
  mobile?: boolean;
  proxy?: boolean;
  hosting?: boolean;
  deviceInfo?: DeviceInfo;
}

const DEFAULT_IP = "8.8.8.8"; // Google's public DNS

export function IpSearch() {
  const [ipAddress, setIpAddress] = useState(DEFAULT_IP);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IpLocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load default IP on mount
  useEffect(() => {
    handleSearch(DEFAULT_IP);
  }, []);

  const handleSearch = async (ip?: string) => {
    const searchIp = ip || ipAddress;

    if (!searchIp.trim()) {
      setError("Please enter an IP address");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/ip-lookup?ip=${encodeURIComponent(searchIp)}`);
      const result = await response.json();

      if (result.status === "success") {
        setData(result);
      } else {
        setError(result.message || "Failed to lookup IP address");
      }
    } catch (err) {
      setError("An error occurred while looking up the IP address");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleGetMyIP = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Fetch user's public IP
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const myIp = ipData.ip;

      setIpAddress(myIp);

      // Now lookup that IP
      const response = await fetch(`/api/ip-lookup?ip=${encodeURIComponent(myIp)}`);
      const result = await response.json();

      if (result.status === "success") {
        setData(result);
      } else {
        setError(result.message || "Failed to lookup IP address");
      }
    } catch (err) {
      setError("An error occurred while detecting your IP address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Bar */}
      <div className="flex gap-2 max-w-3xl mx-auto flex-wrap sm:flex-nowrap">
        <Input
          type="text"
          placeholder="Enter IP address (e.g., 8.8.8.8)"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 h-12 text-base min-w-0"
        />
        <Button onClick={() => handleSearch()} disabled={loading} size="lg" className="shrink-0">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button
          onClick={handleGetMyIP}
          disabled={loading}
          variant="outline"
          size="lg"
          className="shrink-0"
        >
          <Globe className="h-4 w-4 mr-2" />
          My IP
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
        </div>
      )}

      {/* Results */}
      {data && !loading && (
        <div className="space-y-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Information */}
            <Card className="border-2 h-[450px] flex flex-col">
              <CardContent className="space-y-1 pt-2.5 pb-2.5 px-4">
                {/* Location Section */}
                <div>
                  <h3 className="text-[11px] font-semibold flex items-center gap-1 text-primary uppercase tracking-wide mb-1">
                    <MapPin className="h-3 w-3" />
                    Location
                  </h3>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs">
                    <InfoItem label="Country" value={data.country} badge={data.countryCode} />
                    <InfoItem label="Region" value={data.regionName || data.region} />
                    <InfoItem label="City" value={data.city} />
                    {data.lat && data.lon && (
                      <InfoItem label="Coordinates" value={`${data.lat.toFixed(2)}, ${data.lon.toFixed(2)}`} />
                    )}
                  </div>
                </div>

                {/* Network Section */}
                <div className="pt-1 border-t">
                  <h3 className="text-[11px] font-semibold flex items-center gap-1 text-primary uppercase tracking-wide mb-1">
                    <Wifi className="h-3 w-3" />
                    Network
                  </h3>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs">
                    <InfoItem label="ISP" value={data.isp} />
                    <InfoItem label="Organization" value={data.org} />
                  </div>
                </div>

                {/* Time & Currency Section */}
                <div className="pt-1 border-t">
                  <h3 className="text-[11px] font-semibold flex items-center gap-1 text-primary uppercase tracking-wide mb-1">
                    <Clock className="h-3 w-3" />
                    Time & Currency
                  </h3>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs">
                    <InfoItem label="Timezone" value={data.timezone} />
                    <InfoItem
                      label="UTC Offset"
                      value={data.offset !== undefined
                        ? `UTC ${data.offset >= 0 ? "+" : ""}${(data.offset / 3600).toFixed(0)}`
                        : undefined
                      }
                    />
                    <InfoItem label="Currency" value={data.currency} />
                  </div>
                </div>

                {/* Device Information Section */}
                {data.deviceInfo && (
                  <div className="pt-1 border-t">
                    <h3 className="text-[11px] font-semibold flex items-center gap-1 text-primary uppercase tracking-wide mb-1">
                      {data.deviceInfo.deviceType === 'Mobile' || data.deviceInfo.deviceType === 'Tablet' ? (
                        <Smartphone className="h-3 w-3" />
                      ) : (
                        <Monitor className="h-3 w-3" />
                      )}
                      Device Info
                    </h3>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs">
                      <InfoItem label="Device" value={data.deviceInfo.deviceType} />
                      <InfoItem label="OS" value={data.deviceInfo.os} />
                      <InfoItem
                        label="Browser"
                        value={data.deviceInfo.browserVersion
                          ? `${data.deviceInfo.browser} ${data.deviceInfo.browserVersion.split('.')[0]}`
                          : data.deviceInfo.browser
                        }
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right Column - Map */}
            {data.lat && data.lon && (
              <Card className="border-2 overflow-hidden lg:sticky lg:top-4 h-[450px] flex flex-col">
                <CardContent className="p-0 flex-1">
                  <Suspense fallback={
                    <div className="h-full w-full flex items-center justify-center bg-muted">
                      <p className="text-sm text-muted-foreground">Loading map...</p>
                    </div>
                  }>
                    <LocationMap
                      lat={data.lat}
                      lon={data.lon}
                      city={data.city || undefined}
                      region={data.regionName || data.region || undefined}
                      country={data.country || undefined}
                    />
                  </Suspense>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for displaying info items
function InfoItem({
  label,
  value,
  badge,
  icon
}: {
  label: string;
  value?: string | null;
  badge?: string | null;
  icon?: React.ReactNode;
}) {
  if (!value && !badge) return null;

  return (
    <div>
      <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="text-sm font-medium truncate">
          {value || "N/A"}
          {badge && <span className="text-muted-foreground ml-1 text-xs">({badge})</span>}
        </p>
      </div>
    </div>
  );
}
