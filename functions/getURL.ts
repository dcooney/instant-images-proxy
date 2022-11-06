import config from '~/lib/config';
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
  if (params.provider) {
    // Delete provider from params.
    delete params.provider;
  }
  if (params.client_id) {
    // Delete client_id from params.
    delete params.client_id;
  }

  const queryParams = { ...params, ...getAPIVar(provider, keys[provider]) };

  const url = new URL(config[provider as keyof typeof config].photo_api);
  Object.keys(queryParams).forEach(key => {
    url.searchParams.append(key, queryParams[key]);
  });

  return url?.href;
}
