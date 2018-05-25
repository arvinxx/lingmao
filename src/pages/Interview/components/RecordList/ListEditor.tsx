import React, { Component, Ref, RefObject } from 'react';
import { setKeyGenerator } from 'slate';
import { Editor } from 'slate-react';
import PluginEditList from './Editor';
import initValue from '../../../../../mock/records';

import { Value } from 'slate';
import { extractTags } from '../../../../utils';
import { TTagGroup } from '../../../../models/tag';
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
  onChange: Function;
  value: Value;
}

export default class ListEditor extends Component<IListEditorProps & DispatchProp> {
  static defaultProps: IListEditorProps = {
    tagGroups: [],
    records: initValue,
    onChange: () => {},
    value: Value.fromJSON(initValue),
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
    const { dispatch, value, onChange } = this.props;
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
                onChange={onChange}
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
    const { onChange, tagGroups, value } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.editor}>
          <Provider value={tagGroups}>
            <Editor
              placeholder={'请开始你的表演'}
              plugins={plugins}
              value={value}
              onChange={onChange}
              renderNode={this.renderNode}
              renderMark={this.renderMark}
              shouldNodeComponentUpdate={this.shouldNodeComponentUpdate}
            />
          </Provider>
        </div>
        <div id="tooltip" />
      </div>
    );
  }
}
