import React, { Component } from 'react';
import { List } from 'antd';
import InputCell from './Input';
import './index.less';

const { Item } = List;
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

interface IRecord {
  id: string;
  text: string;
  comment: string;
}

interface RecordListProps {
  records: Array<IRecord>;
  dispatch: any;
}

export default class RecordList extends Component<RecordListProps, any> {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    selectedKeys: [],
  };

  render() {
    const { records, dispatch } = this.props;
    return (
      <List
        itemLayout="horizontal"
        dataSource={records}
        renderItem={(record: IRecord) => {
          const { comment, id, text } = record;
          return (
            <Item>
              <Item.Meta
                title={<InputCell id={id} text={text} type="text" dispatch={dispatch} />}
                description={
                  <InputCell id={id} text={comment} type="comment" dispatch={dispatch} />
                }
              />
            </Item>
          );
        }}
      />
    );
  }
}
