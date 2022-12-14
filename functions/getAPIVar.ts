import providers from '~/lib/providers';

/**
 * Get the API key/value to append to query.
 */
export default function getAPIVar(provider: string, value: string): object {
  return provider !== 'pexels'
    ? {
        [providers[provider as keyof typeof providers].api_var]: value
      }
    : {};
}
