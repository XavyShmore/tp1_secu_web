'use client'

import {useRouter} from "next/navigation";

export default function Footer() {
    const router = useRouter();
    return (
        <footer className="text-center p-12 border-t cursor-pointer" onClick={() => router.push("/")}>
            <b>TP1 - GLO-3202</b>
        </footer>
    )
}