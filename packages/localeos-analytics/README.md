# @localeos/ip-info

Official LocaleOS IP Info SDK for tracking user analytics with privacy-focused system fingerprinting and IP geolocation.

## Features

- 🔒 **Privacy-First**: System fingerprinting instead of invasive tracking
- 🎯 **One Log Per System**: Automatic deduplication ensures one entry per unique system
- 📊 **Comprehensive Device Detection**: Browser, OS, device type, and more
- 🌍 **IP Geolocation**: Automatic IP address detection and location tracking
- 🔄 **Auto-Retry**: Built-in retry logic for failed requests
- 🚀 **Lightweight**: Minimal bundle size with zero dependencies
- 📦 **TypeScript Support**: Full type definitions included
- 🌐 **Cross-Platform**: Works in all modern browsers

## Installation

```bash
npm install @localeos/ip-info
```

Or with yarn:

```bash
yarn add @localeos/ip-info
```

Or with pnpm:

```bash
pnpm add @localeos/ip-info
```

## Quick Start

### 1. Get Your App ID

1. Sign up at [LocaleOS Dashboard](https://your-domain.com)
2. Create a new app
3. Copy your 256-bit App ID

### 2. Initialize the SDK

```javascript
import LocaleOS from '@localeos/ip-info';

// Initialize with your App ID
LocaleOS.init({
  appId: 'your-256-bit-app-id',
  debug: true, // Enable debug mode during development
});
```

### 3. Track Events

The SDK automatically tracks page views by default. You can also track custom events:

```javascript
// Track a custom event
LocaleOS.track('button_click', {
  buttonName: 'signup',
  page: '/landing',
});

// Or use trackEvent method
LocaleOS.trackEvent('purchase', {
  productId: '123',
  price: 99.99,
  currency: 'USD',
});
```

## Configuration Options

```typescript
LocaleOS.init({
  // Required: Your unique App ID from LocaleOS dashboard
  appId: 'your-256-bit-app-id',

  // Optional: Custom API endpoint (defaults to current origin)
  apiUrl: 'https://your-custom-domain.com',

  // Optional: Enable debug logging
  debug: false,

  // Optional: Automatically track page views
  autoTrack: true,

  // Optional: Provide your own fingerprint
  customFingerprint: 'custom-id',

  // Optional: Disable fingerprinting and use random IDs
  disableFingerprinting: false,

  // Optional: Number of retry attempts for failed requests
  retryAttempts: 3,

  // Optional: Retry delay in milliseconds
  retryDelay: 1000,
});
```

## API Reference

### `init(config: LocaleOSConfig): void`

Initialize the SDK with your configuration.

```javascript
LocaleOS.init({
  appId: 'your-app-id',
  debug: true,
});
```

### `track(event?: string | TrackingEvent, metadata?: object): Promise<boolean>`

Track a custom event with optional metadata.

```javascript
// Simple event
await LocaleOS.track('user_signup');

// Event with metadata
await LocaleOS.track('purchase', {
  productId: '123',
  price: 99.99,
});

// Object syntax
await LocaleOS.track({
  event: 'page_view',
  metadata: {
    page: '/about',
  },
});
```

### `trackPageView(metadata?: object): Promise<boolean>`

Track a page view with automatic URL detection.

```javascript
await LocaleOS.trackPageView({
  customField: 'value',
});
```

### `trackEvent(eventName: string, metadata?: object): Promise<boolean>`

Track a named event.

```javascript
await LocaleOS.trackEvent('video_play', {
  videoId: 'abc123',
  duration: 120,
});
```

### `getFingerprint(): string | null`

Get the current system fingerprint.

```javascript
const fingerprint = LocaleOS.getFingerprint();
console.log(fingerprint); // "fp_abc123_xyz"
```

### `getDeviceInfo(): DeviceInfo | null`

Get detailed device information.

```javascript
const deviceInfo = LocaleOS.getDeviceInfo();
console.log(deviceInfo);
// {
//   browser: "Chrome 120",
//   os: "macOS 14.1",
//   device: "Desktop",
//   screen: { width: 1920, height: 1080, colorDepth: 24 },
//   timezone: -480,
//   language: "en-US",
//   cores: 8
// }
```

## Advanced Usage

### Custom Fingerprint

If you have your own user identification system:

```javascript
LocaleOS.init({
  appId: 'your-app-id',
  customFingerprint: userId, // Use your own ID
});
```

### Disable Auto-Tracking

If you want to manually control when events are tracked:

```javascript
LocaleOS.init({
  appId: 'your-app-id',
  autoTrack: false, // Disable automatic page view tracking
});

// Manually track when needed
LocaleOS.trackPageView();
```

### Error Handling

All tracking methods return a Promise<boolean>:

```javascript
const success = await LocaleOS.track('event');
if (success) {
  console.log('Event tracked successfully');
} else {
  console.log('Failed to track event');
}
```

### React Integration

```jsx
import { useEffect } from 'react';
import LocaleOS from '@localeos/ip-info';

function App() {
  useEffect(() => {
    LocaleOS.init({
      appId: process.env.REACT_APP_LOCALEOS_ID,
      debug: process.env.NODE_ENV === 'development',
    });
  }, []);

  const handleButtonClick = async () => {
    await LocaleOS.track('button_click', {
      button: 'cta',
    });
  };

  return <button onClick={handleButtonClick}>Click Me</button>;
}
```

### Next.js Integration

```jsx
// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LocaleOS from '@localeos/ip-info';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    LocaleOS.init({
      appId: process.env.NEXT_PUBLIC_LOCALEOS_ID,
      autoTrack: false, // Handle page views manually
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      LocaleOS.trackPageView();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return <Component {...pageProps} />;
}
```

### Vue Integration

```javascript
// main.js
import { createApp } from 'vue';
import LocaleOS from '@localeos/ip-info';
import App from './App.vue';

LocaleOS.init({
  appId: import.meta.env.VITE_LOCALEOS_ID,
});

const app = createApp(App);
app.mount('#app');
```

## How It Works

### System Fingerprinting

LocaleOS uses advanced browser fingerprinting to create a unique identifier for each system:

1. **Canvas Fingerprinting**: Draws a unique pattern based on GPU/font rendering
2. **WebGL Fingerprinting**: Detects graphics card information
3. **Browser Properties**: User agent, language, timezone, screen resolution
4. **Hardware Info**: CPU cores, device memory, platform

### Privacy Considerations

- **No Personal Data**: We don't collect names, emails, or IP addresses (IP is optional)
- **One Entry Per System**: Prevents duplicate tracking
- **No Cross-Site Tracking**: Each app has its own isolated fingerprints
- **User Control**: Users can clear localStorage to reset their fingerprint

### Automatic Deduplication

The system uses the unique fingerprint to ensure only one log entry per system per app. If the same system visits multiple times, the existing log is updated rather than creating duplicates.

## Browser Support

- Chrome/Edge: ✅ Latest 2 versions
- Firefox: ✅ Latest 2 versions
- Safari: ✅ Latest 2 versions
- Opera: ✅ Latest version

## License

MIT

## Support

For questions and support, please open an issue on [GitHub](https://github.com/localeos/analytics/issues).
