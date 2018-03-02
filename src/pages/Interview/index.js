import React from 'react';

import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

import 'react-reflex/styles.css';

import styles from './index.less';
import ListInput from './ListInput';
import EditableTagGroup from './TagInput';

export default class ReflexBasicSplitterDemo extends React.Component {
  render() {
    const minPanelSize = 150;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles['tool-container']}>
            <div>icon1</div>
            <div>icon2</div>
            <div>icon3</div>
          </div>
          <div className={styles['tool-container']}>
            <div>记录</div>
            <div>标签</div>
          </div>
          <div className={styles['tool-container']}>
            <div>button1</div>
            <div>button2</div>
          </div>
        </div>
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
