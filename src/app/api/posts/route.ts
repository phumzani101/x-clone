import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";
import { getUser } from "@/actions/getUser";

// LIST POST /api/posts
export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const userId = searchParams.get("userId");

  let query: any = {
    orderBy: { createdAt: "desc" },
    include: { user: true, comments: true },
  };

  // if (userId && typeof userId === "string") {
  //   query.where = { userId };
  // }

  try {
    const posts = await prismaClient.post.findMany(query);

    return NextResponse.json(posts);
  } catch (error: any) {
    console.log("POST_LIST_ERROR", error);
    return new Response(`Server error`, {
      status: 500,
    });
  }
}

// LIST POST /api/posts
export async function POST(request: Request) {
  const { body } = await request.json();

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
    const post = await prismaClient.post.create({
      data: {
        userId: user.id,
        body,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log("POST_ERROR", error);
    return new Response(`Failed to register try again later`, {
      status: 400,
    });
  }
}
