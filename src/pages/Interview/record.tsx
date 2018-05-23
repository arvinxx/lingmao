import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Input, Icon, Popconfirm } from 'antd';
import { DispatchProp } from 'react-redux';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';
import { TagInput, RecordList, Upload } from '../../components';
import TagList from './components/TagList';

import { IInterview } from '../../models/interview';
import { TTagGroup, TTagModel } from '../../models/tag';
import { TRecordModel } from '../../models/recordDims';

import { extractTags, generateId, initRecords } from '../../utils';
import { queryDocument, saveDocument } from '../../services/api';

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
      tagUpdate: false,
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
      let { dimensions, selectedValues, title, records, id: docId } = documents[0];
      if (records === undefined) {
        records = initRecords('');
      }
      if (title === undefined) {
        title = '';
      }
      if (docId === '') {
        docId = generateId();
      }

      // 处理 dimensions
      const filterDimensions = dimensions.map((dimension) => {
        let { id, values, key } = dimension;
        return {
          values: values.map((value) => {
            let { id, text } = value;
            id = id === '' ? generateId() : id;
            return {
              text,
              id,
              editable: false,
            };
          }),
          key,
          id: id === '' ? generateId() : id,
          inputVisible: false,
        };
      });
      if (selectedValues === null) {
        selectedValues = [];
      }

      // 处理 tagGroups
      let { tagGroups } = documents[0];
      if (tagGroups !== undefined && tagGroups !== null && tagGroups.length > 0) {
        tagGroups = tagGroups.map((tagGroup, index) => ({
          id: tagGroup.id === '' ? generateId() : tagGroup.id,
          text: index === 0 ? '未分组' : tagGroup.text,
          tags: tagGroup.tags,
        }));
      } else {
        tagGroups = [{ id: generateId(), tags: [], text: '未分组' }];
      }
      this.props.dispatch({
        type: 'interview/querryDocument',
        payload: { title, records, docId },
      });
      this.props.dispatch({
        type: 'recordDims/querryRecordDims',
        payload: { dimensions: filterDimensions, selectedValues },
      });
      this.props.dispatch({
        type: 'tag/querryTagGroups',
        payload: tagGroups,
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
    const { uploadVisible, tagVisible, tagUpdate, title, records } = interview;
    const { dimensions, selectedValues } = recordDims;
    return (
      <div className={styles.container}>
        {uploadVisible ? <Upload /> : <div />}
        <div className={styles.center}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement flex="0.6" className={styles['up-container']} minSize={minPanelSize}>
              <div className={styles.wrapper}>
                <Input className={styles.title} onChange={this.titleChange} value={title} />
                <RecordList
                  tagUpdate={tagUpdate}
                  records={records}
                  dispatch={dispatch}
                  tagGroups={tagGroups}
                />
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
