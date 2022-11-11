import { NextRequest } from 'next/server';
import getHeaders from '~/functions/getHeaders';
import getParams from '~/functions/getParams';
import getURL from '~/functions/getURL';
import { APIKeyProps, ParamProps, URLProps } from '~/lib/interfaces';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  // Get incoming URL.
  const href = req.nextUrl.href;

  // Get all query params.
  const query = getParams(href);

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
        error: `No provider or destination URL set.`
      }),
      {
        status: 500,
        statusText: `No provider or destination URL set.`
      }
    );
  }

  const headers = getHeaders(provider, keys);
  const url = getURL(provider, query, keys);

  try {
    const response = await fetch(url, { headers });

    // API Error.
    if (response.status !== 200) {
      return new Response(
        JSON.stringify({
          error: `${response.statusText}`
        }),
        {
          status: response.status,
          statusText: response.statusText
        }
      );
    }

    // Success.
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText
    });
  } catch (error) {
    // Issue? Leave a message and bail.
    console.error(error);
    return new Response(
      JSON.stringify({
        error: `${error}`
      }),
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );
  }
}
