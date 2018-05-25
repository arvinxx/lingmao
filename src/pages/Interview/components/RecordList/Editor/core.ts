import Options, { OptionsFormat } from './options';
import { schema, validateNode } from './validation/index';
import { wrapInList, splitListItem } from './changes/index';
import {
  isList,
  isSelectionInList,
  getCurrentItem,
  getCurrentList,
  getItemsAtRange,
  getPreviousItem,
} from './utils/index';

/**
 * Returns the core of the plugin, limited to the validation and normalization
 * part of `slate-edit-list`, and utils.
 *
 * Import this directly: `import EditListCore from 'slate-edit-table/lib/core'`
 * if you don't care about behavior/rendering and you
 * are only manipulating `Slate.Values` without rendering them.
 * That way you do not depend on importing `slate-react`.
 */
export default (
  // Options for the plugin
  opts: OptionsFormat = {}
): Object => {
  opts = new Options(opts);

  return {
    schema: schema(opts),
    validateNode: validateNode(opts),

    utils: {
      getCurrentItem: getCurrentItem.bind(null, opts),
      getCurrentList: getCurrentList.bind(null, opts),
      getItemsAtRange: getItemsAtRange.bind(null, opts),
      getPreviousItem: getPreviousItem.bind(null, opts),
      isList: isList.bind(null, opts),
      isSelectionInList: isSelectionInList.bind(null, opts),
    },

    changes: {
      splitListItem: bindAndScopeChange(opts, splitListItem),
      wrapInList: wrapInList.bind(null, opts),
    },
  };
};

/**
 * Bind a change to given options, and scope it to act only inside a list
 */
function bindAndScopeChange(opts: Options, fn: any): any {
  return (change, ...args) => {
    const { value } = change;

    if (!isSelectionInList(opts, value)) {
      return change;
    }
    return fn(...[opts, change].concat(args));
  };
}
