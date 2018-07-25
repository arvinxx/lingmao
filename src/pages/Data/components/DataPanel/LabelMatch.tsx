import React, { Component } from 'react';
import { Button, Tag, List } from 'antd';
import router from 'umi/router';

import { getBaseUrl, getFilterLabels } from '@/utils';
import { compact } from 'lodash';

import styles from './LabelMatch.less';

import { data } from '@/common';

import { IKeyDimension } from '@/models/data';
import { ILabel } from '@/models/tag';
import { DispatchProp } from 'react-redux';

const { Item } = List;

interface ILabelMatchProps {
  analysisStage: number;
  labels: ILabel[];
  pathname: string;
  tagMatchState: number;
  keyDimensions: IKeyDimension[];
}
export default class LabelMatch extends Component<ILabelMatchProps & DispatchProp> {
  static defaultProps: ILabelMatchProps = {
    analysisStage: 0,
    labels: [],
    pathname: '',
    tagMatchState: 0,
    keyDimensions: [],
  };

  selectLabels = (key) => {
    const { dispatch, tagMatchState, keyDimensions } = this.props;

    if (keyDimensions.length > tagMatchState) {
      // 将 keyDimensions 的 question.text 添加到 labels 的 questionKey 中
      dispatch({
        type: 'tag/selectMatchLabel',
        payload: { questionKey: keyDimensions[tagMatchState].question.text, labelKey: key },
      });
      // 当前匹配状态 ++
      dispatch({ type: 'stage/handleTagMatchState', payload: tagMatchState + 1 });
    }
  };

  removeMatchLabel = (index) => {
    if (index > -1) {
      this.props.dispatch({ type: 'tag/removeMatchLabel', payload: index });
    }
  };

  handleTagMatch = (index) => {
    this.props.dispatch({
      type: 'stage/handleTagMatchState',
      payload: index,
    });
  };
  skip = () => {
    console.log('skip');
  };
  finish = () => {
    const { dispatch, analysisStage, pathname, labels } = this.props;
    const filterLabels = labels.filter((label) => label.questionKey !== undefined);
    console.log(filterLabels);
    dispatch({
      type: 'data/addLabelsToKeyDimensions',
      payload: filterLabels,
    });
    dispatch({
      type: 'data/addMatchTagToQuesData',
    });
    if (analysisStage === 2) {
      dispatch({ type: 'stage/addAnalysisStageCount' });

      dispatch({
        type: 'stage/addActivePanelList',
        payload: '3',
      });
      dispatch({
        type: 'stage/removeActivePanelList',
        payload: '2',
      });
    }
    router.push(`${getBaseUrl(pathname)}/${data[1].path}`); //跳转到 charts 页面
  };
  render() {
    const { labels, keyDimensions, tagMatchState } = this.props;
    const filterLabels = getFilterLabels(labels);
    const dataSource = keyDimensions.map((keyDimension) => keyDimension.question.text);
    return (
      <div className={styles.container}>
        <p style={{ paddingLeft: 24 }}>点击维度，匹配维度</p>
        <div className={styles['tag-container']}>
          {filterLabels.map((label: ILabel) => {
            const { key, text } = label;
            return (
              <Tag key={key} onClick={() => this.selectLabels(key)}>
                {text}
              </Tag>
            );
          })}
        </div>
        <List
          className={styles.list}
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Button onClick={this.skip}>跳过</Button>
              </div>
              <div>
                <Button style={{ marginRight: 16 }}>重置</Button>
                <Button type="primary" ghost onClick={this.finish}>
                  确认
                </Button>
              </div>
            </div>
          }
          bordered
          dataSource={dataSource}
          renderItem={(text, questionIndex) => {
            const labelIndex = labels.findIndex((label) => label.questionKey === text);
            return (
              <Item
                className={tagMatchState === questionIndex ? styles['list-active'] : ''}
                //@ts-ignore
                onClick={() => this.handleTagMatch(questionIndex)}
              >
                {text}
                <Tag
                  onClick={() => this.removeMatchLabel(labelIndex)}
                  className={
                    labelIndex < 0 ? styles['match-tag-default'] : styles['match-tag-active']
                  }
                >
                  {labelIndex < 0 ? '待匹配' : labels[labelIndex].text}
                </Tag>
              </Item>
            );
          }}
        />
      </div>
    );
  }
}
