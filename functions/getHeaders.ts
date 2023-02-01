import { APIKeyProps } from '~/lib/interfaces';
import providers from '~/lib/providers';

/**
 * Build the API fetch request headers.
 */
export default function getHeaders(provider: string, keys: APIKeyProps) {
  let headers = {};
  switch (provider) {
    case 'pexels':
      headers = {
        Authorization: keys.pexels,
      };
      break;

    default:
      break;
  }

  return headers;
}

/**
 * Build the API response headers for the frontend application.
 *
 * @see https://unsplash.com/documentation#rate-limiting
 * @see https://pixabay.com/api/docs/
 * @see https://www.pexels.com/api/documentation/#statistics
 */
export function getResponseHeaders(
  provider: string,
  res: Response
): HeadersInit {
  const xratelimit = res.headers.get('X-Ratelimit-Limit');
  const xratelimitremaining = res.headers.get('X-Ratelimit-Remaining');
  const xratelimitreset = res.headers.get('X-Ratelimit-Reset');

  const headers = {
    ...getStandardHeaders(provider),
    'Access-Control-Expose-Headers':
      'X-RateLimit-Limit,X-RateLimit-Remaining,X-RateLimit-Reset',
    'Access-Control-Request-Method': '*',
    'X-Frame-Options': 'DENY',
    'X-RateLimit-Limit': `${xratelimit}`,
    'X-RateLimit-Remaining': `${xratelimitremaining}`,
    'X-RateLimit-Reset': `${xratelimitreset}`,
  };

  return headers;
}

/**
 * Get standard API response headers for the frontend application.
 */
export function getStandardHeaders(provider: string) {
  const cacheControl =
    providers[provider as keyof typeof providers]?.headers?.cacheControl;

  const headers = {
    'Cache-Control': cacheControl,
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*',
  };

  return headers;
}
