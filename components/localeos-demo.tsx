'use client';

import { useState } from 'react';
import { LocaleOS } from './localeos-provider';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function LocaleOSDemo() {
  const [tracking, setTracking] = useState(false);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleTrackEvent = async () => {
    setTracking(true);
    try {
      const success = await LocaleOS.track('demo_button_click');

      if (success) {
        alert('Event tracked successfully!');
      } else {
        alert('Failed to track event');
      }
    } catch (error) {
      console.error('Error tracking event:', error);
      alert('Error tracking event');
    } finally {
      setTracking(false);
    }
  };

  const handleGetFingerprint = () => {
    const fp = LocaleOS.getFingerprint();
    setFingerprint(fp);
  };

  const handleGetDeviceInfo = () => {
    const info = LocaleOS.getDeviceInfo();
    setDeviceInfo(info);
  };

  const handleGetLocationInfo = async () => {
    setLoadingLocation(true);
    try {
      const info = await LocaleOS.getLocationInfo();
      setLocationInfo(info);
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>LocaleOS Analytics Demo</CardTitle>
        <CardDescription>
          Test the LocaleOS IP Info SDK integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Track Custom Event</h3>
          <Button
            onClick={handleTrackEvent}
            disabled={tracking}
            className="w-full"
          >
            {tracking ? 'Tracking...' : 'Track Demo Event'}
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Get System Fingerprint</h3>
          <Button
            onClick={handleGetFingerprint}
            variant="outline"
            className="w-full"
          >
            Get Fingerprint
          </Button>
          {fingerprint && (
            <div className="mt-2 p-3 bg-muted rounded-md">
              <code className="text-xs break-all">{fingerprint}</code>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Get Device Info</h3>
          <Button
            onClick={handleGetDeviceInfo}
            variant="outline"
            className="w-full"
          >
            Get Device Info
          </Button>
          {deviceInfo && (
            <div className="mt-2 p-3 bg-muted rounded-md">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(deviceInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Get Location Info</h3>
          <p className="text-xs text-muted-foreground mb-2">
            Includes country, city, timezone, and currency
          </p>
          <Button
            onClick={handleGetLocationInfo}
            variant="outline"
            className="w-full"
            disabled={loadingLocation}
          >
            {loadingLocation ? 'Loading...' : 'Get Location Info'}
          </Button>
          {locationInfo && (
            <div className="mt-2 p-3 bg-muted rounded-md">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(locationInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            All page views are automatically tracked. Check your dashboard for real-time analytics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
