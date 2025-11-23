"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { Search, MapPin, Globe, Wifi, Clock, DollarSign, Monitor, Smartphone, Shield, Network, Info, Map, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface ASN {
  asn: string;
  name: string;
  domain: string;
  route: string;
  type: string;
}

interface Company {
  name: string;
  domain: string;
  network: string;
  type: string;
}

interface Carrier {
  name: string;
  mcc: string;
  mnc: string;
}

interface Currency {
  name: string;
  code: string;
  symbol: string;
  native: string;
  plural: string;
}

interface TimeZone {
  name: string;
  abbr: string;
  offset: number;
  is_dst: boolean;
  current_time: string;
}

interface Threat {
  is_tor: boolean;
  is_vpn: boolean;
  is_icloud_relay: boolean;
  is_proxy: boolean;
  is_datacenter: boolean;
  is_anonymous: boolean;
  is_known_attacker: boolean;
  is_known_abuser: boolean;
  is_threat: boolean;
  is_bogon: boolean;
  blocklists: string[];
  scores: {
    vpn_score: number;
    proxy_score: number;
    threat_score: number;
    trust_score: number;
    abuse_score: number;
  };
}

interface IpLocationData {
  ip: string;
  status: string;
  message?: string;
  is_eu?: boolean;
  city?: string;
  region?: string;
  region_code?: string;
  region_type?: string;
  region_name?: string;
  country_name?: string;
  country_code?: string;
  continent_name?: string;
  continent_code?: string;
  latitude?: number;
  longitude?: number;
  postal?: string;
  calling_code?: string;
  flag?: string;
  emoji_flag?: string;
  emoji_unicode?: string;
  asn?: ASN;
  company?: Company;
  carrier?: Carrier;
  languages?: string[];
  currency?: Currency;
  time_zone?: TimeZone;
  threat?: Threat;
  isp?: string;
  org?: string;
  mobile?: boolean;
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
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Marketing Material (50%) */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Privacy-First Analytics + Localization
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Privacy-first analytics + localization management in one platform. Discover where your users are, manage translations, and automatically serve the right content—all from a single SDK.
          </p>
        </div>

