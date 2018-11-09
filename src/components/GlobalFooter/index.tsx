import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';
export interface GlobalFooterProps {
  links?: Array<{
    title: React.ReactNode;
    href: string;
    key: string;
    blankTarget?: boolean;
  }>;
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default class GlobalFooter extends Component<GlobalFooterProps> {
  render() {
    const { className, links, copyright } = this.props;
    const clsString = classNames(styles.globalFooter, className);
    return (
      <div className={clsString}>
        {links && (
          <div className={styles.links}>
            {links.map((link) => (
              <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
                {link.title}
              </a>
            ))}
          </div>
        )}
        {copyright && <div className={styles.copyright}>{copyright}</div>}
      </div>
    );
  }
}
