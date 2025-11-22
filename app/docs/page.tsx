import { Metadata } from 'next';
import { DocsSidebar } from '@/components/docs-sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Documentation - LocaleOS IP Info SDK',
  description: 'Complete developer documentation for the LocaleOS IP Info SDK',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          <DocsSidebar />

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-20 mb-16">
              <h1 className="text-4xl font-bold mb-4">LocaleOS IP Info SDK</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Privacy-first analytics with system fingerprinting, IP geolocation, and device detection.
              </p>
              <div className="flex gap-4 mb-8">
                <Link href="/dashboard">
                  <Button>Get Started</Button>
                </Link>
                <Link href="https://github.com/localeos/analytics">
                  <Button variant="outline">View on GitHub</Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🔒 Privacy-First</h3>
                  <p className="text-sm text-muted-foreground">
                    System fingerprinting instead of invasive tracking
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🎯 One Log Per System</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatic deduplication ensures accurate analytics
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🌍 IP Geolocation</h3>
                  <p className="text-sm text-muted-foreground">
                    Country, city, timezone, and currency detection
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🚀 Lightweight</h3>
                  <p className="text-sm text-muted-foreground">
                    ~12KB minified with zero dependencies
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="scroll-mt-20 mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">Quick Start</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">1. Get Your App ID</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Sign up or log in to your dashboard</li>
                    <li>Click "Create New App"</li>
                    <li>Copy your 256-bit App ID</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">2. Install the SDK</h3>
                  <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
                    <code>npm install @localeos/ip-info</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">3. Initialize</h3>
                  <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm">
{`import LocaleOS from '@localeos/ip-info';

LocaleOS.init({
  appId: 'your-256-bit-app-id'
});`}
                  </pre>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    ✅ That's it! Visits are automatically tracked when your app loads. Each unique system is logged once and updated on subsequent visits.
                  </p>
                </div>
              </div>
            </section>

            {/* Installation */}
            <section id="installation" className="scroll-mt-20 mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">Installation</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">npm</p>
                  <pre className="bg-black text-white p-3 rounded-lg">
                    <code>npm install @localeos/ip-info</code>
                  </pre>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">yarn</p>
                  <pre className="bg-black text-white p-3 rounded-lg">
                    <code>yarn add @localeos/ip-info</code>
                  </pre>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">pnpm</p>
                  <pre className="bg-black text-white p-3 rounded-lg">
                    <code>pnpm add @localeos/ip-info</code>
                  </pre>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">TypeScript Support</h3>
                  <p className="text-muted-foreground mb-2">
                    The SDK includes full TypeScript definitions. No additional @types packages needed.
                  </p>
                  <pre className="bg-black text-white p-3 rounded-lg">
{`import LocaleOS from '@localeos/ip-info';
import type { LocationInfo, DeviceInfo } from '@localeos/ip-info';`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Configuration */}
            <section id="configuration" className="scroll-mt-20 mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">Configuration</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-3 text-left font-semibold">Option</th>
                      <th className="border p-3 text-left font-semibold">Type</th>
                      <th className="border p-3 text-left font-semibold">Required</th>
                      <th className="border p-3 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3"><code className="bg-muted px-2 py-1 rounded text-xs">appId</code></td>
                      <td className="border p-3">string</td>
                      <td className="border p-3">Yes</td>
                      <td className="border p-3">Your 256-bit App ID from dashboard</td>
                    </tr>
                    <tr>
                      <td className="border p-3"><code className="bg-muted px-2 py-1 rounded text-xs">apiUrl</code></td>
                      <td className="border p-3">string</td>
                      <td className="border p-3">No</td>
                      <td className="border p-3">Custom API endpoint (defaults to current origin)</td>
                    </tr>
                    <tr>
                      <td className="border p-3"><code className="bg-muted px-2 py-1 rounded text-xs">enabled</code></td>
                      <td className="border p-3">boolean</td>
                      <td className="border p-3">No</td>
                      <td className="border p-3">Enable/disable all tracking (default: true). When disabled, tracking methods return immediately without making API calls</td>
                    </tr>
                    <tr>
                      <td className="border p-3"><code className="bg-muted px-2 py-1 rounded text-xs">debug</code></td>
                      <td className="border p-3">boolean</td>
                      <td className="border p-3">No</td>
                      <td className="border p-3">Enable debug logging (default: false)</td>
                    </tr>
                    <tr>
                      <td className="border p-3"><code className="bg-muted px-2 py-1 rounded text-xs">retryAttempts</code></td>
                      <td className="border p-3">number</td>
                      <td className="border p-3">No</td>
                      <td className="border p-3">Retry attempts for failed requests (default: 3)</td>
                    </tr>
                    <tr>
                      <td className="border p-3"><code className="bg-muted px-2 py-1 rounded text-xs">retryDelay</code></td>
                      <td className="border p-3">number</td>
                      <td className="border p-3">No</td>
                      <td className="border p-3">Retry delay in milliseconds (default: 1000)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Example Configuration</h3>
                <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm">
{`LocaleOS.init({
  appId: 'your-256-bit-app-id',
  apiUrl: 'https://analytics.yourdomain.com',
  enabled: true, // Enable/disable tracking
  debug: process.env.NODE_ENV === 'development',
  retryAttempts: 3,
  retryDelay: 1000
});`}
                </pre>
              </div>
            </section>

            {/* System Fingerprinting */}
            <section id="fingerprinting" className="scroll-mt-20 mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">System Fingerprinting</h2>

              <p className="text-muted-foreground mb-6">
                LocaleOS uses advanced browser fingerprinting to create a unique identifier for each system,
                ensuring one log entry per device without cookies or invasive tracking.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Canvas Fingerprinting</h3>
                  <p className="text-sm text-muted-foreground">
                    Creates unique patterns based on GPU and font rendering
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">WebGL Fingerprinting</h3>
                  <p className="text-sm text-muted-foreground">
                    Detects graphics card vendor and renderer info
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Browser Properties</h3>
                  <p className="text-sm text-muted-foreground">
                    User agent, language, timezone, screen resolution
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Hardware Info</h3>
                  <p className="text-sm text-muted-foreground">
                    CPU cores, device memory, platform information
                  </p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">✅ Privacy-First Approach</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• No personal information collected</li>
                  <li>• No cross-site tracking</li>
                  <li>• Fingerprints stored in localStorage (user can clear)</li>
                  <li>• Each app has isolated fingerprints</li>
                </ul>
              </div>
            </section>

            {/* API Reference - init */}
            <section id="init" className="scroll-mt-20 mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">API Reference</h2>

              <div className="p-6 border rounded-lg mb-8">
                <h3 className="text-2xl font-semibold mb-3">
                  <code className="bg-muted px-3 py-1 rounded">LocaleOS.init(config)</code>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Initialize the LocaleOS SDK with your configuration. <strong>Automatically tracks the visit when called.</strong>
                </p>
                <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`LocaleOS.init({
  appId: 'your-app-id',
  debug: true,
});
// Visit is automatically logged!`}
                </pre>
                <div className="space-y-2 text-sm">
                  <p><strong>Parameters:</strong></p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li><code className="bg-muted px-2 py-1 rounded text-xs">config</code> (LocaleOSConfig) - Configuration object</li>
                  </ul>
                  <p className="mt-3"><strong>Returns:</strong> void</p>
                  <p className="mt-3 bg-blue-50 dark:bg-blue-950 p-3 rounded">
                    <strong>ℹ️ That's all you need!</strong> The SDK automatically tracks when your app loads. No manual tracking calls required.
                  </p>
                </div>
              </div>
            </section>

            {/* Optional Methods */}
            <section id="optional-methods" className="scroll-mt-20 mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">Optional Methods</h2>
              <p className="text-muted-foreground mb-6">
                These methods are available if you need additional functionality, but <strong>most apps won't need them</strong> since visits are tracked automatically.
              </p>
            </section>

            {/* track */}
            <section id="track" className="scroll-mt-20 mb-8">
              <div className="p-6 border rounded-lg mb-8">
                <h3 className="text-2xl font-semibold mb-3">
                  <code className="bg-muted px-3 py-1 rounded">LocaleOS.track(event)</code>
                  <span className="ml-2 text-sm font-normal text-muted-foreground">(Optional)</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Manually track an additional event if needed. Only system fingerprint and device info are collected - no personal data or metadata.
                </p>
                <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Simple event
