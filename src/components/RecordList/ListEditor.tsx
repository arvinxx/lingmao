import React, { Component, Ref, RefObject } from 'react';
import { setKeyGenerator } from 'slate';
import { Editor } from 'slate-react';
import PluginEditList, { initValue } from './Editor';
import { Value } from 'slate';
import { extractTags, generateId } from '../../utils';
import { TTagGroup } from '../../models/tag';
import PopupMenu from './PopupMenu';
import InputTooltip from './InputTooltip';
import styles from './ListEditor.less';
import { DispatchProp } from 'react-redux';
import { createContext } from 'react-broadcast';
const { Provider, Consumer } = createContext();
const plugin = PluginEditList();
const plugins = [plugin];

export interface IListEditorProps {
  records: object;
  tagGroups: Array<TTagGroup>;
  tagUpdate: boolean;
}

interface IEditorStates {
  tagValue: string;
  value: Value;
}

export default class ListEditor extends Component<IListEditorProps & DispatchProp, IEditorStates> {
  static defaultProps: IListEditorProps = {
    tagGroups: [],
    records: initValue,
    tagUpdate: false,
  };
  state = {
    value: Value.fromJSON(initValue),
    tagValue: '',
  };
  menu: HTMLElement;
  setMenuRef = (menu) => {
    this.menu = menu;
  };

  componentDidMount() {
    this.updateMenu();
    this.setState({
      value: Value.fromJSON(this.props.records),
    });
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
    const { node, attributes, children } = props;
    switch (node.type) {
      case 'ul_list':
        return <ul {...attributes}>{children}</ul>;
      case 'list_item':
        return <li {...props.attributes}>{props.children}</li>;
    }
  };
  renderMark = (props) => {
    const { dispatch } = this.props;
    const { value } = this.state;
    const { mark } = props;
    switch (mark.type) {
      case 'underline':
        return (
          <Consumer>
            {(tagGroups) => (
              <InputTooltip
                props={props}
                value={value}
                tags={extractTags(tagGroups)}
                onChange={this.onChange}
                dispatch={dispatch}
              />
            )}
          </Consumer>
        );
    }
  };
  shouldNodeComponentUpdate = (props) => {
    return props.node.type === 'list_item';
  };

  render() {
    const value: Value = this.state.value;
    const { dispatch, tagGroups } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.editor}>
          <Provider value={tagGroups}>
            <Editor
              placeholder={'请开始你的表演'}
              plugins={plugins}
              value={this.state.value}
              onChange={this.onChange}
              renderNode={this.renderNode}
              renderMark={this.renderMark}
              shouldNodeComponentUpdate={this.shouldNodeComponentUpdate}
            />
          </Provider>
        </div>
        <div id="tooltip" />
        <PopupMenu
          menuRef={this.setMenuRef}
          value={value}
          onChange={this.onChange}
          dispatch={dispatch}
        />
      </div>
    );
  }
}
