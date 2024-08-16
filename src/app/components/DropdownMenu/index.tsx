import { DropdownMenuProps } from "@/app/types/blogPage";
import generateUrlSlug from "@/app/utils/generateUrlSlug";
import Link from "next/link";

export default function DropdownMenu({
  pages,
  isLoading,
  error,
  onLinkClick,
}: DropdownMenuProps) {
  if (error) {
    return <p>Failed to fetch pages</p>;
  }
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <div className="max-w-[400px] pt-2x">
      {pages.map((page) => {
        const urlSlug = `${page.id}_${generateUrlSlug(page.title.rendered)}`; // Generate slug for each page
        return (
          <Link
            key={page.id}
            href={`/pages/${urlSlug}`}
            className="block px-4 py-2 hover:bg-gray-500"
            onClick={onLinkClick}
          >
            {page.title.rendered}
          </Link>
        );
      })}
    </div>
  );
}
