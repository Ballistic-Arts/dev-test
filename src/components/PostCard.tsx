import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { CardImage } from "./CardImage"
import getFormattedDate from "@/lib/utils"

export function PostCard({ post }: { post: Post }) {
    return (
        <Link href={`/posts/${post.id}`} className="flex flex-col">
            <CardImage mediaId={post.featured_media} />
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>{post.title.rendered}</CardTitle>
                    <CardDescription>
                        {getFormattedDate(post.date)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                        }}
                    ></div>
                </CardContent>
            </Card>
        </Link>
    )
}
