// @flow
import { Node } from 'slate';

import Options from '../options';

/**
 * True if the node is a list container
 */
export default (opts: Options, node: Node): boolean => {
  return opts.types.includes(node.type);
};
