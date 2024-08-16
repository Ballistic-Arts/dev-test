"use client";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import fetcher from "@/app/utils/fetcher";
import useSWR from "swr";
import generateUrlSlug from "@/app/utils/generateUrlSlug";
import { PostType } from "@/app/types/blogPost";
import sanitizeHtml from "@/app/utils/sanitizeHTML";
import { MediaData } from "@/app/types/media";
import { API_URLS } from "@/app/utils/apiConfig";

export default function PostCard({
  post,
  index,
}: {
  post: PostType;
  index: number;
}) {
  // Error is handled globally. Specific handling could be added.
  // The Loading state is handled in the Posts page component when PostCards load, but it could be handled here instead.

  const {
    data: imageData,
    isLoading,
    error,
  } = useSWR<MediaData>(
    post.featured_media > 0 ? `${API_URLS.MEDIA_BASE}/${post.featured_media}` : null,
    fetcher
  );

  // Clean up the HTML that we receive from the API
  const cleanHTMLExcerpt = sanitizeHtml(post.excerpt.rendered);

  const urlSlug = `${post.id}_${generateUrlSlug(post.title.rendered)}`;

  return (
    <>
      <Link href={`/posts/${urlSlug}`}>
        <li
          key={post.id}
          className={classNames(
            "p-4 border-2 rounded-lg",
            index === 0 ? "bg-blue-300 border-blue-300" : "border-gray-200"
          )}
        >
          <h3 className="text-2xl font-semibold mb-2">{post.title.rendered}</h3>
          {imageData?.media_details.sizes.large && (
            //TODO: Make images blurry at the beginning, add appropriate alt text (maybe from the API), and adjust the dimensions
            <Image
              src={imageData?.media_details.sizes.large.source_url}
              alt="Featured Media"
              width={imageData?.media_details.sizes.large.width}
              height={imageData?.media_details.sizes.large.height}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: cleanHTMLExcerpt }} />
        </li>
      </Link>
    </>
  );
}
