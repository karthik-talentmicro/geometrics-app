"use client";

import { Sparkles } from "lucide-react";

export function AnnouncementBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-primary-foreground py-2 overflow-hidden">
      <div className="relative flex">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">
                World's First AI Enhanced IP Intelligence OS
              </span>
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">
                Powered by Advanced Location Intelligence
              </span>
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">
                Real-Time IP Geolocation & Network Analysis
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">
                World's First AI Enhanced IP Intelligence OS
              </span>
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">
                Powered by Advanced Location Intelligence
              </span>
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">
                Real-Time IP Geolocation & Network Analysis
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
