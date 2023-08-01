import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";
import { getUser } from "@/actions/getUser";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const currentUser = await getUser();

    if (!userId || typeof userId !== "string") {
      return new Response(`User ID is required`, {
        status: 400,
      });
    }

    const user = await prismaClient.user.findUnique({
      where: { id: currentUser?.id },
    });

    if (!user) {
      return new Response(`User not found`, {
        status: 400,
      });
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (updatedFollowingIds.includes(userId)) {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    } else {
      updatedFollowingIds.push(userId);
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: currentUser?.id },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log("USERS_GET_ERROR", error);
    return new Response(`Server error`, {
      status: 400,
    });
  }
}
