import React, { Component } from 'react';
import { Tag, Input, Icon, Popconfirm } from 'antd';
const { CheckableTag } = Tag;
import styles from './styles.less';

interface IDimValueProps {
  id: string;
  vid: string;
  editable: boolean;
  text: string;
  selectedValues: string[];
  dispatch: Function;
}
export default class DimValue extends Component<IDimValueProps> {
  static defaultProps: IDimValueProps = {
    editable: false,
    id: '',
    text: '',
    vid: '',
    selectedValues: [],
    dispatch: () => {},
  };

  oldValueChange = (e, id, vid) => {
    this.props.dispatch({
      type: 'interview/changeDimensionValue',
      payload: { id, vid, newValue: e.target.value },
    });
  };
  oldValueDelete = (id, vid) => {
    this.props.dispatch({
      type: 'interview/deleteDimensionValue',
      payload: { id, vid },
    });
  };

  hideValueInput = (id) => {
    this.props.dispatch({
      type: 'interview/hideValueInput',
      payload: id,
    });
  };

  showValueEdit = (id, vid) => {
    this.props.dispatch({
      type: 'interview/showValueEdit',
      payload: { id, vid },
    });
  };
  hideValueEdit = (id, vid) => {
    this.props.dispatch({
      type: 'interview/hideValueEdit',
      payload: { id, vid },
    });
  };

  handleSelected(id: string, checked: boolean) {
    const { selectedValues } = this.props;
    const nextSelectedValues = checked
      ? [...selectedValues, id]
      : selectedValues.filter((t) => t !== id);

    this.props.dispatch({
      type: 'interview/changeSelectedValues',
      payload: nextSelectedValues,
    });
  }
  render() {
    const { id, vid, editable, text, selectedValues } = this.props;
    if (editable) {
      return (
        <Input
          key={`${vid}-edit`}
          type="text"
          size="small"
          className={styles['value-input']}
          value={text}
          onChange={(e) => this.oldValueChange(e, id, vid)}
          onPressEnter={() => this.hideValueEdit(id, vid)}
          onBlur={() => this.hideValueEdit(id, vid)}
        />
      );
    } else {
      return (
        <div key={vid + 'v-cont'} className={styles['value-container']}>
          <CheckableTag
            key={vid + 'checkbleTag'}
            checked={selectedValues.indexOf(vid) > -1}
            //@ts-ignore Antd 未定义事件 props
            onDoubleClick={() => this.showValueEdit(id, vid)}
            onChange={(checked) => this.handleSelected(vid, checked)}
          >
            {text}
          </CheckableTag>
          <Popconfirm
            key={vid + 'ppp'}
            title="确认要删除吗?"
            onConfirm={() => this.oldValueDelete(id, vid)}
            okText="是"
            cancelText="否"
          >
            <Icon key={id + 'close'} type="close" className={styles['value-delete']} />
          </Popconfirm>
        </div>
      );
    }
  }
}
