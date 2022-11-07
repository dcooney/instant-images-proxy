import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import getHeaders from '~/functions/getHeaders';
import getURL from '~/functions/getURL';
import providers from '~/lib/providers';
import { APIKeyProps, ParamProps, URLProps } from '~/lib/interfaces';
import initMiddleware from '~/lib/middleware';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
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

  // Get the API keys.
  const keys: APIKeyProps = {
    unsplash: process.env.UNSPLASH_API_KEY,
    pixabay: process.env.PIXABAY_API_KEY,
    pexels: process.env.PEXELS_API_KEY
  };

  // Deconstruct URL params.
  const { query }: ParamProps = req;
  const { provider = '' }: URLProps = query;

  if (!provider) {
    // Bail early when provider doesn't exist.
    const error = [
      {
        msg: 'No provider set.'
      }
    ];
    res.status(500).json(error as any);
    return;
  }

  const headers = getHeaders(provider, keys);
  const url = getURL(provider, query, keys);
  //console.log(url);

  const response = await fetch(url, { headers });
  const data = await response.json();
  res.status(200).json(data);
}
