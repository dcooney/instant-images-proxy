import providers from '~/lib/providers';

/**
 * Get the API key/value to append to query.
 */
export default function getAPIVar(provider: string, api_key: string): object {
  return {
    [providers[provider as keyof typeof providers].api_var]: api_key
  };
}
