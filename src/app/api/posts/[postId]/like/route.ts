import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";
import { getUser } from "@/actions/getUser";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const currentUser = await getUser();

    if (!postId || typeof postId !== "string") {
      return new Response(`Post ID is required`, {
        status: 400,
      });
    }

    if (!currentUser) {
      return new Response(`Not authorized`, {
        status: 400,
      });
    }

    const post = await prismaClient.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return new Response(`User not found`, {
        status: 400,
      });
    }

    let updatedLikedIds = [...(post.likeIds || [])];

    if (updatedLikedIds.includes(currentUser?.id.toString())) {
      updatedLikedIds = updatedLikedIds.filter(
        (likeId) => likeId.toString() !== currentUser?.id.toString()
      );
    } else {
      updatedLikedIds.push(currentUser?.id);
      try {
        if (post?.userId) {
          await prismaClient.notification.create({
            data: { body: "Someone liked your tweet!", userId: post.userId },
          });
        }

        await prismaClient.user.update({
          where: {
            id: post.userId,
          },
          data: { hasNotification: true },
        });
      } catch (error) {
        console.log(error);
      }
    }

    const updatedPost = await prismaClient.post.update({
      where: { id: postId },
      data: {
        likeIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    console.log("POST_LIKE_ERROR", error);
    return new Response(`Server error`, {
      status: 400,
    });
  }
}
