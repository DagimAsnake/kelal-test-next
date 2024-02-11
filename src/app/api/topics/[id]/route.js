import connectMongoDB from '@/libs/mongodb';
import Topic from '@/models/topics';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    const { id } = params;
    const { title, body } = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(
      id,
      { title: title, body: body }, 
      { new: true }
    );
    return NextResponse.json({ message: 'Topic updated' }, { status: 200 });
  }

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Topic deleted' }, { status: 200 });
}
