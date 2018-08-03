import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import styles from './table.less';
import { Ellipsis } from '@/components';
import { isEqual } from 'lodash';

import { getFilterTableData, getColumns, getTableData, getFilterColumns } from '@/utils';
import { TQuesData, IKeyDimension } from '@/models/data';
import { ITableColumn, ITableState } from './models/table';

import { DispatchProp } from 'react-redux';
const { Column } = Table;

interface ITableDataProps {
  quesData: TQuesData;
  table: ITableState;
  keyDimensions: IKeyDimension[];
}

@connect(({ data, table }) => ({
  quesData: data.quesData,
  keyDimensions: data.keyDimensions,
  table,
}))
export default class TableData extends Component<ITableDataProps & DispatchProp> {
  static defaultProps: ITableDataProps = {
    quesData: [],
    keyDimensions: [],
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

  shouldComponentUpdate(nextProps) {
    const { quesData, table } = this.props;
    const { quesData: nextquesData, table: nextTable } = nextProps;
    return !(isEqual(table, nextTable) && isEqual(quesData, nextquesData));
  }

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
    const { quesData, table, keyDimensions } = this.props;
    const { displayOrder, displayFilter } = table;
    const columns = getColumns(quesData);
    const tableData = getTableData(quesData, displayOrder);
    const filterData = getFilterTableData(tableData, keyDimensions, displayFilter);
    const filterColumns = getFilterColumns(columns, keyDimensions, displayFilter);
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
          locale={{
            emptyText: '暂无数据',
          }}
          loading={this.state.loading}
          dataSource={filterData}
          pagination={false}
          onChange={this.onChange}
          scroll={{ x: width, y: 550 }}
        >
          {filterColumns.map((column: ITableColumn, index) => {
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
                render={(text) => {
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
