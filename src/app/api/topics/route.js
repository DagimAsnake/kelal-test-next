import connectMongoDB from '@/libs/mongodb';
import Topic from '@/models/topics';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { title, body } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, body });
  return NextResponse.json({ message: 'Topic Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find().sort({ createdAt: -1 });
  return NextResponse.json({ topics });
}
