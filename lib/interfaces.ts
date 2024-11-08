export interface ProviderProps {
  api_var: string;
  arr_key: string;
  search_var: string;
  base_url: string;
  api: {
    photos: string;
    search: string;
    random?: string;
  };
}

export interface APIKeyProps {
  unsplash?: string;
  pixabay?: string;
  pexels?: string;
  [key: string]: any | undefined;
}

export interface ResultsProps {
  total: any;
  results: ResultProps;
}

export interface ResultProps {
  id: any;
  permalink: any;
  likes: any;
  alt: any;
  caption: any;
  title: any;
  attribution: any;
  extension: any;
  dimensions: any;
  urls: {
    thumb: any;
    img: any;
    full: any;
    download_url: any;
  };
  user: {
    id: any;
    name: any;
    photo: any;
    url: any;
  };
  [key: string]: any | undefined;
}

export interface URLProps {
  version?: number | string;
  provider?: string;
  type?: string;
  client_id?: string;
  key?: string;
  [key: string]: any | undefined;
}

export interface ParamProps {
  provider?: string | undefined;
  per_page?: string;
  id?: string;
  [key: string]: any | undefined;
}

export interface DataProps {
  hits?: any;
  photos?: any;
  results?: any;
  total?: any;
  [key: string]: any | undefined;
}
