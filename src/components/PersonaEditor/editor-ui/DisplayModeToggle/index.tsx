import React from 'react';

import Provider from '../Provider';
import ToggleEdit from './ToggleEdit';
import ToggleInsert from './ToggleInsert';
import ToggleLayout from './ToggleLayout';
import ToggleResize from './ToggleResize';

import styles from './index.less';

export default (props: any) => (
  <Provider {...props}>
    <div className={styles.group}>
      <ToggleEdit />
      <ToggleInsert />
      <ToggleLayout />
      <ToggleResize />
    </div>
  </Provider>
);
