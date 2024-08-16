export type MediaSize = {
  source_url: string;
  width: number;
  height: number;
};

export type MediaDetails = {
  sizes: {
    large: MediaSize;
    // Include other sizes if necessary
  };
};

export type MediaData = {
  media_details: MediaDetails;
};
