import { DataProps } from '~/lib/interfaces';
import providers from '~/lib/providers';
import { sponsorData } from '~/lib/sponsorship';
import { getRandomNumber } from './helpers';

/**
 * Format API results to remove unnecessary data and save data transfer.
 */
export default function formatData(
  data: DataProps,
  provider: string,
  search: string | boolean
): DataProps {
  const key = providers[provider as keyof typeof providers]?.arr_key;

  switch (provider) {
    // Unsplash
    case 'unsplash':
      // Search results returned in `results` object.
      const results = search === 'true' ? data[key] : data;

      results &&
        results?.length &&
        results.map((result: any) => {
          // Remove the following objects from Unsplash API results.
          delete result?.urls?.raw;
          delete result?.urls?.regular;
          delete result?.urls?.small_s3;
          delete result?.links?.self;
          delete result?.links?.download;
          delete result?.links?.download_location;
          delete result?.tags;
          delete result?.sponsorship;
          delete result?.current_user_collections;
          delete result?.topic_submissions;
          delete result?.user.links;
          delete result?.user.social;
          delete result?.user?.profile_image?.medium;
          delete result?.user?.profile_image?.large;
          return result;
        });
      break;

    case 'pexels':
      data &&
        data[key]?.length &&
        data[key].map((result: any) => {
          // Remove the following objects from results.
          delete result?.src?.large2x;
          delete result?.src?.medium;
          delete result?.src?.portrait;
          delete result?.src?.landscape;
          delete result?.src?.small;
          return result;
        });

      break;

    default:
      break;
  }
  return data;
}

/**
 * Inject data into the returned data object.
 *
 * Note: This is required because providers return data in different object keys.
 * e.g. Pexels = 'photos, Pixabay = 'hits', Unsplash = null
 */
export function formatSponsorData(
  data: DataProps,
  provider: string,
  search: string | boolean
): object {
  if (!data || data.length < 1) {
    return [];
  }

  let len = 0; // Default array length.
  const min = 10; // Minimum results to inject sponsorship.
  const key = providers[provider as keyof typeof providers]?.arr_key;

  // Switch the providers.
  switch (provider) {
    case 'unsplash':
      // Search results returned in `results` object.
      len = search === 'true' ? data[key].length - 1 : data.length - 1;

      if (search === 'true') {
        if (len > min) {
          data[key].splice(getRandomNumber(0, len as number), 0, sponsorData);
        }
      } else {
        if (len > min) {
          data.splice(getRandomNumber(0, len as number), 0, sponsorData);
        }
      }
      break;

    case 'pixabay':
    case 'pexels':
      len = data[key].length - 1;
      if (len > min) {
        data[key].splice(getRandomNumber(0, len as number), 0, sponsorData);
      }
      break;

    default:
      break;
  }

  return data;
}
