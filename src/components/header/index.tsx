import React, { useEffect, useState } from "react";
import Link from "next/link";
import ArrowIcon from "@public/icons/ArrowIcon";

//header component containing 3 buttons - Home, Posts, Pages/Dropdown
export const Header: React.FC = () => {
  //states for dropdown and data
  const [showDropDown, setShowDropDown] = useState(false);
  const [pageData, setPageData] = useState<PageType[] | undefined>(undefined);

  //function to recieve pages from /pages
  async function getPages() {
    try {
      //GET request to pages endpoint
      const response = await fetch(
        "https://dev-test.yourballistic.com/wp-json/wp/v2/pages",
        {
          method: "GET",
        }
      );
      //handle network error if it arises
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const pagesData = await response.json();
      //set data for it to be used in the dropdown
      setPageData(pagesData);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  }

  //run getPages() once when the component loads
  useEffect(() => {
    getPages();
  }, []);

  return (
    <div className="relative">
      <div className="grid grid-flow-row sm:flex justify-center sm:justify-between items-center bg-indigo-600 py-5 px-20 space-y-5 sm:space-y-0">
        {/* title */}
        <p className="text-white font-bold text-4xl text-center sm:text-left">Pages & Posts App</p>
        {/* buttons */}
        <div className="flex space-x-5">
          <Link href={"/"}>
            <button className="bg-indigo-50 shadow-md px-3 py-2 rounded-md hover:scale-110 transform transition-transform duration-300 ease-in-out">
              <p className="text-indigo-800 font-bold">Home</p>
            </button>
          </Link>
          <Link href={"/posts"}>
            <button className="bg-indigo-50 shadow-md px-3 py-2 rounded-md hover:scale-110 transform transition-transform duration-300 ease-in-out">
              <p className="text-indigo-800 font-bold">Posts</p>
            </button>
          </Link>
          <button
            className="bg-indigo-50 shadow-md px-3 py-2 rounded-md"
            //onclick set state of dropdown to inverse of dropdown state (toggle on/off)
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <div className="flex items-center space-x-2">
              <p className="text-indigo-800 font-bold">Pages</p>
              <ArrowIcon />
            </div>
          </button>
          {/* if showDropdown is true, show dropdown, positioned absolutely */}
          {showDropDown && (
            <div className="bg-indigo-50 absolute rounded-md w-5/6 right-8 sm:w-1/5 top-44 sm:top-16 sm:right-20 shadow-md">
              <ul>
                {pageData ? (
                  pageData?.map((page, i) => (
                    <Link key={i} href={page.link}>
                      <li className="text-indigo-900 font-semibold border-b-2 hover:bg-indigo-300 transform transition-transform duration-300 ease-in-out cursor-pointer py-2 px-1">
                        {page.title.rendered}
                      </li>
                    </Link>
                  ))
                ) : (
                  // if there are no pages
                  <p>No pages currently</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
