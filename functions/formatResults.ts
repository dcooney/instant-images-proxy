import { DataProps } from '~/lib/interfaces';

/**
 * Inject data into the returned data object.
 *
 * Note: This is required because providers return data in different object keys.
 * e.g. Pexels = 'photos, Pixabay = 'hits', Unsplash = null
 */
export default function formatData(data: object, provider: string): object {
  const results: DataProps = data;

  const ad = {
    id: 'ID-1234566',
    type: 'instant-images-ad',
    data: {
      title: 'Gravity Forms',
      description: 'Powerful data capture fueled by Gravity Forms.',
      avatar:
        'https://images.unsplash.com/profile-fb-1599732338-2f306e8de95c.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
      url: 'https://google.com?ref=instant-images-wordpress',
      image: {
        src:
          'https://s38924.pcdn.co/wp-content/uploads/2022/06/gp-community-card-header-gpac-3-768x440.png',
        alt: 'This is the alt'
      }
    }
  };

  /**
   * Generate random number between min/max values.
   */
  function randomIntFromInterval(min: number = 0, max: number = 19) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let len = 0; // Length.
  switch (provider) {
    case 'unsplash':
      len = results.length;
      // Inject data.
      results.splice(randomIntFromInterval(0, len as number), 0, ad);
      break;

    case 'pixabay':
      len = results['hits'].length;
      // Inject data.
      results['hits'].splice(randomIntFromInterval(0, len as number), 0, ad);
      break;

    case 'pexels':
      len = results['photos'].length;
      // Inject data.
      results['photos'].splice(randomIntFromInterval(0, len as number), 0, ad);
      break;

    default:
      break;
  }

  return results;
}
