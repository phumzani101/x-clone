import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId) {
      return new Response(`User ID is required`, {
        status: 400,
      });
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prismaClient.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...user, followersCount });
  } catch (error: any) {
    console.log("USERS_GET_ERROR", error);
    return new Response(`Server error`, {
      status: 400,
    });
  }
}
