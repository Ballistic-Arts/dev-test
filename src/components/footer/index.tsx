import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    // fixed to the bottom of the page, to always be in view
    <div className="text-center py-5 bg-indigo-700 fixed bottom-0 w-full">
      <ul className="flex justify-center items-center">
        <li className="mx-3">
          <Image
            src="/icons/twitter-icon.svg"
            alt="nextjs"
            width="28"
            height="28"
          />
        </li>
        <li className="mx-3">
          <Image
            src="/icons/youtube-icon.svg"
            alt="youtube"
            width="28"
            height="29"
          />
        </li>
        <li className="mx-3">
          <Image
            src="/icons/linkedin-icon.svg"
            alt="linkedin"
            width="28"
            height="32"
          />
        </li>
      </ul>
    </div>
  );
};
