import { getPostMedia } from "@/lib/posts"
import Image from "next/image"

export async function CardImage({ mediaId }: { mediaId: number }) {
    const image = await getPostMedia(mediaId)

    return (
        <div className="relative overflow-hidden aspect-[500/300]">
            <Image
                src={image.link ? image.link : "/images/default-image.jpg"}
                alt={image.link ? image.title.rendered : "Default Image"}
                className="object-fill rounded-t-lg"
                fill
                style={{ objectFit: "cover" }}
                priority={true}
            />
        </div>
    )
}
