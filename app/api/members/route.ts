// app/api/members/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Member } from "@/models/Member";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const member = await Member.create(body);

  return NextResponse.json(
    { success: true, member },
    { status: 201 }
  );
}

export async function GET() {
  await connectDB();
  const members = await Member.find().sort({ createdAt: -1 });
    const response = {
    success: true,
    count: members.length,
    members
    } 
  return NextResponse.json(response, { status: 200 });
}


