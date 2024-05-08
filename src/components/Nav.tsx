import { ReactNode } from "react"

export function Nav({ children }: { children: ReactNode }) {
    return (
        <nav className="bg-primary text-primary-foreground flex px-4 items-center sticky z-10 top-0 h-14">
            {children}
        </nav>
    )
}
