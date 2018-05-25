import { Change } from 'slate';

import Options from '../options';
import { splitListItem, wrapInList } from '../changes/index';
import { getCurrentItem } from '../utils/index';

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Shift+Enter in a list item should make a new line
 */
export default (event: any, change: Change, editor: any, opts: Options): void | any => {
  // Shift+Enter 另起一行，不分列
  if (event.shiftKey) {
    return undefined;
  }
  const { value } = change;

  const currentItem = getCurrentItem(opts, value);

  // Not in a list
  if (!currentItem) {
    return wrapInList(opts, change);
  }
  event.preventDefault();

  // If expanded, delete first.
  console.log(value.isExpanded);
  if (value.isExpanded) {
    change.delete();
  }

  return splitListItem(opts, change);
};
