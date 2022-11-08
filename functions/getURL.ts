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

  if (params.provider) {
    // Delete `provider` from params.
    delete params.provider;
  }
  if (params.dest) {
    // Delete `dest` from params.
    delete params.dest;
  }

  // Build query params.
  const queryParams = {
    ...params,
    ...getAPIVar(provider, keys[provider])
  };

  // G
  const url = new URL(dest);
  Object.keys(queryParams).forEach(key => {
    url.searchParams.append(key, queryParams[key]);
  });

  return url?.href;
}
