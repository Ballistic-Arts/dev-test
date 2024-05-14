"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SitePages() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function fetchPages() {
      const res = await fetch('https://dev-test.yourballistic.com/wp-json/wp/v2/pages');
      const data = await res.json();
      setPages(data);
    }

    fetchPages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Site Pages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pages.map(page => (
          <div key={page.id} className="page bg-gray-100 p-4 rounded transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold mb-2">{page.title.rendered}</h3>
            <Link href={`/site-pages/${page.id}`}>
              <span className="text-blue-500 hover:text-blue-700 transition-colors">Read More</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
