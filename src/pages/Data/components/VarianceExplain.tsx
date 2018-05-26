import React, { Component, Fragment } from 'react';
// import styles from './VarianceExplain.less'
import { Table } from 'antd';
const { Column } = Table;
interface IVarianceExplainProps {
  data: object[];
  rotation: boolean;
}
export default class VarianceExplain extends Component<IVarianceExplainProps> {
  static defaultProps: IVarianceExplainProps = {
    data: [],
    rotation: false,
  };

  render() {
    const { data, rotation } = this.props;
    return (
      <div>
        <Table pagination={false} dataSource={data}>
          <Column key="dim" dataIndex="dims" title="成分" />
          <Column key="eigenValue" dataIndex="eigenValue" title="特征值" />
          <Column key="percent" dataIndex="percent" title="总计" />
          <Column key="acc" dataIndex="acc" title="累计" />
          {rotation ? (
            <Fragment>
              <Column key="r-eigenValue" dataIndex="r-eigenValue" />
              <Column key="r-percent" dataIndex="r-percent" />
              <Column key="r-acc" dataIndex="r-acc" />
            </Fragment>
          ) : null}
        </Table>
      </div>
    );
  }
}
