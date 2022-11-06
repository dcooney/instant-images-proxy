export interface APIKeyProps {
  unsplash?: string;
  pixabay?: string;
  pexels?: string;
  [key: string]: any | undefined;
}

export interface URLProps {
  provider?: string;
  [key: string]: any | undefined;
}

export interface ParamProps {
  provider: string | undefined;
  per_page: string;
  [key: string]: any | undefined;
}
