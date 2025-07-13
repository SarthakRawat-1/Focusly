import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json("ERRORS.WRONG_DATA", { status: 400 });
  }

  try {
    const subscriptions = await db.subscription.findMany({
      where: { userId },
      include: {
        workspace: true,
      },
    });

    const workspacesWithStats = await Promise.all(
      subscriptions.map(async (subscription) => {
        const workspace = subscription.workspace;
        
        const taskCount = await db.task.count({
          where: { workspaceId: workspace.id },
        });

        const mindMapCount = await db.mindMap.count({
          where: { workspaceId: workspace.id },
        });

        const memberCount = await db.subscription.count({
          where: { workspaceId: workspace.id },
        });

        return {
          ...workspace,
          taskCount,
          mindMapCount,
          memberCount,
          userRole: subscription.userRole,
        };
      })
    );

    return NextResponse.json(workspacesWithStats, { status: 200 });
  } catch (error) {
    console.error("Dashboard workspaces error:", error);
    return NextResponse.json("ERRORS.DB_ERROR", { status: 500 });
  }
};