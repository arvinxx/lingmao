import React, { Component } from 'react';
import { Editor } from 'slate-react';
import PluginEditList, { initValue } from './Editor';
import { Value } from 'slate';

const plugin = PluginEditList();
const plugins = [plugin];

import { extractTags } from '../../utils';
import { TTagGroup } from '../../models/tag';
import PopupMenu from './PopupMenu';
import InputTooltip from './InputTooltip';
import styles from './Editor.less';

export interface IEditorProps {
  dispatch: any;
  records: object;
  tagGroups: Array<TTagGroup>;
}

interface IEditorStates {
  tagValue: string;
  value: Value;
}

export default class ListEditor extends Component<IEditorProps, IEditorStates> {
  state = {
    value: Value.fromJSON(initValue),
    tagValue: '',
  };
  menuRef = (menu) => {
    this.menu = menu;
  };
  private menu?: HTMLElement;
  private editorRef: HTMLElement;

  constructor(props: IEditorProps) {
    super(props);
  }

  componentDidMount() {
    this.updateMenu();
  }

  componentWillUpdate() {
    return false;
  }
  componentDidUpdate() {
    this.updateMenu();
  }

  updateMenu = () => {
    const { menu } = this;
    const { value } = this.state;
    if (!menu) return;

    if (value.isBlurred || value.isEmpty) {
      menu.removeAttribute('style');
      return;
    }

    const selection: Selection = window.getSelection();
    const range: Range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = '1';
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
    menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
  };

  onChange = ({ value }) => {
    const { dispatch } = this.props;
    if (value.document !== this.state.value.document) {
      dispatch({ type: 'interview/changeRecords', payload: value.toJSON() });
    }
    this.setState({ value });
  };

  renderNode = (props) => {
    const { node, attributes, children, editor } = props;
    const isCurrentItem = plugin.utils.getItemsAtRange(editor.value).contains(node);

    switch (node.type) {
      case 'ul_list':
        return <ul {...attributes}>{children}</ul>;
      case 'list_item':
        return (
          <li
            className={isCurrentItem ? 'current-item' : ''}
            title={isCurrentItem ? 'Current Item' : ''}
            {...props.attributes}
          >
            {props.children}
          </li>
        );
    }
  };

  changeFocus = (id) => {
    console.log(id);
    this.props.dispatch({ type: 'interview/changeRecordFocusId', payload: id });
  };

  render() {
    const value: Value = this.state.value;
    const { dispatch, tagGroups } = this.props;
    // const tags = extractTags(tagGroups);
    return (
      <div className={styles.container}>
        <div className={styles.editor}>
          <Editor
            ref={(editor) => (this.editorRef = editor)}
            placeholder={'请开始你的表演'}
            plugins={plugins}
            value={this.state.value}
            onChange={this.onChange}
            renderNode={this.renderNode}
            shouldNodeComponentUpdate={(props) => props.node.type === 'list_item'}
            // renderMark={(props) => (
            //   <InputTooltip props={props} id={id} tags={tags} dispatch={dispatch} />
            // )}
          />
        </div>
        <div id="tooltip" />
        <PopupMenu
          menuRef={this.menuRef}
          value={value}
          onChange={this.onChange}
          dispatch={dispatch}
        />
      </div>
    );
  }
}
