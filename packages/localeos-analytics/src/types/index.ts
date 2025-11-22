/**
 * Configuration options for initializing LocaleOS Analytics
 */
export interface LocaleOSConfig {
  /**
   * Your unique App ID from LocaleOS dashboard (256-bit identifier)
   */
  appId: string;

  /**
   * API endpoint URL (optional, defaults to production)
   */
  apiUrl?: string;

  /**
   * Enable debug logging
   */
  debug?: boolean;

  /**
   * Automatically track page views
   */
  autoTrack?: boolean;

  /**
   * Custom fingerprint (if you want to provide your own)
   */
  customFingerprint?: string;

  /**
   * Disable fingerprinting and use a random ID
   */
  disableFingerprinting?: boolean;

  /**
   * Number of retry attempts for failed requests
   */
  retryAttempts?: number;

  /**
   * Retry delay in milliseconds
   */
  retryDelay?: number;
}

/**
 * Metadata that can be sent with tracking events
 */
export interface TrackingMetadata {
  [key: string]: any;
}

/**
 * Event data for tracking
 */
export interface TrackingEvent {
  /**
   * Event name (e.g., 'page_view', 'button_click')
   */
  event?: string;

  /**
   * Additional metadata
   */
  metadata?: TrackingMetadata;
}

/**
 * Device information detected from the browser
 */
export interface DeviceInfo {
  /**
   * Browser name and version
   */
  browser: string;

  /**
   * Operating system name and version
   */
  os: string;

  /**
   * Device type (Desktop, Mobile, Tablet)
   */
  device: string;

  /**
   * Screen resolution
   */
  screen?: {
    width: number;
    height: number;
    colorDepth: number;
  };

  /**
   * Timezone offset
   */
  timezone?: number;

  /**
   * Language
   */
  language?: string;

  /**
   * Hardware concurrency (CPU cores)
   */
  cores?: number;
}

/**
 * Fingerprint components used to generate unique system ID
 */
export interface FingerprintComponents {
  userAgent: string;
  language: string;
  colorDepth: number;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  screenResolution: string;
  availableScreenResolution: string;
  timezoneOffset: number;
  timezone?: string;
  sessionStorage: boolean;
  localStorage: boolean;
  indexedDb: boolean;
  platform: string;
  plugins: string;
  canvas?: string;
  webgl?: string;
}

/**
 * Response from the tracking API
 */
export interface TrackingResponse {
  success: boolean;
  logId?: string;
  message?: string;
  error?: string;
}
