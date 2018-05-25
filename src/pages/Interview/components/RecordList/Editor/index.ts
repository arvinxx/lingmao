import Options, { OptionsFormat } from './options';
import { onEnter } from './handlers/index';
import core from './core';

const KEY_ENTER = 'Enter';

const onKeyDown = (opts: Options, event, change, editor): void | any => {
  switch (event.key) {
    case KEY_ENTER:
      return onEnter(event, change, editor, opts);
    default:
      return undefined;
  }
};

export default (opts: OptionsFormat = {}): Object => {
  opts = new Options(opts);
  const corePlugin = core(opts);

  return {
    ...corePlugin,
    onKeyDown: onKeyDown.bind(null, opts),
  };
};
