import prisma from '../db/prisma';
import { ipToInt, isValidIPv4 } from '../utils';

export interface IpLocationResult {
  query: string;
  status: 'success' | 'fail';
  message?: string;
  continent?: string;
  continentCode?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  district?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  offset?: number;
  currency?: string;
  isp?: string;
  org?: string;
  as?: string;
  asname?: string;
  mobile?: boolean;
  proxy?: boolean;
  hosting?: boolean;
}

export class IpLookupService {
  static async lookupIp(ipAddress: string): Promise<IpLocationResult> {
    try {
      // Validate IP address format
      if (!isValidIPv4(ipAddress)) {
        return {
          query: ipAddress,
          status: 'fail',
          message: 'Invalid IP address format',
        };
      }

      // Convert IP to integer for range comparison
      const ipInt = ipToInt(ipAddress);

      // Query database using integer range comparison
      const result = await prisma.$queryRaw<any[]>`
        SELECT * FROM ip_geolocation
        WHERE ${ipInt}::bigint >= ip_start_int AND ${ipInt}::bigint <= ip_end_int
        LIMIT 1
      `;

      if (!result || result.length === 0) {
        return {
          query: ipAddress,
          status: 'fail',
          message: 'IP address not found in database',
        };
      }

      const row = result[0];

      return {
        query: ipAddress,
        status: 'success',
        continent: row.continent || '',
        continentCode: row.continent_code || '',
        country: row.country || '',
        countryCode: row.country_code || '',
        region: row.region || '',
        regionName: row.region_name || '',
        city: row.city || '',
        district: row.district || '',
        zip: row.zip || '',
        lat: row.latitude ? parseFloat(row.latitude.toString()) : undefined,
        lon: row.longitude ? parseFloat(row.longitude.toString()) : undefined,
        timezone: row.timezone || '',
        offset: row.timezone_offset || 0,
        currency: row.currency || '',
        isp: row.isp || '',
        org: row.org || '',
        as: row.asn ? row.asn.toString() : '',
        asname: row.asname || '',
        mobile: row.is_mobile || false,
        proxy: row.is_proxy || false,
        hosting: row.is_hosting || false,
      };
    } catch (error) {
      console.error('Error looking up IP:', error);
      return {
        query: ipAddress,
        status: 'fail',
        message: 'Internal server error',
      };
    }
  }

  static async getStats(): Promise<any> {
    try {
      const totalRecords = await prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(*) as count FROM ip_geolocation
      `;

      const countries = await prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(DISTINCT country_code) as count FROM ip_geolocation WHERE country_code IS NOT NULL
      `;

      const cities = await prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(DISTINCT city) as count FROM ip_geolocation WHERE city IS NOT NULL AND city != ''
      `;

      const dateRange = await prisma.$queryRaw<[{ oldest: Date | null; newest: Date | null }]>`
        SELECT MIN(created_at) as oldest, MAX(created_at) as newest FROM ip_geolocation
      `;

      return {
        total_records: Number(totalRecords[0].count),
        total_countries: Number(countries[0].count),
        total_cities: Number(cities[0].count),
        oldest_record: dateRange[0].oldest,
        newest_record: dateRange[0].newest,
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }
}
