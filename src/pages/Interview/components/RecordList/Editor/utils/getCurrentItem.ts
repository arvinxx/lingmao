import { Value, Block } from 'slate';
import Options from '../options';

/**
 * Return the current list item, from current selection or from a node.
 */
export default (opts: Options, value: Value, block?: Block): Block | null => {
  const { document } = value;

  if (!block) {
    if (!value.selection.startKey) return null;
    block = value.startBlock;
  }

  const parent = document.getParent(block.key);
  return parent && parent.type === opts.typeItem ? parent : null;
};
