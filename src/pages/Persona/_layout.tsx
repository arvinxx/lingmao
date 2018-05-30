import React, { Component } from 'react';
import { Layout } from 'antd';
import { persona as header } from '../../common/header';
import { Header } from '../../components';
import styles from './layout.less';
import { DragDropContext } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
const { Content } = Layout;

@(DragDropContext(HTML5Backend) as any)
export default class PersonaLayout extends Component {
  render() {
    return (
      <div className={styles.layout}>
        <Header header={header} />
        <div className={styles.container}>{this.props.children}</div>
      </div>
    );
  }
}
