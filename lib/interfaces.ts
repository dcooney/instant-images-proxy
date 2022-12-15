export interface APIKeyProps {
  unsplash?: string;
  pixabay?: string;
  pexels?: string;
  [key: string]: any | undefined;
}

export interface ResultsProps {
  total: any;
  results: string;
}

export interface ResultObjectProps {
  id: any;
  permalink: any;
  likes: any;
  urls: {
    thumb: any;
    img: any;
    full: any;
    alt: any;
    download_url: any;
  };
  user: {
    username: any;
    name: any;
    photo: any;
    url: any;
  };
  [key: string]: any | undefined;
}

export interface URLProps {
  provider?: string;
  type?: string;
  client_id?: string;
  key?: string;
  [key: string]: any | undefined;
}

export interface ParamProps {
  provider?: string | undefined;
  per_page?: string;
  [key: string]: any | undefined;
}

export interface DataProps {
  hits?: any;
  photos?: any;
  results?: any;
  total?: any;
  [key: string]: any | undefined;
}
