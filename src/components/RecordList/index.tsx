import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash';
import { TTagGroup } from '../../models/tag';
import styles from './index.less';
import { DispatchProp } from 'react-redux';
import ListEditor from './ListEditor';

export interface IRecordListProps {
  records: object;
  tagGroups: Array<TTagGroup>;
}

export default class RecordList extends PureComponent<IRecordListProps & DispatchProp> {
  static defaultProps: IRecordListProps = {
    records: {},
    tagGroups: [],
  };
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
    const { records, dispatch, tagGroups } = this.props;
    return (
      <div className={styles.list}>
        <ListEditor dispatch={dispatch} tagGroups={tagGroups} records={records} />
      </div>
    );
  }
}
