import { API_URLS } from "@/app/utils/apiConfig";
import sanitizeHtml from "@/app/utils/sanitizeHTML";
import axios from "axios";

export default async function Page({ params }: { params: { id: string } }) {
  let page = null;

  // Loading state is handled using the loading.tsx file.
  // Errors are handled using the global error.tsx file.

  if (params.id) {
    const pageId = params.id.match(/^\d+/);
    if (pageId) {
      const { data } = await axios.get(
        `${API_URLS.PAGES_BASE}/${pageId[0]}?acf_format=standard&_fields=id,title,content,acf`
      );
      page = data;
    }
  }

  const cleanHTMLExcerpt = sanitizeHtml(page.content.rendered);

  if (!page) {
    return <div>Post not found</div>;
  }

  return (
    <div className="px-4">
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: cleanHTMLExcerpt }} />
    </div>
  );
}
