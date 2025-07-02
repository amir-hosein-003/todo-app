// import type { NextApiRequest, NextApiResponse } from "next";
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

// POST /api/todos
// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const { title, category } = await req.json();

//     if (!title) {
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });
//     }

//     const newTodo = await Todo.create({ title, category });
//     return NextResponse.json(newTodo, { status: 201 });
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
//   }
// }
