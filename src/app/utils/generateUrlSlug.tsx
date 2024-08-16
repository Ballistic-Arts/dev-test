/**
 * Generates a URL-friendly slug from a given text string.
 * - Converts the text to lowercase.
 * - Trims any leading or trailing whitespace.
 * - Replaces spaces with hyphens.
 * - Removes any non-alphanumeric characters except for dots and hyphens.
 * - Replaces multiple consecutive hyphens with a single hyphen.
 */

const generateUrlSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\.\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export default generateUrlSlug;
