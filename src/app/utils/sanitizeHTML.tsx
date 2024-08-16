import DOMPurify from "isomorphic-dompurify";

// Clean up the HTML that we receive from the API
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    FORBID_TAGS: ["style", "script", "iframe"],
    ALLOWED_TAGS: ["p", "h2", "ul", "li", "img", "video", "blockquote", "div"],
  });
};

export default sanitizeHtml;
