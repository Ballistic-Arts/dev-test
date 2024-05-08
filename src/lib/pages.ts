export async function getPages() {
    const res = await fetch(
        "https://dev-test.yourballistic.com/wp-json/wp/v2/pages"
    )

    const data: Page[] = await res.json()

    return data
}

export async function getPage(pageId: number) {
    const res = await fetch(
        `https://dev-test.yourballistic.com/wp-json/wp/v2/pages/${pageId}`
    )

    const data: Page = await res.json()

    return data
}
