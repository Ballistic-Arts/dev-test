import React, { useEffect, useState } from "react";
import Wrapper from "@components/MainWrapper";
import Link from "next/link";

const Home = () => {
  const [posts, setPosts] = useState<PostsType[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function getRecentPosts() {
    try {
      setLoading(true);
      //get request to posts endpoint
      const postResponse = await fetch(
        //include per_page=4 parameter to query just a few (4) recent posts
        "https://dev-test.yourballistic.com/wp-json/wp/v2/posts?per_page=4",
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
      //identify posts with media, and join source_url to our existing post data
      const postsWithMedia = await Promise.all(
        //check each item for featured_media value
        postsData.map(async (post: PostsType) => {
          //if its not 0, media must exist, query the endpoint for featured_media
          if (post.featured_media !== 0) {
            const mediaResponse = await fetch(
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
      //set sorted data with media to our posts
      setPosts(sortedPosts);
      setLoading(false);
    } catch (error) {
      //catch errors if they arise
      console.error("Error fetching posts:", error);
    }
  }

  //invoke function once when the page loads
  useEffect(() => {
    getRecentPosts();
  }, []);

  //component for individual post items
  const PostItem = ({
    title,
    mediaLink,
    excerpt,
    media,
    id,
    index,
  }: {
    title: string;
    mediaLink: string;
    excerpt: string;
    media: number;
    id: number;
    index: number;
  }) => {
    //custom style for featured post, using index to determine if its 1st (most recent)
    const featuredBorder =
      index === 0 ? "border-indigo-500 bg-indigo-50" : "border-indigo-300";

    return (
      <div
        className={`p-5 border-4 ${featuredBorder} rounded-md shadow-md space-y-2`}
      >
        {index === 0 && (
          <div>
            <p className="font-bold text-indigo-800 text-3xl text-center">
              FEATURED POST
            </p>
          </div>
        )}
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
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <div>
          <Link href={`/${id}`}>
            <a className="text-indigo-700">Read More</a>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <h1 className="text-center font-thin text-5xl py-5 underline">
        Recent Posts
      </h1>
      <div className="grid grid-flow-row pb-10 pt-5 mb-14">
        <ul className="w-4/5 sm:w-2/3 mx-auto">
          {loading ? (
            <p className="font-bold text-3xl text-center">Loading...</p>
          ) : (
            <div className="space-y-5">
              {posts ? (
                <>
                  {/* if posts exists (if getRecentPosts() ran successfully) render posts in a list */}
                  {posts?.map((post, i) => (
                    <li key={i}>
                      {/* pass props backed by our custom interface to our component */}
                      <PostItem
                        index={i}
                        title={post.title.rendered}
                        excerpt={post.excerpt.rendered}
                        media={post.featured_media}
                        mediaLink={post.featured_media_data?.source_url}
                        id={post.id}
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

export default Home;
