import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { DimensionList, PersonaEditor } from '../../components';

import styles from './edit.less';
import { TPersona } from '../../models/persona';

import { DispatchProp } from 'react-redux';
interface IEditProps {
  persona: TPersona;
  selectClusterIndex: number;
}
@connect(({ persona, data }) => ({
  persona,
  selectClusterIndex: data.selectClusterIndex,
}))
export default class Edit extends Component<IEditProps & DispatchProp> {
  static defaultProps: IEditProps = {
    persona: {
      checkedDims: [],
      expandedDims: [],
      dimVisible: true,
      exportVisible: false,
      name: '',
      personaDimGroups: [],
      personaDisplayDimGroups: [],
      keywords: '',
    },
    selectClusterIndex: 0,
  };

  render() {
    const { persona, dispatch } = this.props;
    const {
      checkedDims,
      dimVisible,
      expandedDims,
      personaDimGroups,
      personaDisplayDimGroups,
    } = persona;
    return (
      <Fragment>
        <div className={styles.left}>
          <PersonaEditor
            personaDimGroups={personaDisplayDimGroups}
            dispatch={dispatch}
            persona={persona}
            checkedDims={checkedDims}
          />
        </div>
        {dimVisible ? (
          <div className={styles.right}>
            <DimensionList
              checkedDims={checkedDims}
              expandedDims={expandedDims}
              dispatch={dispatch}
              personaDimGroups={personaDimGroups}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}
