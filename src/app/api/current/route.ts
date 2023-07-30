import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismaClient from "@/lib/prismadb";

export async function GET(request: Request) {
  const { email, username, name, password } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismaClient.user.create({
      data: {
        email,
        username,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log("REGISTER_ERROR", error);
    return new Response(`${error.message}`, {
      status: 200,
    });
  }
}
