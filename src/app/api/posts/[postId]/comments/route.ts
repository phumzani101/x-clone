import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";
import { getUser } from "@/actions/getUser";

// Create POST /api/posts/{postId}/comments
export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const { body } = await req.json();
  const postId = params.postId;
  if (!postId) {
    return new Response(`Post ID is required`, {
      status: 400,
    });
  }

  try {
    const user = await getUser();

    if (!user) {
      return new Response(`Register to create post`, {
        status: 400,
      });
    }

    if (!body) {
      return new Response(`Post content is required`, {
        status: 400,
      });
    }
    const comment = await prismaClient.comment.create({
      data: {
        postId,
        userId: user.id,
        body,
      },
    });

    return NextResponse.json(comment);
  } catch (error: any) {
    console.log("POST_COMMENT_CREATE_ERROR", error);
    return new Response(`Failed to register try again later`, {
      status: 400,
    });
  }
}
