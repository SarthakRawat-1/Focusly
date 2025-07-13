import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json("ERRORS.WRONG_DATA", { status: 400 });
  }

  try {
    const userSubscriptions = await db.subscription.findMany({
      where: { userId },
      include: { workspace: true },
    });

    const workspaceIds = userSubscriptions.map(sub => sub.workspaceId);

    const [
      totalWorkspaces,
      totalTasks,
      totalMindMaps,
      starredTasks,
      starredMindMaps,
      assignedTasks,
      assignedMindMaps,
    ] = await Promise.all([
      db.subscription.count({
        where: { userId },
      }),
      
      db.task.count({
        where: { workspaceId: { in: workspaceIds } },
      }),
      
      db.mindMap.count({
        where: { workspaceId: { in: workspaceIds } },
      }),
      
      db.savedTask.count({
        where: { userId },
      }),
      
      db.savedMindMaps.count({
        where: { userId },
      }),
      
      db.assignedToTask.count({
        where: { userId },
      }),
      
      db.assignedToMindMap.count({
        where: { userId },
      }),
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [recentTasks, recentMindMaps] = await Promise.all([
      db.task.count({
        where: {
          workspaceId: { in: workspaceIds },
          updatedAt: { gte: sevenDaysAgo },
        },
      }),
      db.mindMap.count({
        where: {
          workspaceId: { in: workspaceIds },
          updatedAt: { gte: sevenDaysAgo },
        },
      }),
    ]);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const upcomingDeadlines = await db.task.count({
      where: {
        workspaceId: { in: workspaceIds },
        taskDate: {
          to: {
            gte: new Date().toISOString(),
            lte: nextWeek.toISOString(),
          },
        },
      },
    });

    const stats = {
      totalWorkspaces,
      totalTasks,
      totalMindMaps,
      starredItems: starredTasks + starredMindMaps,
      assignedToMe: assignedTasks + assignedMindMaps,
      recentActivity: recentTasks + recentMindMaps,
      completedThisWeek: 0,
      upcomingDeadlines,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json("ERRORS.DB_ERROR", { status: 500 });
  }
};