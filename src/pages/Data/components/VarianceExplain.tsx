import React, { Component, Fragment } from 'react';
// import styles from './VarianceExplain.less'
import { Table } from 'antd';
const { Column, ColumnGroup } = Table;
export interface IVarianceExplainProps {
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
          {rotation
            ? [
                <ColumnGroup key="base" title="未旋转">
                  <Column key="eigenValue" dataIndex="eigenValue" title="特征值" />
                  <Column key="percent" dataIndex="percent" title="总计" />
                  <Column key="acc" dataIndex="acc" title="累计" />
                </ColumnGroup>,
                <ColumnGroup title="旋转后" key="r">
                  <Column key="r-eigenValue" dataIndex="r-eigenValue" title="特征值" />
                  <Column key="r-percent" dataIndex="r-percent" title="总计" />
                  <Column key="r-acc" dataIndex="r-acc" title="累计" />
                </ColumnGroup>,
              ]
            : [
                <Column key="eigenValue" dataIndex="eigenValue" title="特征值" />,
                <Column key="percent" dataIndex="percent" title="总计" />,
                <Column key="acc" dataIndex="acc" title="累计" />,
              ]}
        </Table>
      </div>
    );
  }
}
