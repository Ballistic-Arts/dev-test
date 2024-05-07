import Wrapper from "@components/MainWrapper";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState<PostsType[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  //function to recieve all posts from /posts endpoint
  async function getAllPosts() {
    try {
      setLoading(true);
      //GET request to /posts endpoint
      const postResponse = await fetch(
        "https://dev-test.yourballistic.com/wp-json/wp/v2/posts",
        {
          method: "GET",
        }
      );
      //handle network error
      if (!postResponse.ok) {
        setLoading(false);
        throw new Error("Network response error for posts");
      }

      const postsData = await postResponse.json();
      //identify posts with media, and join source_url to our existing postsData
      const postsWithMedia = await Promise.all(
        //check each item for featured_media value
        postsData.map(async (post: PostsType) => {
          //if its not 0, media must exist, query the /media endpoint for media
          if (post.featured_media !== 0) {
            const mediaResponse = await fetch(
              // use featured_media (id) as a param
              `https://dev-test.yourballistic.com/wp-json/wp/v2/media/${post.featured_media}`
            );
            if (mediaResponse.ok) {
              const mediaData = await mediaResponse.json();
              post.featured_media_data = mediaData;
            }
          }
          return post;
        })
      );
      //sort data using date by descending order
      const sortedPosts = postsWithMedia.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      //set sorted data with media links to our posts data
      setPosts(sortedPosts);
      setLoading(false);
    } catch (error) {
      //catch errors if they arise
      console.error("Error fetching posts:", error);
    }
  }

  //invoke function once when the page loads
  useEffect(() => {
    getAllPosts();
  }, []);

  //component for individual post items
  const PostItem = ({
    title,
    mediaLink,
    content,
    media,
    id,
  }: {
    title: string;
    mediaLink: string;
    content: string;
    media: number;
    id: number;
  }) => {
    return (
      <div
        className={`p-5 border-4 "border-indigo-300" rounded-md shadow-md space-y-2 overflow-hidden`}
      >
        <h2 className="font-bold text-xl">{title}</h2>
        {/* some posts have a featured_media value of 0 */}
        {/* if its zero, theres no media, otherwise if its not zero thats the id of the media */}
        {media !== 0 && (
          <img
            className="rounded-md shadow-md w-3/5 mx-auto"
            src={mediaLink}
            alt={title}
          />
        )}
        {/* render excerpt without the <p></p> tags using dangerouslySetInnerHTML*/}
        <p
          className="font-light"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <p></p>
        <div>
          <Link href={`/${id}`}>
            <a className="text-indigo-700">View Individual Post</a>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <h1 className="text-center font-thin text-5xl py-5 underline">
        All Posts
      </h1>
      <div className="grid grid-flow-row justify-center pb-10 pt-5 mb-14 ">
        <ul className="w-4/5 sm:w-2/3 mx-auto">
          {/* show loading */}
          {loading ? (
            <p className="font-bold text-3xl text-center">Loading...</p>
          ) : (
            <div className="space-y-5">
              {posts ? (
                <>
                  {/* if posts exists (if getAllPosts() ran successfully) render posts in a list */}
                  {posts?.map((post, i) => (
                    <li key={i}>
                      {/* pass props backed by our custom interface to our component */}
                      <PostItem
                        id={post.id}
                        title={post.title.rendered}
                        content={post.content.rendered}
                        media={post.featured_media}
                        mediaLink={post.featured_media_data?.source_url}
                      />
                    </li>
                  ))}
                </>
              ) : (
                <div>
                  {/* handle case of no posts */}
                  <p className="font-bold text-3xl text-center">
                    There are no posts!
                  </p>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Posts;
