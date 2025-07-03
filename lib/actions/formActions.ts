"use server"

import connectDB from "@/lib/mongoDb"
import Todo from "@/lib/models/Todo"
import { UpdateOPT } from "@/components/TodoCard"

type PrevState = {
    success: boolean
    message: string
}

export async function addTodo(_prevState: PrevState, formData: FormData) {
    const title = formData.get("title")
    const category = formData.get("category")

    try {
        await connectDB()
        if (!title) {
            return {
                success: false,
                message: "Title is required",
            }
        }
        await Todo.create({ title, category })
        return { success: true, message: "Todo added successfully" }
    } catch (err) {
        console.log("Error", err)
        return {
            success: false,
            message: "error in added Todo",
        }
    }
}

export async function deleteTodo(id: string) {
    try {
        await connectDB()

        const deletedTodo = await Todo.findByIdAndDelete(id)
        if (!deletedTodo) return { success: false, message: "Todo not found" }

        return {
            success: true,
            message: "Todo deleted successfully",
        }
    } catch (error) {
        console.log("Error in deleted Todo", error)
        return {
            success: false,
            message: "Error in deleted Todo",
        }
    }
}

export async function updateTodo(formData: UpdateOPT) {
    const { id, title, completed } = formData

    try {
        await connectDB()
        await Todo.findByIdAndUpdate(id, { title, completed })
        return {
            success: true,
            message: "Todo updated successfully",
        }
    } catch (error) {
        console.log("Error in updated Todo", error)
        return {
            success: false,
            message: "Error in updated Todo",
        }
    }
}
