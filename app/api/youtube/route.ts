// app/api/youtube/route.ts
import { NextResponse } from "next/server";
import { fetchChannelVideos } from "@/lib/youtube-api";

const CHANNEL_ID = "UCMkA4cP8P2UoXAapQDK-GTw";

export async function GET() {
  try {
    const videos = await fetchChannelVideos(
      CHANNEL_ID,
      process.env.YOUTUBE_API_KEY!
    );
    return NextResponse.json(videos);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
