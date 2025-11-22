"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Globe, Users, TrendingUp, MapPin, Activity, Maximize2, Minimize2, X } from "lucide-react";

export function MockAnalyticsDashboard() {
  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-10">
          <Badge className="mb-4" variant="secondary">
            Preview Dashboard
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Real-Time Analytics at Your Fingertips
          </h2>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            See how LocaleOS helps you understand your global audience with privacy-first analytics
          </p>
        </div>

        {/* Computer Screen Frame */}
        <div className="relative mx-auto max-w-6xl">
          {/* Monitor Frame */}
          <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl p-3 shadow-2xl">
            {/* Browser Chrome */}
            <div className="bg-background rounded-t-lg overflow-hidden border">
              {/* Browser Top Bar */}
              <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-background rounded px-3 py-1 text-xs text-muted-foreground flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    <span>dashboard.localeos.com</span>
                  </div>
                </div>
                <div className="flex gap-2 text-muted-foreground">
                  <Minimize2 className="h-4 w-4" />
                  <Maximize2 className="h-4 w-4" />
                  <X className="h-4 w-4" />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="bg-background p-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <Card className="border">
                    <CardHeader className="pb-1 pt-2 px-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-[10px] font-medium text-muted-foreground">
                          Total Visitors
                        </CardTitle>
                        <Users className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 pb-2">
                      <div className="text-lg font-bold">24,583</div>
                      <p className="text-[10px] text-muted-foreground">
                        <span className="text-green-600">↑ 12.5%</span>
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-1 pt-2 px-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-[10px] font-medium text-muted-foreground">
                          Countries
                        </CardTitle>
                        <Globe className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 pb-2">
                      <div className="text-lg font-bold">87</div>
                      <p className="text-[10px] text-muted-foreground">
                        <span className="text-green-600">↑ 5</span> new
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-1 pt-2 px-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-[10px] font-medium text-muted-foreground">
                          Languages
                        </CardTitle>
                        <Activity className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 pb-2">
                      <div className="text-lg font-bold">23</div>
                      <p className="text-[10px] text-muted-foreground">
                        Active
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-1 pt-2 px-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-[10px] font-medium text-muted-foreground">
                          Engagement
                        </CardTitle>
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 pb-2">
                      <div className="text-lg font-bold">4.2m</div>
                      <p className="text-[10px] text-muted-foreground">
                        <span className="text-green-600">↑ 18.2%</span>
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Dashboard Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-3">
                  {/* Top Countries */}
                  <Card className="border">
                    <CardHeader className="pb-1.5 pt-2 px-3">
                      <CardTitle className="flex items-center gap-1.5 text-sm">
                        <MapPin className="h-3.5 w-3.5" />
                        Top Countries
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 pb-2">
                      <div className="space-y-1.5">
                        {[
                          { country: "United States", code: "US", percentage: 34 },
                          { country: "United Kingdom", code: "GB", percentage: 21 },
                          { country: "Germany", code: "DE", percentage: 16 },
                        ].map((item) => (
                          <div key={item.code} className="flex items-center gap-1.5">
                            <Badge variant="outline" className="w-8 justify-center text-[10px] px-1 py-0">
                              {item.code}
                            </Badge>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[10px] font-medium">{item.country}</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1">
                                <div
                                  className="bg-primary rounded-full h-1"
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Languages */}
                  <Card className="border">
                    <CardHeader className="pb-1.5 pt-2 px-3">
                      <CardTitle className="flex items-center gap-1.5 text-sm">
                        <BarChart3 className="h-3.5 w-3.5" />
                        Languages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 pb-2">
                      <div className="space-y-1.5">
                        {[
                          { language: "English", code: "EN", percentage: 51 },
                          { language: "Spanish", code: "ES", percentage: 20 },
                          { language: "German", code: "DE", percentage: 13 },
                        ].map((item) => (
                          <div key={item.code} className="flex items-center gap-1.5">
                            <Badge variant="outline" className="w-8 justify-center text-[10px] px-1 py-0">
                              {item.code}
                            </Badge>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[10px] font-medium">{item.language}</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1">
                                <div
                                  className="bg-primary rounded-full h-1"
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* CTA Section */}
                <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 border">
                  <CardContent className="pt-3 pb-3 px-3">
                    <h3 className="text-sm font-bold mb-1 text-center">
                      Simple to Use, Plug and Go
                    </h3>
                    <p className="text-muted-foreground mb-2 text-center text-[10px]">
                      Install our SDK and start tracking your global audience in seconds
                    </p>
                    <div className="flex gap-2 justify-center">
                      <code className="px-2 py-1 bg-muted rounded text-[10px] font-mono">
                        npm install @localeos/sdk
                      </code>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Monitor Stand */}
          <div className="relative mx-auto w-48 h-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-lg" />
          <div className="relative mx-auto w-64 h-2 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-xl" />
        </div>
      </div>
    </section>
  );
}
