"use client"

import { deleteTodo, updateTodo } from "@/lib/actions/formActions";
import { formatDate } from "@/lib/formatData";
import { Todo } from "@/types/TodoTypes";
import { Icon } from "@iconify/react";
import { useState } from "react";


type Props = {
    todos: Todo;
    onDelete: (id: string) => void;
}

export type UpdateOPT = {
    id: string;
    title: string;
    category: string;
    completed: boolean;
}

const TodoCard = ({ todos, onDelete }: Props) => {

    const [completed, setCompleted] = useState(todos.completed);
    const [updateMode, setUpdateMode] = useState(false);
    const [title, setTitle] = useState(todos.title);

    const deleteTodoHandler = async (id: string) => {
        const res = await deleteTodo(id);
        if (res.success) {
            onDelete(id);
        }
    }
    
    const updateTodoHandler = async (id: string) => {
        setCompleted(!completed);
        console.log(completed)
        const data: UpdateOPT = {id, title, category: todos.category, completed: !completed};
        updateTodo(data);
    }
    
    const submitHandler = async (id: string) => {
        const data: UpdateOPT = {id, title, category: todos.category, completed};
        await updateTodo(data);
        setUpdateMode(!updateMode);
    }
    

    return (
      <div className="flex items-center justify-between border rounded-md py-4 px-2">
            <div className="flex items-center gap-1">
                <input type="checkbox" checked={completed} onChange={() => updateTodoHandler(todos._id)} />
                {updateMode ? (
                    <form onSubmit={() => submitHandler(todos._id)} className="w-2xl flex items-center justify-between">
                        <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} className="border-2 px-1 mr-1" />
                        <button type="submit">
                            <Icon className="cursor-pointer text-success" icon="material-symbols:check-rounded" width="24" height="24" />
                        </button>
                    </form>
                ) : (
                    <div className="w-xl grid grid-cols-3">
                        <p className={`${completed && "text-muted-foreground line-through"}`}>{title}</p>
                        <p className="flex items-center justify-center">{ formatDate(new Date(todos.createdAt)) }</p>
                        <p className="flex items-center justify-center">{todos.category}</p>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-end gap-4">
                {completed ? (
                    <p className="text-success mr-4">
                        completed
                    </p>
                ) : (!updateMode &&
                        <Icon onClick={() => setUpdateMode(!updateMode)} className="cursor-pointer" icon="jam:pencil" width="24" height="24" />
                    )
                }
                <Icon onClick={() => deleteTodoHandler(todos._id)} className="cursor-pointer text-red-500" icon="mingcute:delete-line" width="24" height="24" />
            </div>
      </div>
  );
}

export default TodoCard