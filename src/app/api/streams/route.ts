import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/db"
import { z } from "zod";
// @ts-expect-error not have types
import youtubesearchapi from "youtube-search-api"


const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;


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

        const res = await youtubesearchapi.GetVideoDetails(extractedId)

        console.log(res.title);
        console.log(res.thumbnail.thumbnails);
        const thumbnails = res.thumbnail.thumbnails
        thumbnails.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1)


        const stream = await prismaClient.streams.create({

            data: {

                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "Cant find Video",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "https://variety.com/wp-content/uploads/2020/06/youtube-logo.png?w=999&h=562&crop=1",
                bigImg: thumbnails[thumbnails.length - 1].url ?? "https://variety.com/wp-content/uploads/2020/06/youtube-logo.png?w=999&h=562&crop=1"

            }
        })

        return NextResponse.json({
            message: "added Stream",
            id: stream.id
        })

    } catch (e) {


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
