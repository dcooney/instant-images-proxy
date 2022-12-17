export interface ProviderProps {
  api_var: string;
  arr_key: string;
  search_var: string;
  base_url: string;
  api: {
    photos: string;
    search: string;
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
