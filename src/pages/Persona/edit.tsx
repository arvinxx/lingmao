import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Tabs, Button } from 'antd';
import { PersonaEditor, DimensionList } from './components';

import styles from './edit.less';

import { DispatchProp } from 'react-redux';
import { IPersona, IPersonaState } from '@/models/persona';
import { TQuesData } from '@/models/data';

const { TabPane } = Tabs;

interface IEditProps {
  persona: IPersonaState;
  clusterResult: TQuesData;
}

interface IEditDefaultProps {}

@connect(({ persona, data }) => ({
  persona,
  clusterResult: data.userModels,
}))
export default class Edit extends Component<IEditProps & IEditDefaultProps & DispatchProp> {
  changePersonaIndex = (key) => {
    // 改变显示的画像
    this.props.dispatch({
      type: 'persona/handleDisplayIndex',
      payload: key,
    });
    // 用于刷新展示的维度群组
    // 如果没有这行,那么显示的维度群组仍然是之前一个画像的维度群组
    this.props.dispatch({
      type: 'persona/handleDisplayDimGroups',
    });
  };


  render() {
    const { persona, dispatch, clusterResult } = this.props;
    const {
      dimVisible,
      expandedDims,
      personaList,
      displayDimGroups,
      displayIndex,
      showText,
    } = persona;

    const { checkedDims, dimGroups, basicInfo } = personaList[displayIndex] as IPersona;

    return (
      <Fragment>
        <div className={styles.left}>
          <Tabs
            type="card"
            className={styles.tabs}
            activeKey={displayIndex}
            onChange={(key) => this.changePersonaIndex(key)}
          >
            {clusterResult.map((cluster, index) => {
              return (
                <TabPane tab={cluster.typeName} key={String(index)} className={styles.editor}>
                  <PersonaEditor
                    dimGroups={displayDimGroups}
                    clusterResult={cluster}
                    dispatch={dispatch}
                    persona={basicInfo}
                    showText={showText}
                    index={index}
                  />
                </TabPane>
              );
            })}
          </Tabs>
        </div>
        {dimVisible ? (
          <div className={styles.right}>
            <DimensionList
              index={Number(displayIndex)}
              checkedDims={checkedDims}
              expandedDims={expandedDims}
              dispatch={dispatch}
              dimGroups={dimGroups}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}
