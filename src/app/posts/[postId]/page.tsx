import { PageHeader } from "@/components/PageHeader"
import { getPost } from "@/lib/posts"
import getFormattedDate from "@/lib/utils"
import { notFound } from "next/navigation"

export async function generateMetadata({
    params,
}: {
    params: { postId: number }
}) {
    const { postId } = params
    const post = await getPost(postId)

    if (post?.data?.status === 404) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: post.title.rendered,
    }
}

export default async function PostPage({
    params,
}: {
    params: { postId: number }
}) {
    const { postId } = params

    const post = await getPost(postId)

    if (post?.data?.status === 404) {
        return notFound()
    }

    return (
        <>
            <PageHeader>{post.title.rendered}</PageHeader>
            <p className="mb-8">{getFormattedDate(post.date)}</p>
            <div
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            ></div>
        </>
    )
}
