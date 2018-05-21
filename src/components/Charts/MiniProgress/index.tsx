import React, { PureComponent } from 'react';
import { Tooltip } from 'antd';

import styles from './index.less';

export interface MiniProgressProps {
  target?: number;
  color?: string;
  strokeWidth?: number;
  percent?: number;
  style?: React.CSSProperties;
}

export default class MiniProgress extends PureComponent<MiniProgressProps> {
  render() {
    const { color = '#439afc', strokeWidth, percent } = this.props;

    return (
      <div className={styles.miniProgress}>
        <div className={styles.progressWrap}>
          <Tooltip title={`数值: ${(percent / 20).toFixed(1)}`}>
            <div
              className={styles.progress}
              style={{
                backgroundColor: color || null,
                width: percent ? `${percent}%` : null,
                height: strokeWidth || null,
              }}
            />
          </Tooltip>
        </div>
      </div>
    );
  }
}
