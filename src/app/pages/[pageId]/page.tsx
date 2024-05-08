import { PageHeader } from "@/components/PageHeader"
import { getPage } from "@/lib/pages"
import getFormattedDate from "@/lib/utils"
import { notFound } from "next/navigation"

export async function generateMetadata({
    params,
}: {
    params: { pageId: number }
}) {
    const { pageId } = params
    const page = await getPage(pageId)

    if (page?.data?.status === 404) {
        return {
            title: "page Not Found",
        }
    }

    return {
        title: page.title.rendered,
    }
}

export default async function PagePage({
    params,
}: {
    params: { pageId: number }
}) {
    const { pageId } = params

    const page = await getPage(pageId)

    if (page?.data?.status === 404) {
        return notFound()
    }

    return (
        <>
            <PageHeader>{page.title.rendered}</PageHeader>
            <p className="mb-8">{getFormattedDate(page.date)}</p>
            <div
                className="overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            ></div>
        </>
    )
}
