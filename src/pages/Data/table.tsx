import React, { PureComponent, Fragment } from 'react';
import { Table, Input, message, Card } from 'antd';
import { connect } from 'dva';
import styles from './table.less';
import { Ellipsis } from '../../components';

import { generateId, getColumns, getTableData } from '../../utils';
import { TColumn, TQuesData } from '../../models/data';
const { Column } = Table;

interface ITableDataProps {
  quesData: Array<TQuesData>;
  dispatch: Function;
}

@connect(({ data }) => ({ quesData: data.quesData }))
export default class TableData extends PureComponent<ITableDataProps> {
  static defaultProps: ITableDataProps = {
    quesData: [],
    dispatch: () => {},
  };
  state = {
    width: '100%',
    value: 0,
    loading: false,
  };

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  render() {
    const { quesData } = this.props;
    //
    // quesData.map((item) => {
    //   item.key = generateId();
    // });
    const columns = getColumns(quesData);
    const tableData = getTableData(quesData);
    const width = 2000;

    return (
      <Card bordered={false} className={styles.left}>
        <Table
          loading={this.state.loading}
          dataSource={tableData}
          pagination={false}
          onChange={this.onChange}
          scroll={{ x: width, y: 720 }}
          rowKey="uid"
        >
          {columns.map((column: TColumn, index) => {
            const { key, title, dataIndex } = column;
            return (
              <Column
                title={
                  <Ellipsis length={15} tooltip>
                    {title}
                  </Ellipsis>
                }
                width={width / columns.length}
                key={key + index}
                dataIndex={dataIndex}
                render={(text, record) => {
                  return <div>{text}</div>;
                }}
              />
            );
          })}
        </Table>
      </Card>
    );
  }
}
