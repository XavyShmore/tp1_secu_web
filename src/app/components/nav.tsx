"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) setIsSignedIn(false);
    }, []);

    const handleSignOut = async () => {
        const response = await fetch("/api/auth/sign-out", { method: "POST" });
        if (response.status === 200) {
            router.push("/sign-in");
        }
    };

    if (!isSignedIn) return null;

    return (
        <>
            {isSignedIn && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            )}



            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50"
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg p-6 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300`}
                onClick={(e) => e.stopPropagation()} // Prevent overlay from closing sidebar on click
            >
                <h2 className="text-xl font-bold mb-8"></h2>
                <ul className="space-y-4">
                    <li>
                        <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                            Profile
                        </a>
                    </li>
                    <li>
                        <button
                            onClick={handleSignOut}
                            className="block w-full text-left p-2 hover:bg-gray-700 rounded cursor-pointer"
                        >
                            Sign out
                        </button>
                    </li>
                </ul>
            </div>

        </>

)}

export default Nav;
