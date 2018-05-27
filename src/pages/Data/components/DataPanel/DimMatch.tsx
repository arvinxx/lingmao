import React, { Component } from 'react';
import { Button, Tag, List } from 'antd';
import router from 'umi/router';
import { isEmpty } from 'lodash';
import { data } from '../../../../common/header';

import { TDim, TSelectedQue } from '../../../../models/data';
import { getBaseUrl, getFilterDims } from '../../../../utils';
import styles from './DimMatch.less';

const { Item } = List;

interface IDimMatchProps {
  dispatch: Function;
  analysisStage: number;
  dims: Array<TDim>;
  pathname: string;
  selectedDims: string[];
  tagMatchState: number;
  selectedQues: Array<TSelectedQue>;
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
        dispatch({ type: 'data/changeMatchSelectedDims', payload: { oldId, newId: id } });
      } else {
        // 将选中 Id 添加到 selectionDims 中
        dispatch({ type: 'data/addMatchSelectionDims', payload: id });
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
  removeMatchDim = (index) => {
    this.props.dispatch({
      type: 'data/removeMatchSelectionDims',
      payload: index,
    });
  };

  finish = () => {
    const { dispatch, analysisStage, pathname } = this.props;
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
    const { dims, selectedQues, tagMatchState, selectedDims } = this.props;
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
            <Item
              className={tagMatchState === index ? styles['list-active'] : ''}
              //@ts-ignore
              onClick={(e) => this.handleTagMatch(index)}
            >
              {item}
              <Tag
                //@ts-ignore
                onClick={() => this.removeMatchDim(index)}
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