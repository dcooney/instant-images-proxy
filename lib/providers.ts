export default {
  unsplash: {
    api_var: 'client_id',
    arr_key: 'results',
    search_var: 'query',
    base_url: 'https:unsplash.com',
    api: {
      photos: 'https://api.unsplash.com/photos/',
      search: 'https://api.unsplash.com/search/photos/'
    }
  },
  pixabay: {
    api_var: 'key',
    arr_key: 'hits',
    search_var: 'q',
    base_url: 'https:pixabay.com',
    api: {
      photos: 'https://pixabay.com/api/',
      search: 'https://pixabay.com/api/'
    }
  },
  pexels: {
    api_var: 'key',
    arr_key: 'photos',
    base_url: 'https:pexels.com',
    search_var: 'query',
    api: {
      photos: 'https://api.pexels.com/v1/curated/',
      search: 'https://api.pexels.com/v1/search/'
    }
  }
};
