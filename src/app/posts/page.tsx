import axios from "axios";
import PostCard from "../components/PostCard";
import { PostType } from "../types/blogPost";
import { API_URLS } from "../utils/apiConfig";

export default async function PostList({ limit = 20 }) {
  const { data: posts } = await axios.get<PostType[]>(
    `${API_URLS.POSTS_BASE}?acf_format=standard&orderby=date&_fields=id,title,featured_media,excerpt&per_page=${limit}`
  );
  return (
    <div className="container mx-auto px-4 items-center">
      <h1 className="text-4xl font-bold my-8">
        {limit === 20 ? "All Posts" : "Recent Posts"}
      </h1>
      <ul className="space-y-6 grid">
        {posts.map((post, index) => (
          <PostCard key={post.id} index={index} post={post} />
        ))}
      </ul>
    </div>
  );
}
