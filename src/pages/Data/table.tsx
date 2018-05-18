import React, { PureComponent, Fragment } from 'react';
import { Table, Input, Button, Card } from 'antd';
import { connect } from 'dva';
import styles from './table.less';
import { Ellipsis } from '../../components';

import { getFilterTableData, getColumns, getTableData, getFilterColumns } from '../../utils';
import { TColumn, TQuesData, TSelectedQue } from '../../models/data';
import { TTableModel } from '../../models/table';
import { type } from 'os';
const { Column } = Table;

interface ITableDataProps {
  quesData: TQuesData;
  dispatch: Function;
  table: TTableModel;
  selectedQues: TSelectedQue[];
}

@connect(({ data, table }) => ({ quesData: data.quesData, table, selectedQues: data.selectedQues }))
export default class TableData extends PureComponent<ITableDataProps> {
  static defaultProps: ITableDataProps = {
    quesData: [],
    selectedQues: [],
    dispatch: () => {},
    table: {
      displayOrder: false,
      displayFilter: false,
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
  changeFilterDisplay = () => {
    this.props.dispatch({
      type: 'table/changeFilterDisplay',
    });
  };
  render() {
    const { quesData, table, selectedQues } = this.props;
    const { displayOrder, displayFilter } = table;
    const columns = getColumns(quesData);
    const tableData = getTableData(quesData, displayOrder);
    const filterData = getFilterTableData(tableData, selectedQues, displayFilter);
    const filterColumns = getFilterColumns(columns, selectedQues, displayFilter);
    const width = 120 * filterColumns.length;

    return (
      <div className={styles.container}>
        <div className={styles['button-group']}>
          <Button style={{ marginRight: 16 }} onClick={this.changeFilterDisplay}>
            显示{displayFilter ? '所有' : '选择'}
          </Button>
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
      </div>
    );
  }
}