        {/* Right Column - Search and Results (50%) */}
        <Card className="overflow-hidden">
          <CardContent className="p-4 space-y-3">
            {/* Search Bar */}
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Input
                type="text"
                placeholder="Enter IP address (e.g., 8.8.8.8)"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 h-10 text-sm min-w-0"
              />
              <Button onClick={() => handleSearch()} disabled={loading} className="shrink-0 h-10">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button
                onClick={handleGetMyIP}
                disabled={loading}
                variant="outline"
                className="shrink-0 h-10"
              >
                <Globe className="h-4 w-4 mr-2" />
                My IP
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
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
              <div className="space-y-3">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-3">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger value="location" className="flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      <span className="hidden sm:inline">Location</span>
                    </TabsTrigger>
                    <TabsTrigger value="network" className="flex items-center gap-2">
                      <Network className="h-4 w-4" />
                      <span className="hidden sm:inline">Network</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="hidden sm:inline">Security</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Left Column - Quick Info Card */}
                <Card className="lg:h-[400px]">
                  <CardContent className="pt-4 space-y-3">
                    {/* Location */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        Location
                      </div>
                      <div className="pl-4 space-y-0.5">
                        <p className="text-xs font-bold flex items-center gap-1.5">
                          {data.emoji_flag && <span className="text-xs">{data.emoji_flag}</span>}
                          {data.country_name || "Unknown"}
                        </p>
                        {data.city && (
                          <p className="text-xs font-medium">
                            {data.city}{(data.region_name || data.region) && `, ${data.region_name || data.region}`}
                          </p>
                        )}
                        {data.continent_name && (
                          <p className="text-xs text-muted-foreground">
                            {data.continent_name}
                          </p>
                        )}
                        {data.latitude !== undefined && data.longitude !== undefined && (
                          <p className="text-xs text-muted-foreground">
                            📍 {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
                          </p>
                        )}
                        {data.time_zone?.current_time && (
                          <p className="text-xs text-muted-foreground">
                            🕒 {new Date(data.time_zone.current_time).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Network - Compact */}
                    <div className="space-y-1 pt-2 border-t">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                        <Wifi className="h-3 w-3" />
                        Network
                      </div>
                      <div className="pl-4">
                        <p className="text-xs text-muted-foreground">ISP: <span className="text-foreground font-medium">{data.isp || "Unknown"}</span></p>
                        <p className="text-xs text-muted-foreground">ASN: <span className="text-foreground font-medium">{data.asn?.asn || "Unknown"}</span></p>
                      </div>
                    </div>

                    {/* Currency & Language */}
                    {(data.currency || data.languages) && (
                      <div className="space-y-1 pt-2 border-t">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          Regional
                        </div>
                        <div className="pl-4 space-y-0.5">
                          {data.currency && (
                            <p className="text-xs text-muted-foreground">
                              Currency: <span className="text-foreground font-medium">{data.currency.code} ({data.currency.symbol})</span>
                            </p>
                          )}
                          {data.languages && data.languages.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Languages: <span className="text-foreground font-medium">{data.languages.slice(0, 3).join(", ")}{data.languages.length > 3 ? ` +${data.languages.length - 3}` : ""}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Security Status */}
                    <div className="space-y-1 pt-2 border-t">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                        <Shield className="h-3 w-3" />
                        Security
                      </div>
                      <div className="pl-4 space-y-1.5">
                        <div className="flex flex-wrap gap-1">
                          {data.threat?.is_vpn && <Badge variant="secondary" className="text-xs py-0 h-5">VPN</Badge>}
                          {data.threat?.is_proxy && <Badge variant="secondary" className="text-xs py-0 h-5">Proxy</Badge>}
                          {data.threat?.is_tor && <Badge variant="secondary" className="text-xs py-0 h-5">Tor</Badge>}
                          {data.threat?.is_datacenter && <Badge variant="secondary" className="text-xs py-0 h-5">Datacenter</Badge>}
                          {data.hosting && <Badge variant="secondary" className="text-xs py-0 h-5">Hosting</Badge>}
                          {!data.threat?.is_vpn && !data.threat?.is_proxy && !data.threat?.is_tor && !data.threat?.is_datacenter && (
                            <Badge variant="default" className="text-xs py-0 h-5">Residential</Badge>
                          )}
                        </div>
                        {data.threat?.scores && (
                          <p className="text-xs text-muted-foreground">
                            Trust Score: <span className="text-foreground font-bold text-xs">{data.threat.scores.trust_score}%</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Right Column - Map */}
                {data.latitude !== undefined && data.longitude !== undefined && (
                  <Card className="overflow-hidden lg:h-[400px]">
                    <CardContent className="p-0 h-full">
                      <Suspense fallback={
                        <div className="h-full w-full flex items-center justify-center bg-muted">
                          <p className="text-sm text-muted-foreground">Loading map...</p>
                        </div>
                      }>
                        <LocationMap
                          lat={data.latitude}
                          lon={data.longitude}
                          city={data.city || undefined}
                          region={data.region_name || data.region || undefined}
                          country={data.country_name || undefined}
                        />
                      </Suspense>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Left Column - Location Details */}
                <Card className="lg:h-[400px] overflow-auto">
                  <CardContent className="pt-4 space-y-3">
                    {/* Flag Display */}
                    {(data.flag || data.emoji_flag) && (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        {data.emoji_flag && (
                          <span className="text-xs">{data.emoji_flag}</span>
                        )}
                        <div className="flex-1">
                          <p className="text-xs font-bold">{data.country_name}</p>
                          <p className="text-xs text-muted-foreground">{data.country_code}</p>
                        </div>
                        {data.flag && (
                          <img src={data.flag} alt={data.country_name || "Flag"} className="w-12 h-auto rounded shadow-sm" />
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <InfoItem label="Country" value={data.country_name} badge={data.country_code} />
                      <InfoItem label="Continent" value={data.continent_name} badge={data.continent_code} />
                      <InfoItem label="Region" value={data.region_name || data.region} badge={data.region_code} />
                      <InfoItem label="Region Type" value={data.region_type} />
                      <InfoItem label="City" value={data.city} />
                      <InfoItem label="Postal Code" value={data.postal} />
                      <InfoItem label="EU Member" value={data.is_eu !== undefined ? (data.is_eu ? "Yes" : "No") : undefined} />
                      <InfoItem label="Calling Code" value={data.calling_code ? `+${data.calling_code}` : undefined} />
                      {data.latitude !== undefined && (
                        <InfoItem label="Latitude" value={data.latitude.toFixed(6)} />
                      )}
                      {data.longitude !== undefined && (
                        <InfoItem label="Longitude" value={data.longitude.toFixed(6)} />
                      )}
                    </div>

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                      <div className="space-y-2 pt-3 border-t">
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <Globe className="h-3.5 w-3.5" />
                          Languages ({data.languages.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {data.languages.map((lang, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Right Column - Currency, Time Zone, and Languages Combined */}
                <Card className="lg:h-[400px] overflow-auto">
                  <CardContent className="pt-4 space-y-4">
                    {/* Currency Information */}
                    {data.currency && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <DollarSign className="h-3.5 w-3.5" />
                          Currency
                        </div>
                        <div className="pl-5">
                          <p className="text-xs font-bold">{data.currency.symbol || "$"} {data.currency.code || "N/A"}</p>
                          <p className="text-xs text-muted-foreground">{data.currency.name || "N/A"}</p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <InfoItem label="Native Symbol" value={data.currency.native || "N/A"} />
                            <InfoItem label="Plural Form" value={data.currency.plural || "N/A"} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Time Zone Information */}
                    {data.time_zone && (
                      <div className="space-y-2 pt-3 border-t">
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          Time Zone
                        </div>
                        <div className="pl-5">
                          <div className="grid grid-cols-2 gap-2">
                            <InfoItem label="Name" value={data.time_zone.name || "N/A"} />
                            <InfoItem label="Abbreviation" value={data.time_zone.abbr || "N/A"} />
                            <InfoItem
                              label="UTC Offset"
                              value={data.time_zone.offset !== undefined
                                ? `UTC ${data.time_zone.offset >= 0 ? "+" : ""}${data.time_zone.offset / 3600}`
                                : "N/A"
                              }
                            />
                            <InfoItem label="Daylight Saving" value={data.time_zone.is_dst !== undefined ? (data.time_zone.is_dst ? "Active" : "Inactive") : "N/A"} />
                          </div>
                          {data.time_zone.current_time && (
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground font-medium mb-0.5">Current Local Time</p>
                              <p className="text-xs font-medium">{new Date(data.time_zone.current_time).toLocaleString()}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Network Tab */}
            <TabsContent value="network" className="space-y-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Provider & ASN Information */}
                <Card className="lg:h-[400px] overflow-auto">
                  <CardContent className="pt-4 space-y-2.5">
                    {/* Provider Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                        <Wifi className="h-3 w-3" />
                        Provider
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                          <span className="text-xs text-muted-foreground">ISP</span>
                          <span className="text-xs font-medium">{data.isp || "Unknown"}</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                          <span className="text-xs text-muted-foreground">Organization</span>
                          <span className="text-xs font-medium">{data.org || "Unknown"}</span>
                        </div>
                        {data.mobile !== undefined && (
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Mobile</span>
                            <Badge variant={data.mobile ? "default" : "secondary"} className="text-xs py-0 h-5">
                              {data.mobile ? "Yes" : "No"}
                            </Badge>
                          </div>
                        )}
                        {data.hosting !== undefined && (
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Hosting</span>
                            <Badge variant={data.hosting ? "default" : "secondary"} className="text-xs py-0 h-5">
                              {data.hosting ? "Yes" : "No"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ASN Info */}
                    {data.asn && (
                      <div className="space-y-1 pt-2 border-t">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Network className="h-3 w-3" />
                          ASN
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Number</span>
                            <span className="text-xs font-medium">{data.asn.asn || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Type</span>
                            <span className="text-xs font-medium">{data.asn.type || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Name</span>
                            <span className="text-xs font-medium truncate ml-2">{data.asn.name || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Domain</span>
                            <span className="text-xs font-medium truncate ml-2">{data.asn.domain || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Route</span>
                            <span className="text-xs font-medium truncate ml-2">{data.asn.route || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Company & Carrier Information */}
                <Card className="lg:h-[400px] overflow-auto">
                  <CardContent className="pt-4 space-y-2.5">
                    {/* Company Details */}
                    {data.company && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Monitor className="h-3 w-3" />
                          Company
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Name</span>
                            <span className="text-xs font-medium truncate ml-2">{data.company.name || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Domain</span>
                            <span className="text-xs font-medium truncate ml-2">{data.company.domain || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Network</span>
                            <span className="text-xs font-medium truncate ml-2">{data.company.network || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Type</span>
                            <span className="text-xs font-medium">{data.company.type || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Carrier Information */}
                    {data.carrier && (
                      <div className="space-y-1 pt-2 border-t">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Smartphone className="h-3 w-3" />
                          Carrier
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">Name</span>
                            <span className="text-xs font-medium truncate ml-2">{data.carrier.name || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">MCC</span>
                            <span className="text-xs font-medium">{data.carrier.mcc || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/30">
                            <span className="text-xs text-muted-foreground">MNC</span>
                            <span className="text-xs font-medium">{data.carrier.mnc || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {!data.company && !data.carrier && (
                      <p className="text-xs text-muted-foreground text-center py-6">
                        No company or carrier information available
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card className="lg:h-[400px] overflow-auto">
                  <CardContent className="pt-4 space-y-3">
                    {data.threat && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <ThreatIndicator label="VPN" value={data.threat.is_vpn} />
                          <ThreatIndicator label="Proxy" value={data.threat.is_proxy} />
                          <ThreatIndicator label="Tor" value={data.threat.is_tor} />
                          <ThreatIndicator label="iCloud Relay" value={data.threat.is_icloud_relay} />
                          <ThreatIndicator label="Datacenter" value={data.threat.is_datacenter} />
                          <ThreatIndicator label="Anonymous" value={data.threat.is_anonymous} />
                          <ThreatIndicator label="Known Attacker" value={data.threat.is_known_attacker} />
                          <ThreatIndicator label="Known Abuser" value={data.threat.is_known_abuser} />
                          <ThreatIndicator label="Threat" value={data.threat.is_threat} />
                          <ThreatIndicator label="Bogon" value={data.threat.is_bogon} />
                        </div>
                        {data.threat.blocklists && data.threat.blocklists.length > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground font-medium mb-2">Blocklists</p>
                            <div className="flex flex-wrap gap-1">
                              {data.threat.blocklists.map((list, idx) => (
                                <Badge key={idx} variant="destructive">{list}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {data.threat?.scores && (
                  <Card className="lg:h-[400px] overflow-auto">
                    <CardContent className="pt-4 space-y-4">
                      <ScoreBar label="VPN Score" value={data.threat.scores.vpn_score} />
                      <ScoreBar label="Proxy Score" value={data.threat.scores.proxy_score} />
                      <ScoreBar label="Threat Score" value={data.threat.scores.threat_score} />
                      <ScoreBar label="Trust Score" value={data.threat.scores.trust_score} variant="trust" />
                      <ScoreBar label="Abuse Score" value={data.threat.scores.abuse_score} />
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
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
        <p className="text-xs font-medium truncate">
          {value || "N/A"}
          {badge && <span className="text-muted-foreground ml-1 text-xs">({badge})</span>}
        </p>
      </div>
    </div>
  );
}

// Helper component for threat indicators
function ThreatIndicator({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
      <span className="text-xs font-medium">{label}</span>
      <Badge variant={value ? "destructive" : "secondary"} className="text-xs">
        {value ? "Yes" : "No"}
      </Badge>
    </div>
  );
}

// Helper component for score bars
function ScoreBar({ label, value, variant = "default" }: { label: string; value: number; variant?: "default" | "trust" }) {
  const getColor = () => {
    if (variant === "trust") {
      if (value >= 70) return "bg-green-500";
      if (value >= 40) return "bg-yellow-500";
      return "bg-red-500";
    }
    if (value >= 70) return "bg-red-500";
    if (value >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium">{label}</span>
        <span className="text-xs font-bold">{value}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
