import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Event, { EventDocument } from "@/models/Event";

export async function GET() {
  await connectDB();
  try {
    const events = await Event.find().sort({ date: 1 }); // ascending date
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();

    const newEvent = await Event.create({
      title: body.title,
      date: body.date,
      venue: body.venue,
      city: body.city,
      type: body.type,
      motive: body.motive,
      description: body.description, // must be string[]
      media: body.media || [],
      attendees: body.attendees || [],
      totalPhotos: body.totalPhotos || body.media?.length || 0,
      learnings: body.learnings || [],
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("EVENT CREATE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

