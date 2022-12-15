import { DataProps } from '~/lib/interfaces';
import { sponsorData } from '~/lib/sponsorship';
import { getRandomNumber } from './helpers';

/**
 * Inject sponsor data into the returned data object.
 */
export default function getSponsor(data: DataProps): object {
  const key = 'results'; // Array key.
  const length = (data && data[key]?.length) || 0; // Array length.
  const min = 10; // Minimum results to inject sponsorship.

  if (length < 1) {
    // Bail early if results are empty.
    return [];
  }

  if (length > min) {
    // Inject sponsor into results when array length meets criteria.
    const location = getRandomNumber(0, length as number);
    data[key].splice(location, 0, sponsorData);
  }

  return data;
}
