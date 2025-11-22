import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db/prisma";

// GET /api/apps/[id] - Get specific app with analytics
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const app = await prisma.app.findUnique({
      where: {
        id,
        userId: session.user.id, // Ensure user owns this app
      },
      include: {
        logs: {
          orderBy: {
            createdAt: "desc",
          },
          take: 100, // Latest 100 logs
        },
        _count: {
          select: {
            logs: true,
          },
        },
      },
    });

    if (!app) {
      return NextResponse.json(
        { error: "App not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ app });
  } catch (error) {
    console.error("Error fetching app:", error);
    return NextResponse.json(
      { error: "Failed to fetch app" },
      { status: 500 }
    );
  }
}

// DELETE /api/apps/[id] - Delete app
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const app = await prisma.app.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!app) {
      return NextResponse.json(
        { error: "App not found" },
        { status: 404 }
      );
    }

    await prisma.app.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "App deleted successfully" });
  } catch (error) {
    console.error("Error deleting app:", error);
    return NextResponse.json(
      { error: "Failed to delete app" },
      { status: 500 }
    );
  }
}
