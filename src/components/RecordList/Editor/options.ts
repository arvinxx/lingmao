import { Record } from 'immutable';

export type OptionsFormat = { types?: string[]; typeItem?: string; typeDefault?: string };

export default class Options extends Record({
  types: ['ul_list'],
  typeItem: 'list_item',
  typeDefault: 'paragraph',
}) {
  types: string[];
  typeItem: string;
  typeDefault: string;
}
