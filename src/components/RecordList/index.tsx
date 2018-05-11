import React, { PureComponent } from 'react';
import { List } from 'antd';
import { isEmpty } from 'lodash';
import { TRecord, TTag, TTagGroup } from '../../models/interview';

import InputTooltip from './InputTooltip';

import styles from './index.less';

const { Item } = List;

interface RecordListProps {
  records: Array<TRecord>;
  recordFocusId?: string;
  dispatch: any;
  loading: any;
  tagGroups: Array<TTagGroup>;
}

export default class RecordList extends PureComponent<RecordListProps> {
  addRecord = (id) => {
    this.props.dispatch({
      type: 'interview/addRecord',
      payload: id,
    });
  };
  deleteRecord = (id, text) => {
    if (isEmpty(text)) {
      this.props.dispatch({ type: 'interview/deleteRecord', payload: id });
    }
  };
  changeRecordText = (e, id) => {
    const text = e.target.value;
    this.props.dispatch({
      type: 'interview/changeRecordText',
      payload: { id, newText: text },
    });
  };

  changeRecordFocusId = (id) => {
    this.props.dispatch({ type: 'interview/changeRecordFocusId', payload: id });
  };

  render() {
    const { records, recordFocusId, loading, dispatch, tagGroups } = this.props;

    return (
      <div className={styles.list}>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={records}
          loading={loading}
          renderItem={(record: TRecord) => {
            const { id, text, rawData } = record;
            return (
              <Item>
                <InputTooltip
                  id={id}
                  text={text}
                  recordFocusId={recordFocusId}
                  dispatch={dispatch}
                  tagGroups={tagGroups}
                  rawData={rawData}
                />
              </Item>
            );
          }}
        />
      </div>
    );
  }
}
