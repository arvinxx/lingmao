import React, { Component } from 'react';
import { List, Card } from 'antd';
import { Bar } from '@/components';
import { ClusterDisplay } from './components';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';

import styles from './analysis.less';
import { getBaseUrl } from '@/utils';

import { ITag } from '@/models/label';
import { TClusterResults } from '@/models/data';

const { Item } = List;
const mockDims = [
  { text: '1111', id: '111', dims: [{ text: '1231', id: '12312' }] },
  { text: '1111', id: '111', dims: [{ text: '1231', id: '12312' }] },
  { text: '1111', id: '111', dims: [{ text: '1231', id: '12312' }] },
  { text: '1111', id: '111', dims: [{ text: '1231', id: '12312' }] },
  { text: '1111', id: '111', dims: [{ text: '1231', id: '12312' }] },
];

const salesData = [];
for (let i = 0; i < 5; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
interface IAnalysisProps {
  selectDims: object[];
  pathname: string;
  dataFile: string;
  clusterResults: TClusterResults;
}
@(withRouter as any)
@connect(({ data, routing }) => ({
  clusterResults: data.clusterResults,
  pathname: routing.location.pathname,
}))
export default class Index extends Component<IAnalysisProps> {
  static defaultProps: IAnalysisProps = {
    selectDims: mockDims,
    pathname: '',
    dataFile: 'xxx.xls',
    clusterResults: [],
  };
  render() {
    const { selectDims, clusterResults, pathname, dataFile } = this.props;
    const baseUrl = getBaseUrl(pathname);
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.questionnares}>
            <span style={{ marginRight: 12 }}>问卷来源</span>
            <Link to={`${baseUrl}/table`}> {dataFile} </Link>
          </div>
          <div className={styles.validation}>
            <div style={{ marginBottom: 24 }}>有效性检验</div>
            <Bar height={250} title="" data={salesData} />
          </div>
          <div className={styles.dims}>
            <List
              dataSource={selectDims}
              grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }}
              renderItem={(item) => (
                <Item>
                  <Card title={item.text}>
                    <List
                      dataSource={item.dims}
                      renderItem={(tag: ITag) => <Item> {tag.text}</Item>}
                    />
                  </Card>
                </Item>
              )}
            />
          </div>
        </div>
        <div className={styles.right}>
          {clusterResults.map((clusterResult, index) => (
            <ClusterDisplay
              key={index + 'DISPLAY'}
              index={index}
              clusterResult={clusterResult}
              colMode
            />
          ))}
        </div>
      </div>
    );
  }
}
