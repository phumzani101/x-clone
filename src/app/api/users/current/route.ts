import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismaClient from "@/lib/prismadb";
import { getUser } from "@/actions/getUser";

export async function GET() {
  try {
    const user = await getUser();

    return NextResponse.json(user);
  } catch (error: any) {
    console.log("AUTH_CURRENT_ERROR", error);
    return new Response(`Server error`, {
      status: 400,
    });
  }
}
