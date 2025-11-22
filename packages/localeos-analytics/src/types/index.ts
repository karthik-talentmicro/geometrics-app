/**
 * Configuration options for initializing LocaleOS Analytics
 */
export interface LocaleOSConfig {
  /**
   * Your unique App ID from LocaleOS dashboard (256-bit identifier)
   */
  appId: string;

  /**
   * API endpoint URL (optional, defaults to current origin)
   */
  apiUrl?: string;

  /**
   * Enable/disable tracking (defaults to true)
   * When disabled, all tracking methods will return immediately without making API calls
   */
  enabled?: boolean;

  /**
   * Enable debug logging
   */
  debug?: boolean;

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
 * Event data for tracking
 */
export interface TrackingEvent {
  /**
   * Event name (e.g., 'page_view', 'button_click')
   */
  event?: string;
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
 * Location information from IP address
 */
export interface LocationInfo {
  /**
   * IP address
   */
  ip: string;

  /**
   * Country name
   */
  country?: string;

  /**
   * Country code (ISO 3166-1 alpha-2)
   */
  countryCode?: string;

  /**
   * Region/State
   */
  region?: string;

  /**
   * City
   */
  city?: string;

  /**
   * Postal code
   */
  postalCode?: string;

  /**
   * Latitude
   */
  latitude?: number;

  /**
   * Longitude
   */
  longitude?: number;

  /**
   * Timezone (e.g., "America/New_York")
   */
  timezone?: string;

  /**
   * Currency code (e.g., "USD")
   */
  currency?: string;

  /**
   * Currency symbol (e.g., "$")
   */
  currencySymbol?: string;
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
