"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loading from '../components/loading';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://dev-test.yourballistic.com/wp-json/wp/v2/posts');
        const data = await res.json();

        if (data.length > 0) {
          const featuredPost = data[0];

          if (featuredPost._links && featuredPost._links["wp:featuredmedia"]) {
            const mediaRes = await fetch(featuredPost._links["wp:featuredmedia"][0].href);
            const mediaData = await mediaRes.json();
            featuredPost.featured_media_src_url = mediaData.source_url;
          }

          setPosts(data);
          setFeaturedPost(featuredPost);
        }
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
      {featuredPost && (
        <div>
          <h1 className="text-4xl font-bold mb-6">Featured Post</h1>
          <Link href={`/posts/${featuredPost.id}`} className="block">
            <div className="featured-post bg-gray-200 p-6 pb-12 rounded mb-8 transition-transform transform hover:scale-105 cursor-pointer relative">
              <h2 className="text-3xl font-bold mb-2">{featuredPost.title.rendered}</h2>
              {featuredPost.featured_media_src_url && (
                <img
                  src={featuredPost.featured_media_src_url}
                  alt={featuredPost.title.rendered}
                  className="w-full mb-4 rounded"
                />
              )}
              <div dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }} />
              <span className="absolute bottom-4 left-4 text-blue-500 hover:text-blue-700 transition-colors">Read More</span>
            </div>
          </Link>
        </div>
      )}
      <h2 className="text-3xl font-bold mb-6">Recent Posts</h2>
      <div className="recent-posts grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.slice(1).map(post => (
          <Link key={post.id} href={`/posts/${post.id}`} className="block">
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
