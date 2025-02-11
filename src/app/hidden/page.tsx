'use client'

import React, {useEffect, useState} from "react";
import TodoList from "@/app/components/todo-list";

interface user {
    name: string;
    email: string;
}

export default function Hidden() {
    const [user, setUser] = useState<user | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/profile");
                if (response.status === 200) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    console.error("Could not find user");
                }
            } catch (error) {
                console.error("Query error : ", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserData();
    }, []);

    const handleSignOut = async () => {
        const response = await fetch("/api/auth/sign-out", {method: "POST"});
        if (response.status === 200) {
            window.location.reload();
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <p>No user found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <p>Congratulations <b>{user.name}</b>, you have accessed the hidden page</p>
            <p>If you want to sign out click on button below : </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
                    onClick={handleSignOut}>
                Sign out
            </button>
            <TodoList/>
        </div>
    );
}