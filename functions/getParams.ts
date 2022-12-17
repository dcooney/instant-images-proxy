import { ParamProps } from '~/lib/interfaces';

/**
 * Pull query params from a URL.
 */
export default function getParams(url: string): object {
  const params: ParamProps = {}; // Create the params object

  new URL(url).searchParams.forEach(function(val, key) {
    params[key] = val;
  });

  return params;
}
