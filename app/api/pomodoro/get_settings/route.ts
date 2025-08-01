import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const url = new URL(request.url);

  const userId = url.searchParams.get("userId");

  if (!userId) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 });

  try {
    const pomodoroSettings = await db.pomodoroSettings.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!pomodoroSettings) {
      // Create default pomodoro settings for new users
      const defaultSettings = await db.pomodoroSettings.create({
        data: {
          userId: userId,
          workDuration: 25,
          shortBreakDuration: 5,
          longBreakDuration: 15,
          longBreakInterval: 4,
          rounds: 4,
          soundEffect: "BELL"
        }
      });
      return NextResponse.json(defaultSettings, { status: 200 });
    }

    return NextResponse.json(pomodoroSettings, { status: 200 });
  } catch (err) {
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
};
