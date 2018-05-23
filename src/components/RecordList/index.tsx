import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash';
import { TTagGroup } from '../../models/tag';
import styles from './index.less';
import { DispatchProp } from 'react-redux';
import ListEditor from './ListEditor';

export interface IRecordListProps {
  records: object;
  tagGroups: Array<TTagGroup>;
  tagUpdate: boolean;
}

export default class RecordList extends PureComponent<IRecordListProps & DispatchProp> {
  static defaultProps: IRecordListProps = {
    records: {},
    tagGroups: [],
    tagUpdate: false,
  };

  render() {
    const { records, dispatch, tagGroups, tagUpdate } = this.props;
    return (
      <div className={styles.list}>
        <ListEditor
          dispatch={dispatch}
          tagUpdate={tagUpdate}
          tagGroups={tagGroups}
          records={records}
        />
      </div>
    );
  }
}
