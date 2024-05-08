import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Nav } from "@/components/Nav"
import Link from "next/link"
import { Footer } from "@/components/Footer"
import { PagesDropdown } from "@/components/PagesDropdown"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
    title: "DevTest",
    description: "Created by Ernesto Cortés",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "flex flex-col bg-background min-h-screen font-sans antialiased",
                    inter.variable
                )}
            >
                <Nav>
                    <Link className="font-bold text-lg p-4" href="/">
                        DevTest
                    </Link>
                    <Link className="p-4" href="/">
                        Home
                    </Link>
                    <Link className="p-4" href="/posts">
                        Posts
                    </Link>
                    <PagesDropdown />
                </Nav>
                <main className="flex-1 container py-10">{children}</main>
                <Footer>
                    <p className="p-4">DevTest &copy; 2024</p>
                </Footer>
            </body>
        </html>
    )
}
