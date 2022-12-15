import { DataProps } from '~/lib/interfaces';
import providers from '~/lib/providers';
import { getRandomNumber } from './helpers';
import { sponsorData } from '~/lib/sponsorship';

/**
 * Inject data into the returned data object.
 *
 * Note: This is required because providers return data in different object keys.
 * e.g. Pexels = 'photos, Pixabay = 'hits', Unsplash = null
 */
export default function getSponsor(
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
