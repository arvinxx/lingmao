import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';

import { DispatchProp } from 'react-redux';
import { DimensionList, PersonaEditor } from '../../components';

import styles from './edit.less';
import { TPersona } from '../../models/persona';

const { TabPane } = Tabs;
interface IEditProps {
  persona: TPersona;
}
interface IEditDefaultProps {}
@connect(({ persona, data }) => ({
  persona,
}))
export default class Edit extends Component<IEditProps & IEditDefaultProps & DispatchProp> {
  changePersonaIndex = (key) => {
    this.props.dispatch({
      type: 'persona/handleDisplayIndex',
      payload: key,
    });
    this.props.dispatch({
      type: 'persona/handleDisplayDimGroups',
    });
  };
  render() {
    const { persona, dispatch } = this.props;
    const {
      dimVisible,
      expandedDims,
      personaData,
      personaDisplayDimGroups,
      displayIndex,
      showText,
    } = persona;
    if (personaData.length === 0) {
      return <div>no persona data</div>;
    }
    const { checkedDims, dimGroups, basicInfo } = personaData[Number(displayIndex)];
    return (
      <Fragment>
        <div className={styles.left}>
          <Tabs
            type="card"
            className={styles.tabs}
            activeKey={displayIndex}
            onChange={this.changePersonaIndex}
          >
            {personaData.map((dimGroups, index) => (
              <TabPane tab={'画像' + (index + 1)} key={index} />
            ))}
          </Tabs>
          <div className={styles.editor}>
            <PersonaEditor
              personaDimGroups={personaDisplayDimGroups}
              dispatch={dispatch}
              persona={basicInfo}
              showText={showText}
              index={Number(displayIndex)}
            />
          </div>
        </div>
        {dimVisible ? (
          <div className={styles.right}>
            <DimensionList
              index={Number(displayIndex)}
              checkedDims={checkedDims}
              expandedDims={expandedDims}
              dispatch={dispatch}
              personaDimGroups={dimGroups}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}
