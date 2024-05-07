//custom interface for response from getPages()
interface PageType {
    link: string;
    title: {
      rendered: string;
    };
  }