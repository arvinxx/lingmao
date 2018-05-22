import { Value } from 'slate';

import Options from '../options';
import getItemsAtRange from './getItemsAtRange';

/**
 * True if selection is inside a list (and can be unwrapped)
 */
export default (opts: Options, value: Value): boolean => {
  return !getItemsAtRange(opts, value).isEmpty();
};
