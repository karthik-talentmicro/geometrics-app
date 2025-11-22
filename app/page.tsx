import { IpSearch } from "@/components/ip-search";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { MockAnalyticsDashboard } from "@/components/mock-analytics-dashboard";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center space-y-6 text-center mb-8">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Privacy-First Analytics + Localization
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-base md:text-lg">
                Privacy-first analytics + localization management in one platform. Discover where your users are, manage translations, and automatically serve the right content—all from a single SDK.
              </p>
            </div>
          </div>

          {/* IP Search Component */}
          <IpSearch />
        </div>
      </section>

      {/* Mock Analytics Dashboard */}
      <MockAnalyticsDashboard />

      {/* Stats Section */}
      <section className="w-full py-16 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold">2.4M+</p>
              <p className="text-sm text-muted-foreground">IP Ranges</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">250+</p>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">60K+</p>
              <p className="text-sm text-muted-foreground">Cities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
