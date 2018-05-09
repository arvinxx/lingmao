import React from 'react';
import styles from './ContentLayout.less';

export default ({ children, wrapperClassName }) => (
  <div style={{ margin: '24px 24px 0' }} className={wrapperClassName}>
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
