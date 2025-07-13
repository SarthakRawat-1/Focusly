import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", {
      status: 400,
      statusText: "Unauthorized User",
    });
  }

  try {
    // Find notifications with missing notifyCreator
    const invalidNotifications = await db.notification.findMany({
      where: {
        notifyCreator: null,
      },
      select: {
        id: true,
      },
    });

    if (invalidNotifications.length > 0) {
      // Delete notifications with missing notifyCreator
      await db.notification.deleteMany({
        where: {
          id: {
            in: invalidNotifications.map(n => n.id),
          },
        },
      });

      console.log(`Cleaned up ${invalidNotifications.length} invalid notifications`);
      
      return NextResponse.json({
        message: `Cleaned up ${invalidNotifications.length} invalid notifications`,
        deletedCount: invalidNotifications.length,
      }, { status: 200 });
    }

    return NextResponse.json({
      message: "No invalid notifications found",
      deletedCount: 0,
    }, { status: 200 });

  } catch (error) {
    console.error("Error cleaning up notifications:", error);
    return NextResponse.json("ERRORS.DB_ERROR", { status: 500 });
  }
}