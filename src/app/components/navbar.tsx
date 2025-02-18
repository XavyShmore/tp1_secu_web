import ThemeToggle from "@/app/components/themeToggle";

export default function Navbar() {
    return (
        <ul className={"navbar"}>
            <li><div>Test</div></li>
            <li><div></div></li>
            <li className={"right"}><div><ThemeToggle></ThemeToggle></div></li>
        </ul>
    )
}