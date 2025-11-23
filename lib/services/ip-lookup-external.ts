// Service to lookup IP addresses using external Parsinga API
export class ExternalIpLookupService {
  private static apiKey = process.env.PARSINGA_API_KEY || '';
  private static apiUrl = process.env.PARSINGA_API_URL || 'https://api.parsinga.com/ip-geolocation';

  static async lookupIp(ipAddress: string): Promise<any> {
    try {
      if (!this.apiKey) {
        console.error('PARSINGA_API_KEY is not configured');
        return {
          ip: ipAddress,
          status: 'fail',
          message: 'API key not configured',
        };
      }

      const url = `${this.apiUrl}?ip=${encodeURIComponent(ipAddress)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        console.error(`API request failed with status: ${response.status}`);
        return {
          ip: ipAddress,
          status: 'fail',
          message: `API request failed: ${response.statusText}`,
        };
      }

      const data = await response.json();

      // Return the data with status field added
      return {
        ...data,
        status: 'success',
      };
    } catch (error) {
      console.error('Error looking up IP via external API:', error);
      return {
        ip: ipAddress,
        status: 'fail',
        message: error instanceof Error ? error.message : 'Internal server error',
      };
    }
  }
}
