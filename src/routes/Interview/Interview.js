import React from 'react';
import { List, Card, Avatar, Progress } from 'antd';
import { connect } from 'dva';
import moment from 'moment/moment';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicList.less';

const paginationProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 5,
  total: 50,
};

const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
  <div>
    <div>
      <span>Owner</span>
      <p>{owner}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>开始时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
    </div>
  </div>
);

@connect(({ list, loading }) => ({ list, loading: loading.models.list }))
export default class SearchTree extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 6,
      },
    });
  }

  render() {
    const { list: { list }, loading } = this.props;

    return (
      <PageHeaderLayout>
        <Card>
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} shape="square" size="large" />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.subDescription}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
