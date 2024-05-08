import { ReactNode } from "react"

export function Footer({ children }: { children: ReactNode }) {
    return (
        <footer className="bg-primary text-primary-foreground flex justify-center px-4 bottom-0 h-14">
            {children}
        </footer>
    )
}
