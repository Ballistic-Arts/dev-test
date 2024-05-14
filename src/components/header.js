"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [pages, setPages] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchPages() {
      const res = await fetch('https://dev-test.yourballistic.com/wp-json/wp/v2/pages');
      const data = await res.json();
      setPages(data);
    }

    fetchPages();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const showDropdown = () => {
    clearTimeout(timeoutRef.current);
    setHovered(true);
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setHovered(false);
      setDropdownVisible(false);
    }, 200); // Adjust delay as needed
  };

  const timeoutRef = useRef(null);

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-2xl font-bold">
            <span className="flex items-center">
              <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-2" />
              BA TEST
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 relative">
          <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <Link href="/posts" className="hover:text-blue-500 transition-colors">Posts</Link>
          <div
            className="relative"
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
            ref={dropdownRef}
          >
            <button
              className="focus:outline-none hover:text-blue-500 transition-colors"
              onClick={toggleDropdown}
            >
              Pages
            </button>
            {(dropdownVisible || hovered) && (
              <div
                className="absolute mt-2 right-0 bg-white text-black rounded shadow-lg w-48 z-50"
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                {pages.map((page) => (
                  <Link key={page.id} href={`/site-pages/${page.id}`} className="block px-4 py-2 hover:bg-gray-200">
                    {page.title.rendered}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
