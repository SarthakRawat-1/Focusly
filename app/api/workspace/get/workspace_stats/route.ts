import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get("workspaceId");

  if (!workspaceId) {
    return NextResponse.json("ERRORS.WRONG_DATA", { status: 400 });
  }

  try {
    const [taskCount, mindMapCount, memberCount, recentActivityCount] = await Promise.all([
      db.task.count({
        where: { workspaceId },
      }),
      
      db.mindMap.count({
        where: { workspaceId },
      }),
      
      db.subscription.count({
        where: { workspaceId },
      }),
      
      // Recent activity count (last 7 days)
      (() => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        return Promise.all([
          db.task.count({
            where: {
              workspaceId,
              updatedAt: { gte: sevenDaysAgo },
            },
          }),
          db.mindMap.count({
            where: {
              workspaceId,
              updatedAt: { gte: sevenDaysAgo },
            },
          }),
        ]).then(([recentTasks, recentMindMaps]) => recentTasks + recentMindMaps);
      })(),
    ]);

    const stats = {
      taskCount,
      mindMapCount,
      memberCount,
      recentActivityCount,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Workspace stats error:", error);
    return NextResponse.json("ERRORS.DB_ERROR", { status: 500 });
  }
};