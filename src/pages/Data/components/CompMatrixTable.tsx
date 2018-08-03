import React, { Component } from 'react';
import { Table, Button, Collapse } from 'antd';
import { ITableColumn } from '@/models/data';
// import styles from './CompMatrixTable.less';
const Panel = Collapse.Panel;
const { Column } = Table;
interface ICompMatrixTableProps {
  data: object[];
  columns: ITableColumn[];
}
export default class CompMatrixTable extends Component<ICompMatrixTableProps> {
  static defaultProps: ICompMatrixTableProps = {
    data: [],
    columns: [],
  };

  state = {
    filteredInfo: null,
    sortedInfo: null,
  };
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  render() {
    const { data, columns } = this.props;

    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="成分矩阵" key="1">
          <Table pagination={false} dataSource={data} onChange={this.handleChange}>
            <Column title="维度" key="dim" dataIndex="dims" />
            {columns.map((col) => {
              const { key, dataIndex, title } = col;
              return <Column title={title} key={key} dataIndex={dataIndex} />;
            })}
          </Table>
        </Panel>
      </Collapse>
    );
  }
}
