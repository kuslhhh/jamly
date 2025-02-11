import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/db"
import { z } from "zod";

const  YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;


const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {

    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = data.url.match(YT_REGEX)

        if (!isYt) {
            return NextResponse.json({
                message: "Wrong url format"
            }, {
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1];

        const stream = await prismaClient.streams.create({

            data: {

                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube"
            }
        })

        return NextResponse.json({
            message: "added Stream",
            id: stream.id
        })

    } catch (e) {

        console.log(e);
        
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        })
    }
}

export async function GET(req: NextRequest) {

    const creatorId = req.nextUrl.searchParams.get("creatorId")
    const streams = await prismaClient.streams.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({
        streams
    })

}