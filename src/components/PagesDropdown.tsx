import { getPages } from "@/lib/pages"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "./ui/dropdown-menu"

export async function PagesDropdown() {
    const pages = await getPages()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <p className="p-4">Pages</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {pages.map((page: Page) => {
                    return (
                        <DropdownMenuItem
                            key={page.id}
                            className="cursor-pointer"
                            asChild
                        >
                            <Link href={`/pages/${page.id}`}>
                                {page.title.rendered}
                            </Link>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
