import {useEffect, useState} from "react";
import Image from 'next/image';

import moonIcon from "@/../public/moon.svg";
import sunIcon from "@/../public/sun.svg";

export default function ThemeToggle() {

    const [currentTheme, setCurrentTheme] = useState("");

    useEffect(() => {
        let userTheme = window.localStorage.getItem("definedTheme");
        if (!userTheme) {
            userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        document.documentElement.dataset.theme = userTheme;
        setCurrentTheme(userTheme);
    }, []);

    const toggle = ()=>{
        const userTheme = window.localStorage.getItem("definedTheme");

        let newTheme:string;

        if (userTheme) {
            newTheme = userTheme === "dark" ? "light" : "dark";
        }
        else{
            newTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        }
        document.documentElement.dataset.theme = newTheme;
        window.localStorage.setItem("definedTheme", newTheme);
        setCurrentTheme(newTheme);
    }

    return (
        <button onClick={toggle}>
            <Image src={currentTheme === "dark" ? moonIcon : sunIcon} alt={"Toggle dark theme"}></Image>
        </button>
    )
}

