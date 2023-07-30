import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";

export async function GET() {
  try {
    const users = await prismaClient.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    console.log("USERS_LIST_ERROR", error);
    return new Response(`Server error`, {
      status: 500,
    });
  }
}
