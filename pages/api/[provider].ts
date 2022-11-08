import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import getHeaders from '~/functions/getHeaders';
import getURL from '~/functions/getURL';
import { APIKeyProps, ParamProps, URLProps } from '~/lib/interfaces';
import initMiddleware from '~/lib/middleware';

// TODO: Improve API error handling.

/**
 * Initializing the cors middleware.
 * @see https://github.com/expressjs/cors#configuration-options
 */
const cors = initMiddleware(
  Cors({
    methods: ['GET']
  })
);

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await cors(req as any, res as any);

  // Deconstruct URL params.
  const { query }: ParamProps = req;
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
    const error = [
      {
        error: 'No provider or destination URL set.'
      }
    ];
    res.status(500).json(error as any);
    return;
  }

  const headers = getHeaders(provider, keys);
  const url = getURL(provider, query, keys);

  const response = await fetch(url, { headers });
  const data = await response.json();
  res.status(200).json(data);
}
