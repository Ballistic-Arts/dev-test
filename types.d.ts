type Post = {
    id: number
    date: string
    date_gmt: string
    guid: {
        rendered: string
    }
    modified: string
    modified_gmt: string
    slug: string
    status: string
    type: string
    link: string
    title: {
        rendered: string
    }
    content: {
        rendered: string
        protected: boolean
    }
    excerpt: {
        rendered: string
        protected: boolean
    }
    author: number
    featured_media: number
    comment_status: string
    ping_status: string
    sticky: boolean
    template: string
    format: string
    meta: {
        _acf_changed: boolean
        footnotes: string
    }
    categories: number[]
    tags: any[]
    acf: any[]
    _links: {
        self: any[]
        collection: any[]
        about: any[]
        author: any[]
        replies: any[]
        "version-history": any[]
        "wp:attachment": any[]
        "wp:term": any[]
        curies: any[]
    }
    code?: string
    message?: string
    data?: { status: number }
}

type Page = typeof Post
