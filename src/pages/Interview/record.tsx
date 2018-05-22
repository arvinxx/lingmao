import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Input, Icon, Popconfirm } from 'antd';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';

import { TagInput, RecordList, Upload } from '../../components';
import { TInterview } from '../../models/interview';
import { TTagModel } from '../../models/tag';
import { queryDocument, saveDocument } from '../../services/api';

import styles from './record.less';
import { extractTags, generateId } from '../../utils';
import { TRecordModel } from '../../models/recordDims';
import { Connect, DispatchProp } from 'react-redux';

interface IInterviewProps {
  dispatch: any;
  interview: TInterview;
  loading: boolean;
  recordDims: TRecordModel;
  tag: TTagModel;
}
@connect(({ interview, tag, loading, recordDims }) => ({
  interview,
  tag,
  recordDims,
  loading: loading.models.interview,
}))
export default class Interview extends Component<IInterviewProps & DispatchProp, any> {
  async componentDidMount() {
    let documents = await queryDocument();
    documents = Array.isArray(documents) ? documents : [];
    let { dimensions, selectedValues } = documents[0];

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

    this.props.dispatch({
      type: 'interview/fetchDocument',
    });
    this.props.dispatch({
      type: 'recordDims/querryRecordDims',
      payload: { dimensions: filterDimensions, selectedValues },
    });
    this.props.dispatch({
      type: 'tag/fetchTagGroups',
    });
  }

  componentWillUnmount() {
    const { recordDims, interview, tag } = this.props;
    const { title, records, id } = interview;
    const { dimensions, selectedValues } = recordDims;
    const { tagGroups } = tag;

    saveDocument({ title, id, records, dimensions, selectedValues, tagGroups });
  }

  deleteTag = (id) => {
    this.props.dispatch({
      type: 'tag/deleteTag',
      payload: id,
    });
  };

  titleChange = (e) => {
    const text = e.target.value;
    this.props.dispatch({
      type: 'interview/changeTitle',
      payload: text,
    });
  };

  RecordComponent = () => {
    const minPanelSize = 150;
    const { recordDims, interview, tag, dispatch } = this.props;
    const { title, records } = interview;
    const { dimensions, selectedValues } = recordDims;
    const { tagGroups } = tag;
    const loading = this.props.loading;
    return (
      <div className={styles.center}>
        <ReflexContainer orientation="horizontal">
          <ReflexElement flex="0.6" className={styles['up-container']} minSize={minPanelSize}>
            <div className={styles.wrapper}>
              <Input className={styles.title} onChange={this.titleChange} value={title} />
              <RecordList
                loading={loading}
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
            <TagInput dimensions={dimensions} selectedValues={selectedValues} dispatch={dispatch} />
          </ReflexElement>
        </ReflexContainer>
      </div>
    );
  };
  LabelComponent = (tagVisible, tags) => {
    if (tagVisible) {
      return (
        <div className={styles.right}>
          <div className={styles.title}>标签</div>
          <Menu
            // onClick={this.deleteTag}
            style={{ width: 200 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            {tags.map((tag) => {
              const { text, id } = tag;
              return (
                <Menu.Item className={styles.labels} key={id}>
                  {text}
                  <Popconfirm
                    key={'ppp'}
                    title="确认要删除吗?"
                    onConfirm={() => this.deleteTag(id)}
                    okText="是"
                    cancelText="否"
                  >
                    <Icon type="close" className={styles.close} />
                  </Popconfirm>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
      );
    } else return <div />;
  };
  render() {
    const { uploadVisible, tagVisible } = this.props.interview;
    const { tagGroups } = this.props.tag;

    return (
      <div className={styles.container}>
        <Upload uploadVisible={uploadVisible} />
        {this.RecordComponent()}
        {this.LabelComponent(tagVisible, extractTags(tagGroups))}
      </div>
    );
  }
}
