import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    if (!postId) {
      return new Response(`Post ID is required`, {
        status: 400,
      });
    }

    const post = await prismaClient.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log("POST_GET_ERROR", error);
    return new Response(`Server error`, {
      status: 400,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const { body } = await req.json();
    if (!postId) {
      return new Response(`Post ID is required`, {
        status: 400,
      });
    }

    if (!body) {
      return new Response(`Please find something`, {
        status: 400,
      });
    }

    const post = await prismaClient.post.update({
      where: { id: postId },
      data: {
        body,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log("POST_GET_ERROR", error);
    return new Response(`Server error`, {
      status: 400,
    });
  }
}
