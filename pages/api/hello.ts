// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors' 
import initMiddleware from '~/lib/middleware'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(Cors({
  methods: ['GET'],
}))

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  await cors(req as NextApiRequest, res as NextApiResponse)

  const clientID = process.env.UNSPLASH_API_KEY;
  let headers = {};
  let url = `https://api.unsplash.com/photos/?per_page=20&content_filter=low`
  url = `${url}&client_id=${clientID}`

  const response = await fetch(url, { headers });
  const data = await response.json();

  console.log(data)


  res.status(200).json(data)
}
