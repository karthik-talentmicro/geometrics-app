import type {
  LocaleOSConfig,
  TrackingEvent,
  TrackingMetadata,
  TrackingResponse,
} from './types';
import { getPersistentFingerprint, generateFingerprint } from './utils/fingerprint';
import { getDeviceInfo, isBrowser } from './utils/device';

class LocaleOSAnalytics {
  private config: Required<LocaleOSConfig>;
  private fingerprint: string | null = null;
  private initialized = false;

  constructor() {
    // Default configuration
    this.config = {
      appId: '',
      apiUrl: '',
      debug: false,
      autoTrack: true,
      customFingerprint: '',
      disableFingerprinting: false,
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

    // Generate or get fingerprint
    if (config.customFingerprint) {
      this.fingerprint = config.customFingerprint;
    } else if (config.disableFingerprinting) {
      this.fingerprint = `random_${Math.random().toString(36).substring(7)}`;
    } else {
      this.fingerprint = getPersistentFingerprint();
    }

    this.initialized = true;
    this.log('LocaleOS Analytics initialized', {
      appId: this.config.appId,
      fingerprint: this.fingerprint,
    });

    // Auto-track page view if enabled
    if (this.config.autoTrack) {
      this.trackPageView();
    }
  }

  /**
   * Track a custom event
   */
  public async track(event?: string | TrackingEvent, metadata?: TrackingMetadata): Promise<boolean> {
    if (!this.initialized) {
      this.log('LocaleOS Analytics not initialized. Call init() first.');
      return false;
    }

    let eventData: TrackingEvent = {};

    // Handle different parameter formats
    if (typeof event === 'string') {
      eventData = { event, metadata };
    } else if (event) {
      eventData = event;
    }

    return this.sendTrackingRequest(eventData.metadata);
  }

  /**
   * Track a page view
   */
  public async trackPageView(metadata?: TrackingMetadata): Promise<boolean> {
    const pageData = {
      event: 'page_view',
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer,
      title: document.title,
      ...metadata,
    };

    return this.track({ event: 'page_view', metadata: pageData });
  }

  /**
   * Track a custom event with specific name
   */
  public async trackEvent(eventName: string, metadata?: TrackingMetadata): Promise<boolean> {
    return this.track({ event: eventName, metadata });
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
   * Send tracking request to the API
   */
  private async sendTrackingRequest(
    metadata?: TrackingMetadata,
    attempt = 1
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appId: this.config.appId,
          fingerprint: this.fingerprint,
          metadata,
        }),
      });

      const data: TrackingResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to track event');
      }

      this.log('Event tracked successfully', data);
      return true;
    } catch (error) {
      this.log('Error tracking event', error);

      // Retry logic
      if (attempt < this.config.retryAttempts) {
        this.log(`Retrying... Attempt ${attempt + 1}/${this.config.retryAttempts}`);
        await this.delay(this.config.retryDelay * attempt);
        return this.sendTrackingRequest(metadata, attempt + 1);
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
