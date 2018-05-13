import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { DimensionList } from '../../components';

import styles from './edit.less';
import { TPersona } from '../../models/persona';
import { TTagModel } from '../../models/tag';

interface IEditProps {
  persona: TPersona;
  tag: TTagModel;
  dispatch: Function;
}
@connect(({ persona, tag }) => ({ persona, tag }))
export default class Edit extends Component<IEditProps> {
  componentDidMount() {
    this.props.dispatch({
      type: 'tag/fetchTagGroups',
    });
  }

  render() {
    const { persona, tag, dispatch } = this.props;
    const { tagGroups } = tag;
    const { checkedDims, dimVisible, expandedDims } = persona;

    return (
      <Fragment>
        <div className={styles.left}>
          <div>{checkedDims.map((checkedDim) => <div>{checkedDim}</div>)}</div>
        </div>
        {dimVisible ? (
          <div className={styles.right}>
            <DimensionList
              tagGroups={tagGroups}
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
