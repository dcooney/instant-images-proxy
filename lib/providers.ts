export default {
  unsplash: {
    api_var: 'client_id',
    arr_key: 'results',
    search_var: 'query',
    base_url: 'https://unsplash.com',
    api: {
      photos: 'https://api.unsplash.com/photos/',
      search: 'https://api.unsplash.com/search/photos/'
    },
    headers: {
      cacheControl:
        'max-age=7200, stale-if-error=3600, stale-while-revalidate=60'
    }
  },
  pixabay: {
    api_var: 'key',
    arr_key: 'hits',
    search_var: 'q',
    base_url: 'https://pixabay.com',
    api: {
      photos: 'https://pixabay.com/api/',
      search: 'https://pixabay.com/api/'
    },
    headers: {
      cacheControl: 'max-age=86400'
    }
  },
  pexels: {
    api_var: 'key',
    arr_key: 'photos',
    base_url: 'https://pexels.com',
    search_var: 'query',
    api: {
      photos: 'https://api.pexels.com/v1/curated/',
      search: 'https://api.pexels.com/v1/search/'
    },
    headers: {
      cacheControl: 'max-age=100, private, must-revalidate, stale-if-error=3600'
    }
  }
};
