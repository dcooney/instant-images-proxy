import config from '~/lib/config';

/**
 * Get the API key/value to append to query.
 */
export default function getAPIVar(provider: string, api_key: string): object {
  return {
    [config[provider as keyof typeof config].api_var]: api_key
  };
}
