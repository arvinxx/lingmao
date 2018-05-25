// @flow
import { Value, Block } from 'slate';

import Options from '../options';
import isList from './isList';

/**
 * Return the parent list block for an item block.
 */

export default (opts: Options, value: Value, item: Block): Block | null => {
  const { document } = value;
  const parent = document.getParent(item.key);
  return parent && isList(opts, parent) ? parent : null;
};
