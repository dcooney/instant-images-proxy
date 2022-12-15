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
  // Get all query params from incoming URL.
  const query = getParams(req.url);

  // Display sponsor results.
  const sponsor = false;

  // Deconstruct URL params.
  const {
    provider = 'unsplash',
    type = 'photos',
    client_id = '',
    key = ''
  }: URLProps = query;

  const search = type === 'search';

  // Get the API keys.
  const keys: APIKeyProps = {
    unsplash: client_id ? client_id : process.env.UNSPLASH_API_KEY,
    pixabay: key ? key : process.env.PIXABAY_API_KEY,
    pexels: key ? key : process.env.PEXELS_API_KEY
  };

  let has_error = false;
  let error_msg = '';

  // No provider or type.
  if (!provider || !type) {
    // Bail early when provider doesn't exist.
    has_error = true;
    error_msg = 'No provider or API URL set.';
  }

  // Get API URL.
  let api_url: string =
    providers[provider as keyof typeof providers]?.api?.photos;
  if (search) {
    api_url = providers[provider as keyof typeof providers]?.api?.search;
  }

  if (!api_url) {
    // Bail early if destination URL is not an allowed URL.
    has_error = true;
    error_msg = 'Destination URL is not a valid API URL.';
  }

  if (has_error) {
    // Return the error response.
    return new Response(
      JSON.stringify({
        error: {
          status: 503,
          statusText: error_msg
        }
      }),
      {
        status: 503,
        statusText: error_msg,
        headers: getStandardHeaders()
      }
    );
  }

  const headers = getHeaders(provider, keys);
  const url = getURL(api_url, provider, query, keys);

  try {
    const response = await fetch(url, { headers });
    const { status, statusText } = response;
    const resHeaders = getResponseHeaders(response);

    // Success.
    if (status === 200) {
      const data = await response.json();
      const formatted = formatData(data, provider, search); // Format results.
      const results = sponsor ? getSponsor(data, provider, search) : formatted; // Inject sponsorship.
      return new Response(JSON.stringify(results), {
        status: status,
        statusText: statusText,
        headers: resHeaders
      });
    }

    // Pexels returns 500 with invalid API key.
    const statusCode = status === 500 ? 401 : status;

    // Error Response.
    return new Response(
      JSON.stringify({
        error: {
          status: statusCode,
          statusText: statusText
        }
      }),
      {
        status: statusCode,
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
        headers: getStandardHeaders()
      }
    );
  }
}
