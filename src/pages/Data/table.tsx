import React, { PureComponent, Fragment } from 'react';
import { Table, Input, Button, Card } from 'antd';
import { connect } from 'dva';
import styles from './table.less';
import { Ellipsis } from '../../components';

import { getFilterTableData, getColumns, getTableData, getFilterColumns } from '../../utils';
import { TColumn, TQuesData } from '../../models/data';
import { TTableModel } from '../../models/table';
import { type } from 'os';
const { Column } = Table;

interface ITableDataProps {
  quesData: Array<TQuesData>;
  dispatch: Function;
  table: TTableModel;
}

@connect(({ data, table }) => ({ quesData: data.quesData, table }))
export default class TableData extends PureComponent<ITableDataProps> {
  static defaultProps: ITableDataProps = {
    quesData: [],
    dispatch: () => {},
    table: {
      displayOrder: false,
      isSelect: false,
    },
  };
  state = {
    width: '100%',
    value: 0,
    loading: false,
  };

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };
  changeOrderDisplay = () => {
    this.props.dispatch({
      type: 'table/changeOrderDisplay',
    });
  };
  render() {
    const { quesData, table } = this.props;
    const { displayOrder, isSelect } = table;
    const columns = getColumns(quesData);
    const tableData = getTableData(quesData, displayOrder);
    const filterData = getFilterTableData(tableData, isSelect);
    const width = 2000;
    const filterColumns = getFilterColumns(columns, isSelect);

    return (
      <Card bordered={false} className={styles.container}>
        <div className={styles['button-group']}>
          <Button style={{ marginRight: 16 }}>展示所有</Button>
          <Button onClick={this.changeOrderDisplay}>显示{displayOrder ? '文字' : '编号'}</Button>
        </div>
        <Table
          loading={this.state.loading}
          dataSource={filterData}
          pagination={false}
          onChange={this.onChange}
          scroll={{ x: width, y: 720 }}
          rowKey="uid"
        >
          {filterColumns.map((column: TColumn, index) => {
            const { key, title, dataIndex } = column;
            return (
              <Column
                title={
                  <Ellipsis length={15} tooltip>
                    {title}
                  </Ellipsis>
                }
                width={width / filterColumns.length}
                key={key + index}
                dataIndex={dataIndex}
                render={(text, record) => {
                  return (
                    <Ellipsis length={15} tooltip>
                      {text}
                    </Ellipsis>
                  );
                }}
              />
            );
          })}
        </Table>
      </Card>
    );
  }
}
