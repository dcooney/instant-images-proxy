import { NextRequest } from 'next/server';
import getHeaders from '~/functions/getHeaders';
import getParams from '~/functions/getParams';
import getURL from '~/functions/getURL';
import { APIKeyProps, ParamProps, URLProps } from '~/lib/interfaces';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  // Get all query params from incoming URL.
  const query = getParams(req.url);

  // Deconstruct URL params.
  const {
    provider = 'unsplash',
    dest = '',
    client_id = '',
    key = ''
  }: URLProps = query;

  // Get the API keys.
  const keys: APIKeyProps = {
    unsplash: client_id ? client_id : process.env.UNSPLASH_API_KEY,
    pixabay: key ? key : process.env.PIXABAY_API_KEY,
    pexels: key ? key : process.env.PEXELS_API_KEY
  };

  if (!provider || !dest) {
    // Bail early when provider doesn't exist.
    return new Response(
      JSON.stringify({
        error: {
          status: 503,
          statusText: `No provider or destination URL set.`
        }
      }),
      {
        status: 503,
        statusText: `No provider or destination URL set.`
      }
    );
  }

  const headers = getHeaders(provider, keys);
  const url = getURL(provider, query, keys);

  try {
    const response = await fetch(url, { headers });
    const { status, statusText } = response;

    // Success.
    if (status === 200) {
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: status,
        statusText: statusText
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
        statusText: statusText
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
        statusText: 'Internal Server Error'
      }
    );
  }
}
