import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";
import { z } from "zod";

const UpvoteStreamSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prismaClient.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const data = UpvoteStreamSchema.parse(await req.json());

    const existingUpvote = await prismaClient.upvotes.findFirst({
      where: {
        userId: user.id, 
        streamId: data.streamId,
      },
    });

    if (existingUpvote) {
      return NextResponse.json(
        { message: "You have already upvoted this stream" },
        { status: 400 }
      );
    }

    await prismaClient.upvotes.create({
      data: {
        userId: user.id,
        streamId: data.streamId,
      },
    });

    return NextResponse.json({ message: "Upvote added" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: `Error while upvoting: ${e}` },
      { status: 500 }
    );
  }
}
