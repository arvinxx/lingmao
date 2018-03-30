import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'dva';
import TreeList from './TreeList';

import styles from './styles.less';

@connect(({ interview, loading }) => ({
  interview,
  loading: loading.models.interview,
}))
export default class Index extends Component<any, any> {
  componentDidMount() {
    this.props.dispatch({
      type: 'interview/fetchNode',
    });
  }

  titleChange = (e) => {
    const text = e.target.value;
    console.log(text);
    this.props.dispatch({
      type: 'interview/changeTitle',
      payload: text,
    });
  };

  render() {
    const { interview } = this.props;
    const { node, title } = interview;
    return (
      <div className={styles.container}>
        <Input className={styles.title} onChange={this.titleChange} value={title} />
        <TreeList nodes={node} />
      </div>
    );
  }
}
// {/*{this.renderTreeNodes(interview.node)}*/}
