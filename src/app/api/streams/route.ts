import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const YT_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export const CreateStreamSchema = z.object({
    createrId: z.string(),
    url: z.string().regex(YT_REGEX, "Invalid YouTube URL")
});

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());

        const match = data.url.match(YT_REGEX);
        if (!match) {
            return NextResponse.json({ message: "Wrong URL format" }, { status: 411 });
        }

        const extractedId = match[1];

        await prismaClient.streams.create({
            data: {
                userId: data.createrId,
                url: data.url,
                extractedId,
                type: "Youtube"
            }
        });

        return NextResponse.json({ message: "Stream added successfully" }, { status: 201 });

    } catch (e) {
        return NextResponse.json({ message: `Error while adding a stream: ${e}` }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const createrId = req.nextUrl.searchParams.get("createrId");
    if (!createrId) {
        return NextResponse.json({ message: "createrId is required" }, { status: 400 });
    }

    const streams = await prismaClient.streams.findMany({
        where: {
            userId: createrId
        }
    });

    return NextResponse.json({
        streams
    });
}