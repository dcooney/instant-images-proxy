# Instant Images Proxy Server

A small proxy server for [Instant Images](https://github.com/dcooney/instant-images) built with Next.js and [Edge](https://vercel.com/docs/concepts/functions/edge-functions) runtime functions to serve images from the [Unsplash](http://unsplash.com), [Openverse](https://wordpress.org/openverse/), [Pixabay](http://pixabay.com) & [Pexels](http://pexels.com) APIs.

## Getting Started

1. Install project: `npm i`
2. Set up the required [env](#env-variables) variables.
3. Start the development server: `npm run dev`

## ENV Variables

API requests require `env` variables for each of the providers. Create an `.env.local` file in the project root and add the following:

```bash
UNSPLASH_API_KEY='xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
PIXABAY_API_KEY='xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
PEXELS_API_KEY='xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

| Provider    | Variable Name    |
| ----------- | -----------   |
| Unsplash    | `UNSPLASH_API_KEY` |
| Pixabay     | `PIXABAY_API_KEY` |
| Pexels      | `PEXELS_API_KEY` |
