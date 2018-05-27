import React, { Component } from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import { DispatchProp } from 'react-redux';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';
import { TagList, Upload, TagInput, RecordList } from './components';

import { IInterview } from '../../models/interview';
import { TTagGroup } from '../../models/tag';
import { TRecordModel } from '../../models/recordDims';

import { extractTags } from '../../utils';
import {
  queryDocument,
  saveDocument,
  getCleanDimensions,
  getCleanDocument,
  getCleanTagGroups,
} from '../../services';

import styles from './record.less';

interface IInterviewProps {
  interview: IInterview;
  loading: boolean;
  recordDims: TRecordModel;
  tagGroups: TTagGroup[];
}
@connect(({ interview, tag, loading, recordDims }) => ({
  interview,
  tagGroups: tag.tagGroups,
  recordDims,
  loading: loading.models.interview,
}))
export default class Interview extends Component<IInterviewProps & DispatchProp, any> {
  static defaultProps: IInterviewProps = {
    interview: {
      tagVisible: false,
      uploadVisible: true,
      id: '',
      records: {},
      title: '',
    },
    loading: false,
    tagGroups: [],
    recordDims: {
      selectedValues: [],
      dimensions: [],
    },
  };
  async componentDidMount() {
    let documents = await queryDocument();
    documents = Array.isArray(documents) ? documents : [];

    if (documents.length > 0) {
      this.props.dispatch({
        type: 'interview/querryDocument',
        payload: getCleanDocument(documents[0]),
      });
      this.props.dispatch({
        type: 'recordDims/querryRecordDims',
        payload: getCleanDimensions(documents[0]),
      });
      this.props.dispatch({
        type: 'tag/querryTagGroups',
        payload: getCleanTagGroups(documents[0]),
      });
    }
  }

  componentWillUnmount() {
    const { recordDims, interview, tagGroups } = this.props;
    const { title, records, id } = interview;
    const { dimensions, selectedValues } = recordDims;

    saveDocument({ title, id, records, dimensions, selectedValues, tagGroups });
  }

  titleChange = (e) => {
    const text = e.target.value;
    this.props.dispatch({
      type: 'interview/changeTitle',
      payload: text,
    });
  };

  render() {
    const minPanelSize = 150;
    const { interview, tagGroups, dispatch, recordDims } = this.props;
    const { uploadVisible, tagVisible, title, records } = interview;
    const { dimensions, selectedValues } = recordDims;
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
                <RecordList records={records} dispatch={dispatch} tagGroups={tagGroups} />
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
              <TagInput
                dimensions={dimensions}
                selectedValues={selectedValues}
                dispatch={dispatch}
              />
            </ReflexElement>
          </ReflexContainer>
        </div>
        {tagVisible ? <TagList tags={extractTags(tagGroups)} dispatch={dispatch} /> : <div />}
      </div>
    );
  }
}
