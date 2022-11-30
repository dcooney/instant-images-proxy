import { APIKeyProps, ParamProps } from '~/lib/interfaces';
import getAPIVar from './getAPIVar';

/**
 * Build the API URL.
 */
export default function getURL(
  provider: string,
  params: ParamProps,
  keys: APIKeyProps
): string {
  const { dest } = params;

  if (params.dest) {
    // Delete `dest` from params.
    delete params.dest;
  }

  if (params.search) {
    // Delete `search` from params.
    delete params.search;
  }

  // Build query params.
  const queryParams = {
    ...params,
    ...getAPIVar(provider, keys[provider])
  };

  // Build the URL.
  const url = new URL(dest);
  Object.keys(queryParams).forEach(key => {
    url.searchParams.append(key, queryParams[key]);
  });

  return url?.href;
}
