import React, { PureComponent, Fragment } from 'react';
import { Table, Input, message, Card } from 'antd';
import { connect } from 'dva';
import styles from './table.less';
import { Ellipsis } from '../../components';

import { generateId, getRawColumns } from '../../utils';
import { TColumn } from '../../models/data';
const { Column } = Table;

interface ITableDataProps {
  rawData: Array<object>;
  dispatch: Function;
}

@connect(({ data }) => ({ rawData: data.rawData }))
export default class TableData extends PureComponent<ITableDataProps> {
  static defaultProps: ITableDataProps = {
    rawData: [],
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
    const { rawData } = this.props;
    //
    // rawData.map((item) => {
    //   item.key = generateId();
    // });
    const columns = getRawColumns(rawData);
    const width = 2000;

    return (
      <Card bordered={false} className={styles.left}>
        <Table
          loading={this.state.loading}
          dataSource={rawData}
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
