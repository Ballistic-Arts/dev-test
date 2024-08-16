"use client";
import useSWR from "swr";
import fetcher from "@/app/utils/fetcher";
import Link from "next/link";
import { useRef, useState } from "react";
import DropdownMenu from "../DropdownMenu";
import { Page } from "@/app/types/blogPage";
import { API_URLS } from "@/app/utils/apiConfig";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    data: pages,
    error,
    isLoading,
  } = useSWR<Page[]>(API_URLS.PAGES_ALL, fetcher);

  const handleDropdownToggle = () => setIsDropdownOpen((prev) => !prev);

  const handleDropdownClose = () => setIsDropdownOpen(false);

  return (
    <header className="bg-gray-800 text-white fixed w-full z-50">
      <nav className="container mx-auto p-4 flex max-w-[1024px] ">
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/posts" className="hover:underline">
            Posts
          </Link>
          <div
            className="relative"
            ref={dropdownRef}
            tabIndex={0}
            onBlur={(e) => {
              if (!dropdownRef.current?.contains(e.relatedTarget)) {
                setIsDropdownOpen(false);
              }
            }}
          >
            <button onClick={handleDropdownToggle} className="hover:underline">
              Pages
            </button>
            {isDropdownOpen && (
              <DropdownMenu
                pages={pages || []}
                isLoading={isLoading}
                error={error}
                onLinkClick={handleDropdownClose}
              />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
