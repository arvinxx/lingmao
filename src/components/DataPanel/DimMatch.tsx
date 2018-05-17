import React, { Component } from 'react';
import { Button, Tag, List } from 'antd';
import router from 'umi/router';

import { TDim, TSelectQue } from '../../models/data';
import { baseUrl, getKeyArrays } from '../../utils';
import styles from './DimMatch.less';

const { CheckableTag } = Tag;
const { Item } = List;

interface IDimMatchProps {
  dispatch: Function;
  analysisStage: number;
  dims: Array<TDim>;
  pathname: string;
  selectedQues: Array<TSelectQue>;
}
export default class DimMatch extends Component<IDimMatchProps> {
  static defaultProps: IDimMatchProps = {
    analysisStage: 0,
    dispatch: () => {},
    dims: [],
    pathname: '',
    selectedQues: [],
  };

  handleChange = (checked) => {
    this.setState({ checked });
  };

  finish = () => {
    if (this.props.analysisStage === 2) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '3' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '2' });
    }
    router.push(`${baseUrl(this.props.pathname)}/validation`);
  };
  render() {
    const { dims, selectedQues } = this.props;

    const dataSource = selectedQues.map((selectedQue) => selectedQue.question.name);
    return (
      <div className={styles.container}>
        <p style={{ paddingLeft: 24 }}>点击维度，匹配维度</p>
        <div className={styles['tag-container']}>
          {dims.map((dim: TDim) => {
            const { id, selected, text } = dim;
            return (
              <CheckableTag key={id} checked={selected} onChange={this.handleChange}>
                {text}
              </CheckableTag>
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
          renderItem={(item) => (
            <Item
              onClick={(e) => {
                console.log(e);
              }}
            >
              {item}
              <Tag>dsafasd</Tag>
            </Item>
          )}
        />
      </div>
    );
  }
}
