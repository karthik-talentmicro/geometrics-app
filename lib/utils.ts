import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts an IPv4 address to a 32-bit integer
 * @param ip - IPv4 address string (e.g., "192.168.1.1")
 * @returns 32-bit integer representation
 */
export function ipToInt(ip: string): number {
  const parts = ip.split('.').map(Number);
  return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
}

/**
 * Validates an IPv4 address format
 * @param ip - IP address string to validate
 * @returns true if valid IPv4 format
 */
export function isValidIPv4(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = ip.match(ipv4Regex);

  if (!match) return false;

  return match.slice(1, 5).every(octet => {
    const num = parseInt(octet, 10);
    return num >= 0 && num <= 255;
  });
}
