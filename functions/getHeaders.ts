import { APIKeyProps } from '~/lib/interfaces';

/**
 * Build the API fetch headers.
 */
export default function getHeaders(provider: string, keys: APIKeyProps) {
  let headers = {};
  switch (provider) {
    case 'pexels':
      headers = {
        Authorization: keys.pexels
      };
      break;

    default:
      break;
  }

  return headers;
}
