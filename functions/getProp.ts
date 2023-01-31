import providers from '~/lib/providers';

/**
 * Get props per provider from API results.
 */
export default function getProp(
  result: object | any,
  provider: string,
  param: string
) {
  let value: string | boolean = '';
  const referral = 'utm_source=wordpress-instant-images&utm_medium=referral';
  const base_url = providers[provider as keyof typeof providers]?.base_url;

  switch (param) {
    case 'id':
    case 'ID':
      value = result?.id;
      break;
    case 'thumb':
      if (provider === 'pixabay') {
        value = result?.previewURL;
      }
      if (provider === 'unsplash') {
        value = result?.urls?.thumb;
      }
      if (provider === 'pexels') {
        value = result?.src?.tiny;
      }
      if (provider === 'openverse') {
        // value = result?.thumbnail; // Doesn't always work with SVG.
        value = result?.url;
      }
      break;

    case 'img':
      if (provider === 'pixabay') {
        value = result?.webformatURL;
      }
      if (provider === 'unsplash') {
        value = result?.urls?.small;
      }
      if (provider === 'pexels') {
        value = result?.src?.large;
      }
      if (provider === 'openverse') {
        value = result?.url;
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

    case 'user_name':
      if (provider === 'pixabay') {
        value = result?.user;
      }
      if (provider === 'unsplash') {
        value = result?.user?.name;
      }
      if (provider === 'pexels') {
        value = result?.photographer;
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

    case 'user_url':
      if (provider === 'pixabay') {
        value = `${base_url}/users/${result?.user}-${result?.user_id}/?${referral}`;
      }
      if (provider === 'unsplash') {
        value = `${base_url}/@${result?.user.username}?${referral}`;
      }
      if (provider === 'pexels') {
        value = `${result?.photographer_url}?${referral}`;
      }
      if (provider === 'openverse') {
        value = result?.creator_url;
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

    case 'description':
      if (provider === 'openverse') {
        value = result?.attribution;
      }
      break;
  }

  return value;
}
