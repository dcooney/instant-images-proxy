import { APIKeyProps, ParamProps } from '~/lib/interfaces';
import providers from '~/lib/providers';
import getAPIVar from './getAPIVar';

/**
 * Build the API URL.
 */
export default function getURL(
  api_url: string,
  provider: string,
  params: ParamProps,
  keys: APIKeyProps
): string {
  /**
   * Download (Unsplash only).
   * @see https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
   */
  if (params.download_url) {
    api_url = params.download_url; // Create download URL.
    delete params?.download_url;
  }

  // Search.
  if (params.term) {
    params[providers[provider as keyof typeof providers].search_var] =
      params.term;
    delete params?.term;
  }

  // Search by ID.
  if (params.type === 'search' && params.id) {
    switch (provider) {
      case 'unsplash':
        api_url = `${
          providers[provider as keyof typeof providers]?.api?.photos
        }${params.id}`;
        break;
      default:
        break;
    }
  }

  // Delete the following params before sending API request to providers.
  delete params?.provider;
  delete params?.type;
  delete params?.id;
  delete params?.test;

  // Build query params.
  const queryParams = {
    ...params,
    ...getAPIVar(provider, keys[provider])
  };

  // Build the URL.
  const url = new URL(api_url);
  Object.keys(queryParams).forEach(key => {
    url.searchParams.append(key, queryParams[key]);
  });

  return url?.href;
}
