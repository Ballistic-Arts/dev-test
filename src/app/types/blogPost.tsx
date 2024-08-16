export type PostType = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  acf: any[]; // Adjust the type based on the actual structure of ACF data if needed
  _links: {
    self: any[];
    collection: any[];
    about: any[];
    author: any[];
    replies: any[];
    [key: string]: any; // Index signature for additional dynamic links
  };
};

export type DetailedPostType = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export type DetailedPostSearchParams = {
  id: string;
};

export type DetailedPostProps = {
  params: DetailedPostSearchParams;
};
