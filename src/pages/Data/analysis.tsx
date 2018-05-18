import React, { Component } from 'react';
import { List, Card } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import H from 'History';

import { ClusterDisplay, Bar } from '../../components';
import clusterResults from '../../../mock/cluster';
import { TTag, TTagGroup } from '../../models/tag';

import styles from './analysis.less';
import { getBaseUrl } from '../../utils';

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
  location: H.Location;
  dataFile: string;
}
@(withRouter as any)
export default class Index extends Component<IAnalysisProps> {
  static defaultProps: IAnalysisProps = {
    selectDims: mockDims,
    location: {
      pathname: '',
      hash: '',
      key: '',
      search: '',
      state: '',
    },
    dataFile: 'xxx.xls',
  };

  render() {
    const { selectDims, location, dataFile } = this.props;
    const baseUrl = getBaseUrl(location.pathname);
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
                      renderItem={(tag: TTag) => <Item> {tag.text}</Item>}
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
