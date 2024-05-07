import Wrapper from "@components/MainWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostPage = () => {
  const router = useRouter();
  // Fetch the individual post data using the postId from next/router
  const { postId } = router.query;
  const [post, setPost] = useState<PostsType | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function getSinglePost() {
    try {
      setLoading(true);
      // Get request to the post endpoint
      const postResponse = await fetch(
        `https://dev-test.yourballistic.com/wp-json/wp/v2/posts/${postId}`,
        {
          method: "GET",
        }
      );
      // Handle network error
      if (!postResponse.ok) {
        setLoading(false);
        throw new Error("Network response error for posts");
      }

      const postData = await postResponse.json();
      console.log("postData", postData);

      // Set the post state
      setPost(postData);
      setLoading(false);
    } catch (error) {
      // Catch errors if they arise
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getSinglePost();
  }, []);

  return (
    <Wrapper>
      <div className="mb-20 space-y-5 p-10">
        {/* show loading */}
        {loading ? (
          <h1 className="font-bold text-5xl">Loading...</h1>
        ) : (
          <>
            {post ? (
              <>
                <h1 className="font-bold text-5xl">{post.title.rendered}</h1>
                <p
                  className="font-light"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </>
            ) : (
              // if no post, show the user
              <>
                <p>No Content To Display</p>
              </>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default PostPage;
