import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { DimensionList, PersonaEditor } from '../../components';

import styles from './edit.less';
import { TPersona } from '../../models/persona';
import { getTagGroupId, getTagsArrById } from '../../utils';
import { TClusterResults } from '../../models/data';
import clusterResults from '../../../mock/clusterResults';
interface IEditProps {
  persona: TPersona;
  dispatch?: Function;
  clusterResults: TClusterResults;
  selectClusterIndex: number;
}
@connect(({ persona, data }) => ({
  persona,
  clusterResults: data.clusterResults,
  selectClusterIndex: data.selectClusterIndex,
}))
export default class Edit extends Component<IEditProps> {
  static defaultProps: IEditProps = {
    persona: {
      checkedDims: [],
      expandedDims: [],
      dimVisible: true,
      exportVisible: false,
      personaData: [],
    },
    clusterResults: [],
    selectClusterIndex: 0,
  };

  render() {
    const { persona, dispatch } = this.props;
    const { checkedDims, dimVisible, expandedDims, personaData } = persona;
    return (
      <Fragment>
        <div className={styles.left}>
          <PersonaEditor personaData={personaData} checkedDims={checkedDims} />
        </div>
        {dimVisible ? (
          <div className={styles.right}>
            <DimensionList
              clusterResult={clusterResults[0]}
              checkedDims={checkedDims}
              expandedDims={expandedDims}
              dispatch={dispatch}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}