await LocaleOS.track('user_signup');

// Named event
await LocaleOS.track('purchase');

// Object syntax
await LocaleOS.track({ event: 'button_click' });`}
                </pre>
                <div className="space-y-2 text-sm">
                  <p><strong>Parameters:</strong></p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li><code className="bg-muted px-2 py-1 rounded text-xs">event</code> (string | TrackingEvent, optional) - Event name</li>
                  </ul>
                  <p className="mt-3"><strong>Returns:</strong> Promise&lt;boolean&gt; - true if successful</p>
                  <p className="mt-3 text-muted-foreground">
                    <strong>Note:</strong> Most apps won't need this since visits are tracked automatically on initialization.
                  </p>
                </div>
              </div>
            </section>

            {/* getFingerprint */}
            <section id="getFingerprint" className="scroll-mt-20 mb-8">
              <div className="p-6 border rounded-lg mb-8">
                <h3 className="text-2xl font-semibold mb-3">
                  <code className="bg-muted px-3 py-1 rounded">LocaleOS.getFingerprint()</code>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get the current system fingerprint.
                </p>
                <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`const fingerprint = LocaleOS.getFingerprint();
console.log(fingerprint); // "fp_abc123_xyz"`}
                </pre>
                <div className="space-y-2 text-sm">
                  <p><strong>Returns:</strong> string | null</p>
                </div>
              </div>
            </section>

            {/* getDeviceInfo */}
            <section id="getDeviceInfo" className="scroll-mt-20 mb-8">
              <div className="p-6 border rounded-lg mb-8">
                <h3 className="text-2xl font-semibold mb-3">
                  <code className="bg-muted px-3 py-1 rounded">LocaleOS.getDeviceInfo()</code>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get detailed device information including browser, OS, device type, screen resolution, timezone, and language.
                </p>
                <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`const deviceInfo = LocaleOS.getDeviceInfo();
console.log(deviceInfo);
// {
//   browser: "Chrome 120",
//   os: "macOS 14.1",
//   device: "Desktop",
//   screen: { width: 1920, height: 1080, colorDepth: 24 },
//   timezone: -480,
//   language: "en-US",
//   cores: 8
// }`}
                </pre>
                <div className="space-y-2 text-sm">
                  <p><strong>Returns:</strong> DeviceInfo | null</p>
                </div>
              </div>
            </section>

            {/* getLocationInfo */}
            <section id="getLocationInfo" className="scroll-mt-20 mb-16">
              <div className="p-6 border rounded-lg mb-8">
                <h3 className="text-2xl font-semibold mb-3">
                  <code className="bg-muted px-3 py-1 rounded">LocaleOS.getLocationInfo()</code>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get location information from IP address including country, city, timezone, and currency.
                </p>
                <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`const locationInfo = await LocaleOS.getLocationInfo();
console.log(locationInfo);
// {
//   ip: "8.8.8.8",
//   country: "United States",
//   countryCode: "US",
//   region: "California",
//   city: "Mountain View",
//   postalCode: "94035",
//   latitude: 37.386,
//   longitude: -122.0838,
//   timezone: "America/Los_Angeles",
//   currency: "USD",
//   currencySymbol: "$"
// }`}
                </pre>
                <div className="space-y-2 text-sm">
                  <p><strong>Returns:</strong> Promise&lt;LocationInfo | null&gt;</p>
                  <p className="mt-3 text-muted-foreground">
                    Note: This method is cached after the first call for performance.
                  </p>
                </div>
              </div>
            </section>

            {/* Integration Guides */}
            <section id="nextjs" className="scroll-mt-20 mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">Integration Guides</h2>

              <div className="space-y-8">
                {/* Next.js */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Next.js App Router</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a client component provider and wrap your app in the root layout.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">components/localeos-provider.tsx</p>
                      <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm">
{`'use client';

import { useEffect } from 'react';
import LocaleOS from '@localeos/ip-info';

export function LocaleOSProvider({
  children,
  appId
}: {
  children: React.ReactNode;
  appId: string;
}) {
  useEffect(() => {
    LocaleOS.init({
      appId
    });
    // Visit is automatically tracked!
  }, [appId]);

  return <>{children}</>;
}`}
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">app/layout.tsx</p>
                      <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm">
{`import { LocaleOSProvider } from '@/components/localeos-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LocaleOSProvider
          appId={process.env.NEXT_PUBLIC_LOCALEOS_APP_ID}
        >
          {children}
        </LocaleOSProvider>
      </body>
    </html>
  );
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* React */}
            <section id="react" className="scroll-mt-20 mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-4">React (Vite)</h3>
                <p className="text-muted-foreground mb-4">
                  Initialize in main.tsx or App.tsx
                </p>
                <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm">
{`// src/main.tsx
import { useEffect } from 'react';
import LocaleOS from '@localeos/ip-info';

function App() {
  useEffect(() => {
    LocaleOS.init({
      appId: import.meta.env.VITE_LOCALEOS_APP_ID
    });
    // Visit is automatically tracked!
  }, []);

  return <div>Your App</div>;
}`}
                </pre>
              </div>
            </section>

            {/* Vue */}
            <section id="vue" className="scroll-mt-20 mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Vue</h3>
                <p className="text-muted-foreground mb-4">
                  Initialize in main.js
                </p>
                <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm">
{`// src/main.js
import { createApp } from 'vue';
import LocaleOS from '@localeos/ip-info';
import App from './App.vue';

LocaleOS.init({
  appId: import.meta.env.VITE_LOCALEOS_APP_ID
});
// Visit is automatically tracked!

const app = createApp(App);
app.mount('#app');`}
                </pre>
              </div>
            </section>

            {/* TypeScript */}
            <section id="typescript" className="scroll-mt-20 mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">TypeScript</h2>

              <p className="text-muted-foreground mb-4">
                The SDK includes full TypeScript support out of the box.
              </p>

              <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm">
{`import LocaleOS from '@localeos/ip-info';
import type {
  LocaleOSConfig,
  DeviceInfo,
  LocationInfo
} from '@localeos/ip-info';

// Type-safe configuration
const config: LocaleOSConfig = {
  appId: 'your-app-id',
};

LocaleOS.init(config);

// Type-safe device info
const device: DeviceInfo | null = LocaleOS.getDeviceInfo();

// Type-safe location info
const location: LocationInfo | null = await LocaleOS.getLocationInfo();`}
              </pre>
            </section>

            {/* Privacy */}
            <section id="privacy" className="scroll-mt-20 mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">Privacy & Security</h2>

              <div className="space-y-6">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">What We DON'T Collect</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• ❌ Names or email addresses</li>
                    <li>• ❌ Passwords or credentials</li>
                    <li>• ❌ Credit card information</li>
                    <li>• ❌ Personal identifiable information (PII)</li>
                    <li>• ❌ Cross-site tracking data</li>
                    <li>• ❌ Browsing history</li>
                  </ul>
                </div>

                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Data Deduplication</h3>
                  <p className="text-muted-foreground">
                    The system uses the unique fingerprint to ensure only one log entry per system per app.
                    If the same system visits multiple times, the existing log is updated rather than creating duplicates.
                    This ensures accurate analytics without inflated numbers.
                  </p>
                </div>

                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">User Control</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Fingerprints are stored in localStorage and can be cleared</li>
                    <li>• Each app has isolated fingerprints (no cross-site tracking)</li>
                    <li>• No persistent server-side cookies</li>
                    <li>• IP addresses are optional and can be disabled</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Support */}
            <section className="mb-16 p-8 bg-muted rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Check out our resources or get in touch with our team
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
                <Link href="https://github.com/localeos/analytics">
                  <Button variant="outline">View on GitHub</Button>
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
