import { ParamProps } from '~/lib/interfaces';

/**
 * Pull query params from URL.
 */
export default function getParams(url: string): object {
  // Create a params object
  const params: ParamProps = {};

  new URL(url).searchParams.forEach(function(val, key) {
    params[key] = val;
  });

  return params;
}
