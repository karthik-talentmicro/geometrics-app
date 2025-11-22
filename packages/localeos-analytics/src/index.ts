import type {
  LocaleOSConfig,
  TrackingEvent,
  TrackingResponse,
  LocationInfo,
} from './types';
import { getPersistentFingerprint, generateFingerprint } from './utils/fingerprint';
import { getDeviceInfo, isBrowser } from './utils/device';

class LocaleOSAnalytics {
  private config: Required<LocaleOSConfig>;
  private fingerprint: string | null = null;
  private initialized = false;
  private locationCache: LocationInfo | null = null;

  constructor() {
    // Default configuration
    this.config = {
      appId: '',
      apiUrl: '',
      enabled: true,
      debug: false,
      retryAttempts: 3,
      retryDelay: 1000,
    };
  }

  /**
   * Initialize LocaleOS Analytics
   */
  public init(config: LocaleOSConfig): void {
    if (!isBrowser()) {
      this.log('LocaleOS Analytics can only be initialized in a browser environment');
      return;
    }

    if (!config.appId) {
      throw new Error('App ID is required to initialize LocaleOS Analytics');
    }

    // Merge config with defaults
    this.config = {
      ...this.config,
      ...config,
      apiUrl: config.apiUrl || this.getDefaultApiUrl(),
    };

    // Always use internal fingerprinting
    this.fingerprint = getPersistentFingerprint();

    this.initialized = true;
    this.log('LocaleOS initialized');

    // Automatically track visit when enabled
    if (this.config.enabled) {
      this.track();
    }
  }

  /**
   * Track a custom event
   */
  public async track(event?: string | TrackingEvent): Promise<boolean> {
    if (!this.initialized) {
      this.log('LocaleOS Analytics not initialized. Call init() first.');
      return false;
    }

    // Check if tracking is enabled
    if (!this.config.enabled) {
      this.log('Tracking is disabled');
      return true; // Return true to not break existing code
    }

    let eventData: TrackingEvent = {};

    // Handle different parameter formats
    if (typeof event === 'string') {
      eventData = { event };
    } else if (event) {
      eventData = event;
    }

    return this.sendTrackingRequest();
  }

  /**
   * Get the current fingerprint
   */
  public getFingerprint(): string | null {
    return this.fingerprint;
  }

  /**
   * Get device information
   */
  public getDeviceInfo() {
    if (!isBrowser()) return null;
    return getDeviceInfo();
  }

  /**
   * Get location information from IP address
   * Includes country, city, timezone, and currency information
   */
  public async getLocationInfo(): Promise<LocationInfo | null> {
    if (!isBrowser()) return null;

    // Return cached location if available
    if (this.locationCache) {
      return this.locationCache;
    }

    try {
      // Get user's IP from external service
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp = ipData.ip;

      // Lookup IP location from our API
      const locationResponse = await fetch(
        `${this.config.apiUrl}/api/ip-lookup?ip=${userIp}`
      );
      const locationData = await locationResponse.json();

      if (locationData.status === 'success') {
        this.locationCache = {
          ip: userIp,
          country: locationData.country,
          countryCode: locationData.country_code,
          region: locationData.region,
          city: locationData.city,
          postalCode: locationData.postal_code,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          timezone: locationData.timezone,
          currency: locationData.currency,
          currencySymbol: locationData.currency_symbol,
        };

        return this.locationCache;
      }

      return null;
    } catch (error) {
      this.log('Error fetching location info:', error);
      return null;
    }
  }

  /**
   * Send tracking request to the API
   */
  private async sendTrackingRequest(attempt = 1): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appId: this.config.appId,
          fingerprint: this.fingerprint,
        }),
      });

      const data: TrackingResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to track event');
      }

      this.log('Event tracked');
      return true;
    } catch (error) {
      this.log('Error tracking event', error);

      // Retry logic
      if (attempt < this.config.retryAttempts) {
        this.log(`Retrying... Attempt ${attempt + 1}/${this.config.retryAttempts}`);
        await this.delay(this.config.retryDelay * attempt);
        return this.sendTrackingRequest(attempt + 1);
      }

      return false;
    }
  }

  /**
   * Get default API URL based on current environment
   */
  private getDefaultApiUrl(): string {
    if (isBrowser()) {
      return window.location.origin;
    }
    return 'https://localhost:3000'; // Fallback
  }

  /**
   * Delay helper for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Debug logging
   */
  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[LocaleOS Analytics]', ...args);
    }
  }
}

// Create singleton instance
const localeOS = new LocaleOSAnalytics();

// Export singleton instance as default
export default localeOS;

// Export class for advanced usage
export { LocaleOSAnalytics };

// Export types
export * from './types';

// Export utilities
export { generateFingerprint, getPersistentFingerprint } from './utils/fingerprint';
export { getDeviceInfo, isBrowser, isMobile, isTablet, isDesktop } from './utils/device';
export type { LocationInfo } from './types';
