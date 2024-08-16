export type DropdownMenuProps = {
  pages: Page[];
  isLoading: boolean; // Indicates if the data is loading
  error: string | null;
  onLinkClick: () => void;
};

export type Page = {
  id: number;
  title: {
    rendered: string;
  };
};
