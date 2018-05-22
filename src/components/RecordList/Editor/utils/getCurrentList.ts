import { Value, Block } from 'slate';

import Options from '../options';
import getCurrentItem from './getCurrentItem';
import getListForItem from './getListForItem';

export default (opts: Options, value: Value, block?: Block): Block | null => {
  const item = getCurrentItem(opts, value, block);

  if (!item) {
    return null;
  }

  return getListForItem(opts, value, item);
};
