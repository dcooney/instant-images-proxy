import { NextRequest } from 'next/server';
import formatData from '~/functions/formatResults';
import getHeaders, {
  getResponseHeaders,
  getStandardHeaders
} from '~/functions/getHeaders';
import getParams from '~/functions/getParams';
import getSponsor from '~/functions/getSponsor';
import getURL from '~/functions/getURL';
import { APIKeyProps, URLProps } from '~/lib/interfaces';
import providers from '~/lib/providers';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  // Display sponsor results.
  const sponsor = false;

  // Get all query params from incoming URL.
  const query = getParams(req.url);

  let error_msg = '';
  let error_code = 200;
  let has_error = false;

  // Deconstruct URL params.
  const {
    version = 0,
    provider = 'unsplash',
    type = 'photos',
    client_id = '',
    key = ''
  }: URLProps = query;

  // Get API keys.
  const keys: APIKeyProps = {
    unsplash: client_id ? client_id : process.env.UNSPLASH_API_KEY,
    pixabay: key ? key : process.env.PIXABAY_API_KEY,
    pexels: key ? key : process.env.PEXELS_API_KEY
  };

  // API URLs.
  const search_url = providers[provider as keyof typeof providers]?.api?.search;
  const photos_url = providers[provider as keyof typeof providers]?.api?.photos;
  const search = type === 'search'; // Is this a search request?
  const api_url: string = search ? search_url : photos_url;

  if (parseInt(version as string) < 5 || !version) {
    // Bail early if `version` parameter is missing.
    error_msg =
      'Missing API parameter - we are unable to complete the request at this time.';
    error_code = 403;
    has_error = true;
  }

  if (!api_url) {
    // Bail early if provider is not supported.
    error_msg =
      'The Instant Images Proxy is not configured for the requested provider.';
    error_code = 404;
    has_error = true;
  }

  if (has_error) {
    // Return error if required.
    return new Response(
      JSON.stringify({
        error: {
          status: error_code,
          statusText: error_msg
        }
      }),
      {
        status: error_code,
        statusText: error_msg,
        headers: getStandardHeaders(provider)
      }
    );
  }

  const headers = getHeaders(provider, keys);
  const url = getURL(api_url, provider, query, keys);

  try {
    const response = await fetch(url, { headers });
    const { status, statusText } = response;
    const resHeaders = getResponseHeaders(provider, response);

    // Success.
    if (status === 200) {
      const data = await response.json();
      const formatted = formatData(data, provider, search); // Format results.
      const results = sponsor ? getSponsor(formatted) : formatted; // Inject sponsorship.
      return new Response(JSON.stringify(results), {
        status: status,
        statusText: statusText,
        headers: resHeaders
      });
    }

    // Error Response.
    return new Response(
      JSON.stringify({
        error: {
          status: status,
          statusText: statusText
        }
      }),
      {
        status: status,
        statusText: statusText,
        headers: resHeaders
      }
    );
  } catch (error) {
    // Server Error: Leave a message and bail.
    return new Response(
      JSON.stringify({
        error: {
          status: 500,
          statusText: error
        }
      }),
      {
        status: 500,
        statusText: 'Internal Server Error',
        headers: getStandardHeaders(provider)
      }
    );
  }
}
