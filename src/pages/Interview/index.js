import React from 'react';

import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

import 'react-reflex/styles.css';

import styles from './index.less';
import DragableTree from '../../components/TreeList/DragableTree';
import ListInput from '../../components/ListInput/index';

export default class ReflexBasicSplitterDemo extends React.Component {
  render() {
    const minPanelSize = 300;
    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>Header</div>
        <ReflexContainer orientation="vertical">
          <ReflexElement className={styles['left-container']} minSize={minPanelSize} />
          <ReflexSplitter />
          <ReflexElement className={styles['right-container']} minSize={minPanelSize}>
            <DragableTree />
            <ListInput />
          </ReflexElement>
        </ReflexContainer>
      </div>
    );
  }
}
