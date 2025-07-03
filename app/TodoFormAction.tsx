"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, {
    startTransition,
    useActionState,
    useEffect,
    useState,
} from "react"
import { Controller, useForm } from "react-hook-form"
import { Todo } from "@/types/TodoTypes"
import CategoryTabs from "./CategoryTabs"
import { addTodo } from "@/lib/actions/formActions"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import toast from "react-hot-toast"

const initialState = {
    success: false,
    message: "",
}

const formSchema = z.object({
    title: z.string().min(1, "This field required"),
    category: z.enum(["work", "education", "personal", "study"], {
        required_error: "This field required",
    }),
})

type FormField = z.infer<typeof formSchema>

const TodoFormAction = () => {
    const [formState, formActions] = useActionState(addTodo, initialState)
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormField>({
        resolver: zodResolver(formSchema),
    })

    const [loading, setLoading] = useState(true)
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/todos")
            const data = await res.json()
            setTodos(data)
            setLoading(false)
        }

        fetchData()
    }, [formState])

    const onSubmit = (data: FormField) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("category", data.category)

        startTransition(() => {
            formActions(formData)
        })
        reset()
    }

    useEffect(() => {
        if (formState.success) toast.success(formState.message)
        if (!formState.success && formState.message !== "")
            toast.error(formState.message)
    }, [formState])

    return (
        <section className="max-w-4xl mx-auto border-2 rounded-xl py-8 my-8">
            <h1 className="text-3xl text-center font-bold">Todos App</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto grid grid-cols-1 gap-4 border-b-2 py-8 my-8"
            >
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            {...register("title")}
                            type="text"
                            placeholder="Title"
                            className="w-full border rounded-md p-4"
                        />
                        {errors.title && (
                            <div className="text-sm text-red-500">
                                {errors.title.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <Controller
                            control={control}
                            {...register("category")}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full ">
                                        <SelectValue placeholder="select-category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="work">
                                            Work
                                        </SelectItem>
                                        <SelectItem value="education">
                                            Education
                                        </SelectItem>
                                        <SelectItem value="personal">
                                            Personal
                                        </SelectItem>
                                        <SelectItem value="study">
                                            Study
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.category && (
                            <div className="text-sm text-red-500">
                                {errors.category.message}
                            </div>
                        )}
                    </div>
                </div>

                <button className="btn btn-primary btn-lg" type="submit">
                    Add Todo
                </button>
            </form>

            <CategoryTabs todos={todos} loading={loading} />
        </section>
    )
}

export default TodoFormAction
