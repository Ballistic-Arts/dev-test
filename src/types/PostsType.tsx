//custom interface for expected response from the /posts endpoint, used in multiple files
interface PostsType {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  featured_media_data: {
    source_url: string;
  };
  link: string;
  date: string;
  content: {
    rendered: string;
  };
}
