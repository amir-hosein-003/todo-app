import { NextResponse } from "next/server";
import Todo from "@/lib/models/Todo";
import connectDB from '@/lib/mongoDb';

// GET /api/todos
export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1});
    return NextResponse.json(todos);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

