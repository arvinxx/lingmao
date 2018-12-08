import React, { PureComponent } from 'react';
import { Value, Block } from 'slate';
import ListEditor from './ListEditor';
import PopupMenu from './PopupMenu';

import styles from './index.less';

import initValue from '@/data/records';

import { DispatchProp } from 'react-redux';
import { ILabel } from '@/models/label';

export interface IRecordListProps {
  records: object;
  labels: Array<ILabel>;
}

export default class RecordList extends PureComponent<IRecordListProps & DispatchProp> {
  static defaultProps: IRecordListProps = {
    records: {},
    labels: [],
  };
  state = {
    value: Value.fromJSON(initValue),
  };
  setMenuRef = (menu) => {
    this.menu = menu;
  };
  menu: HTMLElement;

  componentDidMount() {
    this.updateMenu();
    this.setState({
      value: Value.fromJSON(this.props.records),
    });
  }
  componentWillReceiveProps(nextProps) {
    const nextValue = Value.fromJSON(nextProps.records);
    // if (nextValue.document !== this.state.value.document) {
    //   this.setState({
    //     value: this.state.value.set('document', nextValue.document),
    //   });
    // }
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
      dispatch({ type: 'record/changeRecords', payload: value.toJSON() });
    }
    this.setState({ value });
  };

  //TODO 添加从上传的纯文本导入 Slate 的功能
  addNewContent = () => {
    const { value } = this.state;
    const change = value.change().insertBlock('list_item');
    Block.createList();
    this.setState({ value: change.value });
  };

  render() {
    const { records, dispatch, labels } = this.props;
    const value: Value = this.state.value;

    return (
      <div className={styles.list}>
        {/*<div onClick={this.addNewContent}> add text</div>*/}
        <ListEditor
          dispatch={dispatch}
          tagGroups={labels}
          records={records}
          value={value}
          onChange={this.onChange}
        />
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
