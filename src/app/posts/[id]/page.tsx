import { DetailedPostProps, DetailedPostType } from "@/app/types/blogPost";
import { API_URLS } from "@/app/utils/apiConfig";
import sanitizeHtml from "@/app/utils/sanitizeHTML";
import axios from "axios";

export default async function DetailedPost({ params }: DetailedPostProps) {
  let post: DetailedPostType | null = null;

  // Loading state is handled using the loading.tsx file.
  // Errors are handled using the global error.tsx file.
  if (params.id) {
    const postId = params.id.match(/^\d+/);
    if (postId) {
      const { data } = await axios.get<DetailedPostType>(
        `${API_URLS.POSTS_BASE}/${postId[0]}?acf_format=standard&_fields=id,title,content,acf`
      );
      post = data;
    }
  }

  // Clean up the HTML that we receive from the API
  const cleanHTMLExcerpt = post ? sanitizeHtml(post.content.rendered) : "";

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="px-4">
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: cleanHTMLExcerpt }} />
    </div>
  );
}
