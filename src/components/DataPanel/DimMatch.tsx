import React, { Component } from 'react';
import { Button, Tag, List } from 'antd';
import router from 'umi/router';
import { isEmpty } from 'lodash';

import { TDim, TSelectQue } from '../../models/data';
import { baseUrl, getFilterDims, getKeyArrays } from '../../utils';
import styles from './DimMatch.less';
import { TTag } from '../../models/tag';

const { Item } = List;

interface IDimMatchProps {
  dispatch: Function;
  analysisStage: number;
  dims: Array<TDim>;
  pathname: string;
  selectedDims: string[];
  tagMatchState: number;
  selectedQues: Array<TSelectQue>;
}
export default class DimMatch extends Component<IDimMatchProps> {
  static defaultProps: IDimMatchProps = {
    analysisStage: 0,
    dispatch: () => {},
    dims: [],
    pathname: '',
    tagMatchState: 0,
    selectedQues: [],
    selectedDims: [],
  };

  selectDims = (id, text) => {
    const { dispatch, tagMatchState, selectedQues } = this.props;
    if (selectedQues.length > tagMatchState) {
      const oldId = selectedQues[tagMatchState].tagId;
      if (oldId !== undefined) {
        // 将对象的 Id 与现有Id进行交换
        console.log('交换');
        console.log(oldId, id);
        dispatch({ type: 'data/changeSelectionDims', payload: { oldId, newId: id } });
      } else {
        // 将选中 Id 添加到 selectionDims 中
        dispatch({ type: 'data/addSelectionDims', payload: id });
      }
      // 替换当前选中对象 tagId 与 text
      selectedQues[tagMatchState].tagId = id;
      selectedQues[tagMatchState].tagText = text;
      dispatch({ type: 'data/handleSelectedQues', payload: selectedQues });
      // 当前匹配状态 ++
      dispatch({ type: 'stage/handleTagMatchState', payload: tagMatchState + 1 });
    }
  };

  handleTagMatch = (index) => {
    this.props.dispatch({
      type: 'stage/handleTagMatchState',
      payload: index,
    });
  };

  finish = () => {
    // 将 selectedQues 的数据发给 quesData

    if (this.props.analysisStage === 2) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({
        type: 'stage/addActivePanelList',
        payload: '3',
      });
      this.props.dispatch({
        type: 'stage/removeActivePanelList',
        payload: '2',
      });
    }
    router.push(`${baseUrl(this.props.pathname)}/validation`);
  };
  render() {
    const { dims, selectedQues, tagMatchState, selectedDims } = this.props;
    console.log(selectedDims);
    const filterDims = getFilterDims(dims, selectedDims);

    const dataSource = selectedQues.map((selectedQue) => selectedQue.question.name);
    return (
      <div className={styles.container}>
        <p style={{ paddingLeft: 24 }}>点击维度，匹配维度</p>
        <div className={styles['tag-container']}>
          {filterDims.map((dim: TDim) => {
            const { id, text } = dim;
            return (
              <Tag
                key={id}
                //@ts-ignore
                onClick={(e) => this.selectDims(id, text)}
              >
                {text}
              </Tag>
            );
          })}
        </div>
        <List
          className={styles.list}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: 16 }}>重置</Button>
              <Button type="primary" ghost onClick={this.finish}>
                确 认
              </Button>
            </div>
          }
          bordered
          dataSource={dataSource}
          renderItem={(item, index) => (
            <Item //@ts-ignore
              onClick={(e) => this.handleTagMatch(index)}
              className={tagMatchState === index ? styles['list-active'] : ''}
            >
              {item}
              <Tag
                className={
                  isEmpty(selectedQues[index].tagId)
                    ? styles['match-tag-default']
                    : styles['match-tag-active']
                }
              >
                {isEmpty(selectedQues[index].tagId) ? '待匹配' : selectedQues[index].tagText}
              </Tag>
            </Item>
          )}
        />
      </div>
    );
  }
}
