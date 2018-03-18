import React from 'react';

import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

import 'react-reflex/styles.css';

import styles from './styles.less';
import ListInput from '../../components/ListInput';
import TagInput from '../../components/TagInput';

export default class ReflexBasicSplitterDemo extends React.Component {
  render() {
    const minPanelSize = 150;
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement flex="0.5" className={styles['up-container']} minSize={minPanelSize}>
              <ListInput />
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
