import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";

// GET list /api/users/{userId}/notifications
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    if (!userId || typeof userId !== "string") {
      return new Response(`User ID is required`, {
        status: 400,
      });
    }

    const notifications = await prismaClient.notification.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    await prismaClient.user.update({
      where: { id: userId },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json(notifications);
  } catch (error: any) {
    console.log("USER_GET_NOTIFICATIONS_ERROR", error);
    return new Response(`Server error`, {
      status: 400,
    });
  }
}
