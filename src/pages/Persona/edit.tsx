import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './edit.less';
import { TPersona } from '../../models/persona';
import { TTagModel } from '../../models/tag';

interface IEditProps {
  persona: TPersona;
  tag: TTagModel;
}
@connect(({ persona, tag }) => ({ persona, tag }))
export default class Edit extends Component<IEditProps> {
  render() {
    const { persona, tag } = this.props;
    const { tagGroups } = tag;
    const { checkedDims } = persona;

    return (
      <div className={styles.left}>
        <div>desigen</div>
      </div>
    );
  }
}
