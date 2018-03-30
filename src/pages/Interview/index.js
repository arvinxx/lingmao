import React, { Component } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

import 'react-reflex/styles.css';

import { TagInput, TreeList } from '../../components';
import styles from './styles.less';

export default class Interview extends Component {
  render() {
    const minPanelSize = 150;
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement flex="0.5" className={styles['up-container']} minSize={minPanelSize}>
              <TreeList />
            </ReflexElement>
            <ReflexSplitter>
              <div className={styles.touch}>
                <div className={styles['splitter-container']}>
                  <div className={styles.splitter} />
                </div>
              </div>
            </ReflexSplitter>
            <ReflexElement flex="0.5" className={styles['down-container']} minSize={minPanelSize}>
              <TagInput />
            </ReflexElement>
          </ReflexContainer>
        </div>
      </div>
    );
  }
}
