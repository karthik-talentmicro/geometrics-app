import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IpSearch } from "@/components/ip-search";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to Locale OS
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Your intelligent location-based operating system.
                Discover detailed geolocation information for any IP address.
              </p>
            </div>

            {/* IP Search Component */}
            <div className="w-full max-w-4xl">
              <IpSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              Everything you need to build modern web applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fast & Responsive</CardTitle>
                <CardDescription>Built with Next.js 16 and Turbopack</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast development and production builds with the latest Next.js features.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Beautiful UI Components</CardTitle>
                <CardDescription>Powered by ShadCN UI</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accessible and customizable components built with Radix UI and Tailwind CSS.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TypeScript Support</CardTitle>
                <CardDescription>Full type safety</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Write safer code with TypeScript and get excellent IDE support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dark Mode</CardTitle>
                <CardDescription>Built-in theme support</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Seamless dark mode support with system preference detection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsive Design</CardTitle>
                <CardDescription>Mobile-first approach</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fully responsive layouts that work perfectly on all devices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Developer Experience</CardTitle>
                <CardDescription>Optimized for productivity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hot reload, fast refresh, and excellent debugging tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join thousands of developers building amazing applications with our platform.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg">Start Building</Button>
              <Button variant="outline" size="lg">View Documentation</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
