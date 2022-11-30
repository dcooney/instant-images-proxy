export interface APIKeyProps {
  unsplash?: string;
  pixabay?: string;
  pexels?: string;
  [key: string]: any | undefined;
}

export interface URLProps {
  provider?: string;
  dest?: string;
  client_id?: string;
  key?: string;
  [key: string]: any | undefined;
}

export interface ParamProps {
  provider?: string | undefined;
  search?: string | undefined;
  per_page?: string;
  [key: string]: any | undefined;
}

export interface DataProps {
  hits?: any;
  photos?: any;
  results?: any;
  [key: string]: any | undefined;
}
