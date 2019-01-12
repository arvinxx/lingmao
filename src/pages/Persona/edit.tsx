import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Tabs, Button, Icon } from 'antd';
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
      payload: parseInt(key),
    });
    // 用于刷新展示的维度群组
    // 如果没有这行,那么显示的维度群组仍然是之前一个画像的维度群组
    // this.props.dispatch({
    //   type: 'persona/handleDisplayDimGroups',
    // });
  };
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  add = () => {
    console.log('add one ');
    this.props.dispatch({
      type: 'persona/addNewPersona',
    });
  };
  remove = (targetKey) => {
    console.log('delete one persona:', targetKey);
    this.props.dispatch({
      type: 'persona/removeOnePersona',
      payload: targetKey,
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
            type="editable-card"
            className={styles.tabs}
            activeKey={String(displayIndex)}
            onEdit={this.onEdit}
            onChange={(key) => this.changePersonaIndex(key)}
          >
            {personaList.map((item, index) => {
              return (
                <TabPane
                  tab={item.typeName}
                  key={String(index)}
                  className={styles.editor}
                  closable={personaList.length > 1}
                >
                  <PersonaEditor
                    dimGroups={displayDimGroups}
                    dispatch={dispatch}
                    persona={basicInfo}
                    showText={showText}
                    index={index}
                  />
                </TabPane>
              );
            })}
            {/*<TabPane*/}
            {/*tab={<span><Icon type="plus" /></span>}*/}
            {/*key={String(personaList.length+1)}*/}
            {/*className={styles.editor}*/}
            {/*onclick={this.addPersona()}*/}
            {/*>*/}
            {/*</TabPane>*/}
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
