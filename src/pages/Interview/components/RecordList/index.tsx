import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash';
import { TTagGroup } from '../../../../models/tag';
import styles from './index.less';
import { DispatchProp } from 'react-redux';
import ListEditor from './ListEditor';
import initValue from '../../../../../mock/records';
import { Value, Block } from 'slate';
import PopupMenu from './PopupMenu';

export interface IRecordListProps {
  records: object;
  tagGroups: Array<TTagGroup>;
}

export default class RecordList extends PureComponent<IRecordListProps & DispatchProp> {
  static defaultProps: IRecordListProps = {
    records: {},
    tagGroups: [],
  };
  state = {
    value: Value.fromJSON(initValue),
  };
  setMenuRef = (menu) => {
    this.menu = menu;
  };
  menu: HTMLElement;
  constructor(props) {
    super(props);
    this.state.value = Value.fromJSON(props.records);
  }

  componentDidMount() {
    this.updateMenu();
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

  //TODO 添加从上传的纯文本导入 Slate 的功能
  addNewContent = () => {
    const { value } = this.state;
    const change = value.change().insertBlock('list_item');
    Block.createList();
    this.setState({ value: change.value });
  };

  render() {
    const { records, dispatch, tagGroups } = this.props;
    const value: Value = this.state.value;

    return (
      <div className={styles.list}>
        {/*<div onClick={this.addNewContent}> add text</div>*/}
        <ListEditor
          dispatch={dispatch}
          tagGroups={tagGroups}
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
