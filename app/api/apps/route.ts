import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import crypto from "crypto";

// Generate 256-bit app ID
function generateAppId(): string {
  return crypto.randomBytes(32).toString("hex"); // 32 bytes = 256 bits
}

// GET /api/apps - List all apps for current user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const apps = await prisma.app.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            logs: true,
          },
        },
      },
    });

    return NextResponse.json({ apps });
  } catch (error) {
    console.error("Error fetching apps:", error);
    return NextResponse.json(
      { error: "Failed to fetch apps" },
      { status: 500 }
    );
  }
}

// POST /api/apps - Create new app
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, identifier } = await req.json();

    if (!name || !identifier) {
      return NextResponse.json(
        { error: "Name and identifier are required" },
        { status: 400 }
      );
    }

    // Check if identifier already exists
    const existingApp = await prisma.app.findUnique({
      where: { identifier },
    });

    if (existingApp) {
      return NextResponse.json(
        { error: "An app with this identifier already exists" },
        { status: 400 }
      );
    }

    // Generate unique 256-bit app ID
    const appId = generateAppId();

    const app = await prisma.app.create({
      data: {
        appId,
        name,
        identifier,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ app }, { status: 201 });
  } catch (error) {
    console.error("Error creating app:", error);
    return NextResponse.json(
      { error: "Failed to create app" },
      { status: 500 }
    );
  }
}
