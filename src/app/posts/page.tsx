import { PageHeader } from "@/components/PageHeader"
import { PostCard } from "@/components/PostCard"
import { getSortedPosts } from "@/lib/posts"

export default async function PostsPage() {
    const posts = await getSortedPosts()

    return (
        <>
            <PageHeader>Posts</PageHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: Post) => {
                    return <PostCard key={post.id} post={post} />
                })}
            </div>
        </>
    )
}
