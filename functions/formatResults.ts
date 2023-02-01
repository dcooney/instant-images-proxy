import { DataProps, ResultProps, ResultsProps } from '~/lib/interfaces';
import providers from '~/lib/providers';
import getProp, {
  getAttribution,
  getImageTitle,
  getPermalink,
  getUsername,
  getUserURL,
} from './getProp';

/**
 * Format API results to return required data in a normalized response across providers.
 */
export default function formatData(
  data: DataProps,
  provider: string,
  search: boolean
): DataProps {
  let results: DataProps = [];

  const key = providers[provider as keyof typeof providers]?.arr_key;
  const searchByID = search && data?.id;

  /**
   * Access API results data from response.
   *
   * Note: Depending on the type of API request, image data may be returned in various formats.
   *       Pixabay & Pexels return image data in a nested object where unsplash returns as an array at the top level.
   *       This switch attempts to pluck results data from the API response.
   */
  switch (provider) {
    case 'pixabay':
    case 'pexels':
    case 'openverse':
      results = data[key];
      break;

    case 'unsplash':
      results = search ? data[key] : data;
      break;
  }

  /**
   * Search by ID.
   *
   * Note: Unsplash and Pexels return ID lookups as a single object response.
   *       This converts ID lookups into an array.
   */
  results = searchByID ? [data] : results;

  // Build the new data object.
  const obj: ResultsProps = {
    total: searchByID ? results.length : getTotal(data, provider),
    results: buildResults(results, provider),
  };

  return obj;
}

/**
 * Construct an individual result object.
 * We construct this object to normalize the response of all sevice providers.
 */
function buildResultObj(result: object | any, provider: string): ResultProps {
  const data: ResultProps = {
    id: getProp(result, provider, 'id'),
    permalink: getPermalink(result, provider),
    likes: getProp(result, provider, 'likes'),
    alt: getProp(result, provider, 'alt'),
    caption: getProp(result, provider, 'caption'),
    title: getImageTitle(result, provider),
    attribution: getAttribution(result, provider),
    extension: getProp(result, provider, 'extension'),
    urls: {
      thumb: getProp(result, provider, 'thumb'),
      img: getProp(result, provider, 'img'),
      full: getProp(result, provider, 'full'),
      download_url: getProp(result, provider, 'download_url'),
    },
    user: {
      id: getProp(result, provider, 'user_id'),
      name: getUsername(result, provider),
      photo: getProp(result, provider, 'user_photo'),
      url: getUserURL(result, provider),
    },
  };

  return data;
}

/**
 * Build the API results exactly the way we want them returned.
 */
function buildResults(results: DataProps, provider: string): any {
  if (!results?.length) {
    return [];
  }
  return results.map((result: any) => {
    return buildResultObj(result, provider);
  });
}

/**
 * Get the total number of results from API response.
 * Note: API responses vary so we need to pluck result totals from different object keys.
 */
function getTotal(data: DataProps, provider: string): number | string {
  let total = 0;
  switch (provider) {
    case 'pexels':
      total = data?.total_results;
      break;

    case 'openverse':
      total = data?.result_count;
      break;

    default:
      total = data?.total;
      break;
  }
  return total;
}

/**
 * Get the API key/value pair and append to query.
 */
export function getAPIVar(provider: string, value: string): object {
  return provider !== 'pexels' && provider !== 'openverse'
    ? {
        [providers[provider as keyof typeof providers].api_var]: value,
      }
    : {};
}
