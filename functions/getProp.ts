import providers from '~/lib/providers';
import { capitalizeFirstLetter, generateLink } from './helpers';

/**
 * Get props per provider from API results.
 */
export default function getProp(
  result: object | any,
  provider: string,
  param: string
) {
  let value: string | boolean | null = '';

  switch (param) {
    case 'id':
    case 'ID':
      value = result?.id;
      break;

    case 'thumb':
      if (provider === 'pixabay') {
        value = result?.webformatURL;
      }
      if (provider === 'unsplash') {
        value = result?.urls?.small;
      }
      if (provider === 'pexels') {
        value = result?.src?.tiny;
      }
      if (provider === 'openverse') {
        const ext = getFileExtension(result, provider);
        value = ext === 'svg' ? result?.url : result?.thumbnail; // result?.thumbnail; // Doesn't always work with SVG.
      }
      break;

    case 'full':
      if (provider === 'pixabay') {
        value = result?.largeImageURL;
      }
      if (provider === 'unsplash') {
        value = result?.urls?.full;
      }
      if (provider === 'pexels') {
        value = result?.src?.original;
      }
      if (provider === 'openverse') {
        value = result?.url;
      }
      break;

    case 'download_url':
      if (provider === 'pixabay') {
        value = false;
      }
      if (provider === 'unsplash') {
        value = result?.links?.download_location;
      }
      if (provider === 'pexels') {
        value = false;
      }
      if (provider === 'openverse') {
        value = false;
      }
      break;

    case 'user_id':
      if (provider === 'pixabay') {
        value = result?.user_id;
      }
      if (provider === 'unsplash') {
        value = result?.user.username;
      }
      if (provider === 'pexels') {
        value = result?.photographer_id;
      }
      if (provider === 'openverse') {
        value = result?.creator;
      }
      break;

    case 'user_photo':
      if (provider === 'pixabay') {
        value = result?.userImageURL;
      }
      if (provider === 'unsplash') {
        value = result?.user?.profile_image?.small;
      }
      if (provider === 'pexels') {
        value = false;
      }
      break;

    case 'permalink':
      if (provider === 'pixabay') {
        value = result?.pageURL;
      }
      if (provider === 'unsplash') {
        value = result?.links?.html;
      }
      if (provider === 'pexels') {
        value = result?.url;
      }
      if (provider === 'openverse') {
        value = result?.foreign_landing_url;
      }
      break;

    case 'likes':
      if (provider === 'pixabay') {
        value = result?.likes;
      }
      if (provider === 'unsplash') {
        value = result?.likes;
      }
      if (provider === 'pexels') {
        value = false;
      }
      if (provider === 'openverse') {
        value = false;
      }
      break;

    case 'alt':
      if (provider === 'pixabay') {
        value = result?.tags;
      }
      if (provider === 'unsplash') {
        value = result?.alt_description;
      }
      if (provider === 'pexels') {
        value = result?.alt;
      }
      if (provider === 'openverse') {
        value = result?.alt;
      }
      break;

    case 'dimensions':
      if (provider === 'pixabay') {
        const imageWidth = result?.imageWidth;
        const imageHeight = result?.imageHeight;
        if (imageWidth && imageHeight) {
          // Generate image dimensions from full size.
          const percent = 1280 / imageWidth;
          value = `${Math.round(imageWidth * percent)} x ${Math.round(
            imageHeight * percent
          )}`;
        }
      }
      if (
        provider === 'unsplash' ||
        provider === 'pexels' ||
        provider === 'openverse'
      ) {
        value =
          result?.width && result?.height
            ? `${result.width} x ${result.height}`
            : null; // 1600x900
      }
      break;
  }

  return value ? value : null;
}

/**
 * Get the image permalink for a provider.
 */
export function getPermalink(result: object | any, provider: string) {
  switch (provider) {
    case 'pixabay':
      return result?.pageURL;

    case 'unsplash':
      return result?.links?.html;

    case 'pexels':
      return result?.url;

    case 'openverse':
      return result?.foreign_landing_url;
  }
}

/**
 * Get the file extension.
 */
export function getFileExtension(result: object | any, provider: string) {
  switch (provider) {
    case 'openverse':
      return result?.url.substr(result?.url.lastIndexOf('.') + 1);

    default:
      return 'jpg';
  }
}

/**
 * Get the username of the image author/creator.
 */
export function getUsername(result: object | any, provider: string) {
  switch (provider) {
    case 'pixabay':
      return result?.user;

    case 'unsplash':
      return result?.user?.name;

    case 'pexels':
      return result?.photographer;

    case 'openverse':
      return result?.creator;
  }
}

/**
 * Get the URL for the author/creator.
 */
export function getUserURL(result: object | any, provider: string) {
  const referral = 'utm_source=instant-images&utm_medium=referral';
  const base_url = providers[provider as keyof typeof providers]?.base_url;

  switch (provider) {
    case 'pixabay':
      return `${base_url}/users/${result?.user}-${result?.user_id}/?${referral}`;

    case 'unsplash':
      return `${base_url}/@${result?.user.username}?${referral}`;

    case 'pexels':
      return `${result?.photographer_url}?${referral}`;

    case 'openverse':
      return result?.creator_url;
  }
}

/**
 * Get the title of the image.
 */
export function getImageTitle(result: object | any, provider: string) {
  const username = getUsername(result, provider);
  switch (provider) {
    case 'openverse':
      return result?.title;

    default:
      return `Photo by ${username}`;
  }
}

/**
 * Generate attribution text for image.
 */
export function getAttribution(result: any, provider: string) {
  const username = getUsername(result, provider);
  const user_url = getUserURL(result, provider);
  const user =
    user_url && username ? generateLink(user_url, username) : username;

  switch (provider) {
    case 'openverse':
      // e.g. `"<a>Toronto Skyline</a>" by Eric.Parker is licensed under <a>CC BY-NC 2.0</a>`
      const permalink = getPermalink(result, provider);
      const title = getImageTitle(result, provider);
      const image_link = permalink ? generateLink(permalink, title) : title;
      const license = result?.license;
      const license_version = result?.license_version;
      const license_url = result?.license_url;

      // License display e.g. `by-nc-sa 2.0`
      const license_display = license_version
        ? `CC ${license} ${license_version}`
        : `CC ${license}`;

      // Generate link to license.
      const license_permalink = license_url
        ? generateLink(license_url, license_display.toUpperCase())
        : license_display.toUpperCase();

      return `"${image_link}" by ${user} is licensed under ${license_permalink}`;

    default:
      // e.g. `Photo by <a>Jim Davis</a> on <a>Unsplash</a>`
      const url = providers[provider as keyof typeof providers]?.base_url;
      const provider_name = capitalizeFirstLetter(provider);

      return `Photo by ${user} on ${generateLink(url, provider_name)}`;
  }
}
