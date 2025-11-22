"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Globe, Wifi, Clock, DollarSign, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <div className="w-full space-y-8">
      {/* Search Bar */}
      <div className="flex gap-3 max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Enter IP address (e.g., 8.8.8.8)"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 h-12 text-base"
        />
        <Button onClick={() => handleSearch()} disabled={loading} size="lg">
          <Search className="h-4 w-4 mr-2" />
          {loading ? "Searching..." : "Search"}
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
        <div className="space-y-4">
          {/* Header with IP and Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">{data.query}</CardTitle>
                  <CardDescription className="mt-2">
                    {data.city && data.regionName && data.country
                      ? `${data.city}, ${data.regionName}, ${data.country}`
                      : data.country || "Location information"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {data.mobile && <Badge variant="secondary">Mobile</Badge>}
                  {data.proxy && <Badge variant="secondary">Proxy</Badge>}
                  {data.hosting && <Badge variant="secondary">Hosting</Badge>}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Geographic Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Continent</p>
                    <p className="font-medium">
                      {data.continent || "N/A"} {data.continentCode && `(${data.continentCode})`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium">
                      {data.country || "N/A"} {data.countryCode && `(${data.countryCode})`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Region / State</p>
                    <p className="font-medium">
                      {data.regionName || data.region || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">City</p>
                    <p className="font-medium">{data.city || "N/A"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Postal Code</p>
                    <p className="font-medium">{data.zip || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Latitude</p>
                    <p className="font-medium">{data.lat?.toFixed(4) || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Longitude</p>
                    <p className="font-medium">{data.lon?.toFixed(4) || "N/A"}</p>
                  </div>
                  {data.lat && data.lon && (
                    <div>
                      <a
                        href={`https://www.google.com/maps?q=${data.lat},${data.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Network Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      ISP (Internet Service Provider)
                    </p>
                    <p className="font-medium">{data.isp || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Organization</p>
                    <p className="font-medium">{data.org || "N/A"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">AS Number</p>
                    <p className="font-medium">{data.as || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AS Name</p>
                    <p className="font-medium">{data.asname || "N/A"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time & Currency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time & Currency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Timezone</p>
                    <p className="font-medium">{data.timezone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">UTC Offset</p>
                    <p className="font-medium">
                      {data.offset !== undefined
                        ? `UTC ${data.offset >= 0 ? "+" : ""}${(data.offset / 3600).toFixed(0)}`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Currency
                    </p>
                    <p className="font-medium">{data.currency || "N/A"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
