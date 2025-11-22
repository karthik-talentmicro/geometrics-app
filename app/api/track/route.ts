import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import crypto from "crypto";

// Extract IP address from request
function getIpAddress(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return null;
}

// Parse user agent to get device info
function parseUserAgent(userAgent: string | null) {
  if (!userAgent) {
    return {
      browser: "Unknown",
      os: "Unknown",
      device: "Unknown",
    };
  }

  const browsers = [
    { name: "Chrome", pattern: /Chrome\/(\d+)/ },
    { name: "Firefox", pattern: /Firefox\/(\d+)/ },
    { name: "Safari", pattern: /Version\/(\d+).*Safari/ },
    { name: "Edge", pattern: /Edg\/(\d+)/ },
    { name: "Opera", pattern: /OPR\/(\d+)/ },
  ];

  const os = [
    { name: "Windows", pattern: /Windows NT (\d+\.\d+)/ },
    { name: "macOS", pattern: /Mac OS X (\d+[._]\d+)/ },
    { name: "Linux", pattern: /Linux/ },
    { name: "Android", pattern: /Android (\d+)/ },
    { name: "iOS", pattern: /iPhone OS (\d+[._]\d+)/ },
  ];

  let browser = "Unknown";
  let browserVersion = "";
  let operatingSystem = "Unknown";
  let osVersion = "";

  for (const b of browsers) {
    const match = userAgent.match(b.pattern);
    if (match) {
      browser = b.name;
      browserVersion = match[1] || "";
      break;
    }
  }

  for (const o of os) {
    const match = userAgent.match(o.pattern);
    if (match) {
      operatingSystem = o.name;
      osVersion = match[1]?.replace("_", ".") || "";
      break;
    }
  }

  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
  const device = isMobile ? "Mobile" : "Desktop";

  return {
    browser: browserVersion ? `${browser} ${browserVersion}` : browser,
    os: osVersion ? `${operatingSystem} ${osVersion}` : operatingSystem,
    device,
  };
}

// POST /api/track - Log analytics event
export async function POST(req: Request) {
  try {
    const { appId, fingerprint, metadata } = await req.json();

    if (!appId) {
      return NextResponse.json(
        { error: "App ID is required" },
        { status: 400 }
      );
    }

    if (!fingerprint) {
      return NextResponse.json(
        { error: "System fingerprint is required" },
        { status: 400 }
      );
    }

    // Verify app exists
    const app = await prisma.app.findUnique({
      where: { appId },
    });

    if (!app) {
      return NextResponse.json(
        { error: "Invalid app ID" },
        { status: 404 }
      );
    }

    // Extract IP and device info
    const ipAddress = getIpAddress(req);
    const userAgent = req.headers.get("user-agent");
    const deviceInfo = parseUserAgent(userAgent);

    // Use upsert to ensure only one log per system per app
    // If a log already exists with this fingerprint, update it
    // Otherwise, create a new log
    const log = await prisma.log.upsert({
      where: {
        appId_systemFingerprint: {
          appId: app.id,
          systemFingerprint: fingerprint,
        },
      },
      update: {
        // Update the timestamp and metadata on subsequent visits
        ipAddress,
        userAgent,
        deviceInfo,
        metadata,
      },
      create: {
        appId: app.id,
        systemFingerprint: fingerprint,
        ipAddress,
        userAgent,
        deviceInfo,
        metadata,
      },
    });

    return NextResponse.json({
      success: true,
      logId: log.id,
      message: "Event tracked successfully",
    });
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}

// OPTIONS /api/track - Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
