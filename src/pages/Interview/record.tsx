import React, { Component } from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import { DispatchProp } from 'react-redux';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';
import { TagContent, Upload, TagSelector, RecordList } from './components';

import { IRecordState } from './models/record';
import { IInterviewDisplayState } from './models/interviewDisplay';
import { ILabel, ILabelState } from '@/models/label';

import styles from './record.less';

interface IRecordProps {
  record: IRecordState;
  loading: boolean;
  interviewDisplay: IInterviewDisplayState;
  tag: ILabelState;
}
@connect(({ record, tag, loading, interviewDisplay }) => ({
  record,
  interviewDisplay,
  tag,
  loading: loading.models.record,
}))
export default class Record extends Component<IRecordProps & DispatchProp> {
  static defaultProps: IRecordProps = {
    record: {
      key: '',
      records: {},
      title: '',
    },
    loading: false,
    tag: {
      labels: [],
      selectedTags: [],
    },
    interviewDisplay: {
      exportDisplay: '1',
      uploadVisible: false,
      labelMenuVisible: true,
    },
  };

  titleChange = (e) => {
    const text = e.target.value;
    this.props.dispatch({
      type: 'record/changeTitle',
      payload: text,
    });
  };

  render() {
    const minPanelSize = 150;
    const { record, tag, interviewDisplay, dispatch } = this.props;
    const { title, records } = record;
    const { labels, selectedTags } = tag;
    const { labelMenuVisible, uploadVisible } = interviewDisplay;
    return (
      <div className={styles.container}>
        {uploadVisible ? <Upload /> : <div />}
        <div className={styles.center}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement flex="0.6" className={styles['up-container']} minSize={minPanelSize}>
              <div className={styles.wrapper}>
                <Input
                  className={styles.title}
                  onChange={this.titleChange}
                  placeholder="无标题"
                  value={title}
                />
                <RecordList records={records} dispatch={dispatch} labels={labels} />
              </div>
            </ReflexElement>
            <ReflexSplitter>
              <div className={styles.touch}>
                <div className={styles['splitter-container']}>
                  <div className={styles.splitter} />
                </div>
              </div>
            </ReflexSplitter>
            <ReflexElement flex="0.4" className={styles['down-container']} minSize={minPanelSize}>
              <TagSelector labels={labels} selectedTags={selectedTags} dispatch={dispatch} />
            </ReflexElement>
          </ReflexContainer>
        </div>

        {labelMenuVisible ? <TagContent labels={labels} dispatch={dispatch} /> : <div />}
      </div>
    );
  }
}
