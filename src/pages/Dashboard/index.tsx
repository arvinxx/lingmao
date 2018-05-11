import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Layout } from 'antd';
import Authorized from 'utils/Authorized';
import { dashboard as header } from 'common/header';
import { Pie, WaterWave, Gauge, TagCloud } from 'components';
import { Header } from 'components';
import styles from './index.less';

const { Secured } = Authorized;
const { Content } = Layout;

// use permission as a parameter
const havePermissionAsync = new Promise((resolve) => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});

@Secured(havePermissionAsync)
@connect(({ dashboard, loading }) => ({
  dashboard,
  loading: loading.models.dashboard,
}))
export default class Index extends PureComponent<any, any> {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'dashboard/fetchTags',
    // });
  }

  render() {
    const { dashboard, loading } = this.props;
    const { tags } = dashboard;

    return (
      <Fragment>
        <Header header={header} />,
        <Content className={styles.content}>
          <div className={styles.container}>
            <Row gutter={24}>
              <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <Card title="用户画像" bordered={false}>
                  <Row>
                    <Col md={6} sm={12} xs={24} />
                    <Col md={6} sm={12} xs={24} />
                    <Col md={6} sm={12} xs={24} />
                    <Col md={6} sm={12} xs={24} />
                  </Row>
                  <div className={styles.mapChart}>
                    <Tooltip title="等待后期实现">
                      <img
                        src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                        alt="map"
                      />
                    </Tooltip>
                  </div>
                </Card>
              </Col>
              <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                <Card title="用户地图" style={{ marginBottom: 24 }} bordered={false} />
                <Card
                  title="移情图"
                  style={{ marginBottom: 24 }}
                  bodyStyle={{ textAlign: 'center' }}
                  bordered={false}
                >
                  <Gauge
                    format={(val) => {
                      switch (parseInt(val, 10)) {
                        case 20:
                          return '差';
                        case 40:
                          return '中';
                        case 60:
                          return '良';
                        case 80:
                          return '优';
                        default:
                          return '';
                      }
                    }}
                    title="跳出率"
                    height={180}
                    percent={87}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <Card title="用户画像" bordered={false}>
                  <Row>
                    <Col md={6} sm={12} xs={24} />
                    <Col md={6} sm={12} xs={24} />
                    <Col md={6} sm={12} xs={24} />
                    <Col md={6} sm={12} xs={24} />
                  </Row>
                  <div className={styles.mapChart}>
                    <Tooltip title="等待后期实现">
                      <img
                        src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                        alt="map"
                      />
                    </Tooltip>
                  </div>
                </Card>
              </Col>
              <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                <Card title="用户地图" style={{ marginBottom: 24 }} bordered={false} />
                <Card
                  title="移情图"
                  style={{ marginBottom: 24 }}
                  bodyStyle={{ textAlign: 'center' }}
                  bordered={false}
                >
                  <Gauge
                    format={(val) => {
                      switch (parseInt(val, 10)) {
                        case 20:
                          return '差';
                        case 40:
                          return '中';
                        case 60:
                          return '良';
                        case 80:
                          return '优';
                        default:
                          return '';
                      }
                    }}
                    title="跳出率"
                    height={180}
                    percent={87}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xl={12} lg={24} sm={24} xs={24}>
                <Card title="需求提取" bordered={false} className={styles.pieCard}>
                  <Row style={{ padding: '16px 0' }}>
                    <Col span={8}>
                      <Pie
                        animate={false}
                        percent={28}
                        subTitle="中式快餐"
                        total="28%"
                        height={128}
                        lineWidth={2}
                      />
                    </Col>
                    <Col span={8}>
                      <Pie
                        animate={false}
                        color="#5DDECF"
                        percent={22}
                        subTitle="西餐"
                        total="22%"
                        height={128}
                        lineWidth={2}
                      />
                    </Col>
                    <Col span={8}>
                      <Pie
                        animate={false}
                        color="#2FC25B"
                        percent={32}
                        subTitle="火锅"
                        total="32%"
                        height={128}
                        lineWidth={2}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xl={6} lg={12} sm={24} xs={24}>
                <Card
                  title="竞品信息"
                  loading={loading}
                  bordered={false}
                  bodyStyle={{ overflow: 'hidden' }}
                >
                  <TagCloud data={tags} height={161} />
                </Card>
              </Col>
              <Col xl={6} lg={12} sm={24} xs={24}>
                <Card
                  title="竞品热力图"
                  bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                  bordered={false}
                >
                  <WaterWave height={161} title="补贴资金剩余" percent={34} />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>,
      </Fragment>
    );
  }
}
