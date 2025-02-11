'use client'

import { useState, useEffect } from "react";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    useEffect(() => {
        if (todos.length) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = () => {
        if (input.trim()) {
            const newTodo = {
                id: Date.now().toString(),
                text: input,
                completed: false
            };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setInput("");
        }
    };

    const toggleTodo = (id: string) => {
        setTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center p-16 text-center">
            <h1 className="text-2xl font-bold">Todo List</h1>

            <div className="mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter new todo"
                    className="p-2 border border-gray-300 text-black rounded-3xl"
                />
                <button
                    onClick={addTodo}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-3xl"
                >
                    Add Todo
                </button>
            </div>

            <ul className="mt-6">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`flex items-center justify-between mt-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                    >
                        <span>{todo.text}</span>
                        <div>
                            <button
                                onClick={() => toggleTodo(todo.id)}
                                className="mx-2 p-1 bg-green-500 text-white rounded-3xl"
                            >
                                {todo.completed ? "Undo" : "Complete"}
                            </button>
                            <button
                                onClick={() => removeTodo(todo.id)}
                                className="p-1 bg-red-500 text-white rounded-3xl"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
