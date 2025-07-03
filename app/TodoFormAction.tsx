"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Todo } from "@/types/TodoTypes";
import CategoryTabs from "./CategoryTabs";
import { addTodo } from "@/lib/actions/formActions";


const initialState = {
  success: false,
  message: "",
  errors: {}
}

const TodoFormAction = () => {
  
  const [formState, formActions] = useActionState(addTodo, initialState);

  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
      setLoading(false);
    };
    
    fetchData();
  }, [formState]);
  

  return (
    <section className="max-w-4xl mx-auto border-2 rounded-xl py-8 my-8">
      <h1 className="text-3xl text-center font-bold">Todos App</h1>
      <form
        action={formActions}
        className="max-w-3xl mx-auto grid grid-cols-1 gap-4 border-b-2 py-8 my-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="border rounded-md p-4"
          />
          <select name="category" className="border rounded-md p-4">
            <option value="select-category">Select category</option>
            <option value="work">Work</option>
            <option value="education">Education</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
          </select>
        </div>

        <button className="btn btn-primary btn-lg" type="submit">
          Add Todo
        </button>
      </form>
      {loading ? (
          <div className="w-10 h-10 mx-auto border-4 border-r-black border-b-black rounded-full animate-spin" />
      ) : (
        <CategoryTabs todos={todos} />
      )}
    </section>
  );
};

export default TodoFormAction;
