import { db } from "@/lib/db";
import { signUpSchema } from "@/schema/signUpSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = signUpSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  const { email, password, username } = result.data;

  try {
    const existedUsername = await db.user.findUnique({
      where: { username },
    });

    if (existedUsername) {
      return NextResponse.json({ error: "TAKEN_USERNAME" }, { status: 409 });
    }

    const existedUser = await db.user.findUnique({
      where: { email },
    });

    if (existedUser) {
      return NextResponse.json({ error: "TAKEN_EMAIL" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
  }
}
