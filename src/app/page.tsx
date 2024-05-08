import { PageHeader } from "@/components/PageHeader"
import { PostCard } from "@/components/PostCard"
import { getPages } from "@/lib/pages"
import { getSortedPosts } from "@/lib/posts"
import Link from "next/link"

export default async function Home() {
    const posts = await getSortedPosts()

    const featuredPost = posts.shift()

    return (
        <>
            {featuredPost && (
                <div className="w-full">
                    <PostCard post={featuredPost} />
                </div>
            )}
            <div className="text-center my-16">
                <PageHeader>Recent Posts</PageHeader>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(0, 6).map((post: Post) => {
                    return <PostCard key={post.id} post={post} />
                })}
            </div>
            <div className="mt-8 text-center">
                <Link className="text-lg" href="/posts">
                    See All Posts →
                </Link>
            </div>
        </>
    )
}
