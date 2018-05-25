import React, { PureComponent } from 'react';
import { Tag, Input, Icon, Popconfirm } from 'antd';
const { CheckableTag } = Tag;
import styles from './DimValue.less';
import { DispatchProp } from 'react-redux';

export interface IDimValueProps {
  id: string;
  vid: string;
  editable: boolean;
  text: string;
  selectedValues: string[];
}
export default class DimValue extends PureComponent<IDimValueProps & DispatchProp> {
  static defaultProps: IDimValueProps = {
    editable: false,
    id: '',
    text: '',
    vid: '',
    selectedValues: [],
  };

  oldValueChange = (e, id, vid) => {
    this.props.dispatch({
      type: 'recordDims/changeDimensionValue',
      payload: { id, vid, newValue: e.target.value },
    });
  };
  oldValueDelete = (id, vid) => {
    this.props.dispatch({
      type: 'recordDims/deleteDimensionValue',
      payload: { id, vid },
    });
  };

  showValueEdit = (id, vid) => {
    this.props.dispatch({
      type: 'recordDims/showValueEdit',
      payload: { id, vid },
    });
  };
  hideValueEdit = (id, vid) => {
    this.props.dispatch({
      type: 'recordDims/hideValueEdit',
      payload: { id, vid },
    });
  };

  handleSelected(id: string, checked: boolean) {
    this.props.dispatch({
      type: 'recordDims/changeSelectedValues',
      payload: { id, checked },
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
        <div className={styles['value-container']}>
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
            title="确认要删除吗?"
            onConfirm={() => this.oldValueDelete(id, vid)}
            okText="是"
            cancelText="否"
          >
            <Icon type="close" className={styles['value-delete']} />
          </Popconfirm>
        </div>
      );
    }
  }
}
