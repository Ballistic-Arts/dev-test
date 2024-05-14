"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loading from '../../components/loading';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://dev-test.yourballistic.com/wp-json/wp/v2/posts');
        const data = await res.json();

        const postsWithMedia = await Promise.all(
          data.map(async post => {
            if (post._links && post._links["wp:featuredmedia"]) {
              const mediaRes = await fetch(post._links["wp:featuredmedia"][0].href);
              const mediaData = await mediaRes.json();
              post.featured_media_src_url = mediaData.source_url;
            }
            return post;
          })
        );

        setPosts(postsWithMedia);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Posts</h1>
      <div className="flex flex-col items-center space-y-4">
        {posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`} className="block w-full md:w-2/3 lg:w-3/4 xl:w-2/3">
            <div className="post bg-gray-100 p-4 pb-12 rounded transition-transform transform hover:scale-105 cursor-pointer relative">
              <h3 className="text-xl font-bold mb-2">{post.title.rendered}</h3>
              {post.featured_media_src_url && (
                <img
                  src={post.featured_media_src_url}
                  alt={post.title.rendered}
                  className="w-full mb-4 rounded"
                />
              )}
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <span className="absolute bottom-4 left-4 text-blue-500 hover:text-blue-700 transition-colors">Read More</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
