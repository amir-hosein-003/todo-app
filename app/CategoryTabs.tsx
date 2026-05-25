"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TodoCard from "@/components/TodoCard"
import { TodoType } from "@/types/TodoTypes"
import { useEffect, useState } from "react"

const CategoryTabs = ({
  todos: initialTodos,
  loading,
}: {
  todos: TodoType[]
  loading: boolean
}) => {
  const [todos, setTodos] = useState(initialTodos)

  useEffect(() => {
    setTodos(initialTodos)
  }, [initialTodos])

  const filterByCategory: (category: string) => TodoType[] = (
    category: string
  ): TodoType[] => todos.filter((todo: TodoType) => todo.category === category)

  const categories = [
    {
      key: "all",
      label: "All",
      data: todos,
    },
    {
      key: "work",
      label: "Work",
      data: filterByCategory("work"),
    },
    {
      key: "education",
      label: "Education",
      data: filterByCategory("education"),
    },
    {
      key: "personal",
      label: "Personal",
      data: filterByCategory("personal"),
    },
    {
      key: "study",
      label: "Study",
      data: filterByCategory("study"),
    },
  ]

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== id))
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-2 pb-8">
      <Tabs defaultValue="all">
        <TabsList className="w-full grid grid-cols-5 gap-4 border-b-2">
          {categories.map(({ key, label }) => (
            <TabsTrigger key={key} value={key}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {loading ? (
          <div className="w-10 h-10 mx-auto border-4 border-r-black border-b-black rounded-full animate-spin mt-6" />
        ) : (
          categories.map(({ key, data }) => (
            <TabsContent key={key} value={key}>
              <div className="flex flex-col gap-2">
                {data.map((todo) => (
                  <TodoCard
                    key={todo._id}
                    todos={todo}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </TabsContent>
          ))
        )}
      </Tabs>
    </div>
  )
}

export default CategoryTabs
