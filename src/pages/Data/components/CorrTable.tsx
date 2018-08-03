import React, { Component } from 'react';
import { Table } from 'antd';
const { Column } = Table;

import { ITableColumn } from '../../../models/data';
interface ICorrTableProps {
  data: object[];
  columns: ITableColumn[];
}
export default class CorrTable extends Component<ICorrTableProps> {
  static defaultProps: ICorrTableProps = {
    columns: [],
    data: [],
  };

  render() {
    const { columns, data } = this.props;
    return (
      <div>
        <Table pagination={false} dataSource={data}>
          <Column key="dim" dataIndex="dims" />
          {columns.map((col) => {
            const { key, dataIndex, title } = col;
            return <Column title={title} key={key} dataIndex={dataIndex} />;
          })}
        </Table>
      </div>
    );
  }
}
