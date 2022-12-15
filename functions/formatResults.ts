import { DataProps, ResultObjectProps, ResultsProps } from '~/lib/interfaces';
import providers from '~/lib/providers';
import getProp from './getProp';

/**
 * Format API results to remove unnecessary data and save data transfer.
 */
export default function formatData(
  data: DataProps,
  provider: string,
  search: boolean
): DataProps {
  const key = providers[provider as keyof typeof providers]?.arr_key;

  let results: DataProps = [];

  console.log(search);

  // Access API results data.
  switch (provider) {
    case 'pixabay':
    case 'pexels':
      results = data[key];
      break;

    case 'unsplash':
      if (search) {
        results = data[key];
      } else {
        results = data;
      }
      break;
  }

  // Search by ID.
  // Unsplash and Pexels return ID searches as a single object.
  results = search && data?.id ? [data] : results;

  // Build the new results object.
  const resultsObj: ResultsProps = {
    total: getTotal(data, provider),
    results: buildResults(results, provider)
  };

  return resultsObj;
}

/**
 * Construct an individual result object.
 */
function buildResultObj(
  result: object | any,
  provider: string
): ResultObjectProps {
  const data: ResultObjectProps = {
    id: getProp(result, provider, 'id'),
    permalink: getProp(result, provider, 'permalink'),
    likes: getProp(result, provider, 'likes'),
    urls: {
      thumb: getProp(result, provider, 'thumb'),
      img: getProp(result, provider, 'img'),
      full: getProp(result, provider, 'full'),
      alt: getProp(result, provider, 'alt'),
      download_url: getProp(result, provider, 'download_url')
    },
    user: {
      username: getProp(result, provider, 'user_id'),
      name: getProp(result, provider, 'user_name'),
      photo: getProp(result, provider, 'user_photo'),
      url: getProp(result, provider, 'user_url')
    }
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
 */
function getTotal(data: DataProps, provider: string): number | string {
  let total = 0;
  switch (provider) {
    case 'pexels':
      total = data?.total_results;
      break;

    default:
      total = data?.total;
      break;
  }
  return total;
}
