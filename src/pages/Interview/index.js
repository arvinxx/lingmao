import React from 'react';

import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

import 'react-reflex/styles.css';

import styles from './index.less';
import ListInput from '../../components/ListInput/index';
import EditableTagGroup from './TagInput';

export default class ReflexBasicSplitterDemo extends React.Component {
  render() {
    const minPanelSize = 150;
    return (
      <div className={styles.container}>
        <div className={styles.header}>Header</div>
        <div className={styles.card}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement className={styles['up-container']} minSize={minPanelSize}>
              <ListInput />
            </ReflexElement>
            <ReflexSplitter>
              <div className={styles['splitter-container']}>
                <div className={styles.splitter} />
              </div>
            </ReflexSplitter>
            <ReflexElement className={styles['down-container']} minSize={minPanelSize}>
              <EditableTagGroup />
            </ReflexElement>
          </ReflexContainer>
        </div>
      </div>
    );
  }
}
