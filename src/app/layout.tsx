import type {Metadata} from "next";
import "./globals.css";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
    title: "TP1 secu web",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body
            className={`antialiased flex flex-col min-h-screen`}
        >
        <main className="flex-1">{children}</main>
        <Footer/>
        </body>
        </html>
    );
}
