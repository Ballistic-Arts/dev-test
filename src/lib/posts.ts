export async function getSortedPosts() {
    const res = await fetch(
        "https://dev-test.yourballistic.com/wp-json/wp/v2/posts"
    )

    const data: Post[] = await res.json()

    return data.sort((a, b) =>
        Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
    )
}

export async function getPost(postId: number) {
    const res = await fetch(
        `https://dev-test.yourballistic.com/wp-json/wp/v2/posts/${postId}`
    )

    const data: Post = await res.json()

    return data
}

export async function getPostMedia(mediaId: number) {
    const res = await fetch(
        `https://dev-test.yourballistic.com/wp-json/wp/v2/media/${mediaId}`
    )

    const data = await res.json()

    return data
}
