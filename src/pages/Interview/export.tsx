import React, { Component } from 'react';
import { List, Card, Button, Tabs } from 'antd';
import { connect } from 'dva';

import styles from './export.less';
import { StarPic } from '../../components';

import { TTag, TTagGroup } from '../../models/tag';
import { getStarData } from '../../utils';
import { queryDocument, saveTagGroups, getCleanTagGroups } from '../../services';
const { Item } = List;
const { TabPane } = Tabs;

interface IExportProps {
  tagGroups: TTagGroup[];
  id: string;
  exportDisplay: string;
  dispatch: Function;
}
@connect(({ tag, interview }) => ({
  tag,
  id: interview.id,
  tagGroups: tag.tagGroups,
  exportDisplay: tag.exportDisplay,
}))
export default class Export extends Component<IExportProps> {
  static defaultProps: IExportProps = {
    tagGroups: [],
    exportDisplay: '1',
    id: '',
    dispatch: () => {},
  };

  async componentDidMount() {
    let documents = await queryDocument();
    documents = Array.isArray(documents) ? documents : [];
    if (documents.length > 0) {
      this.props.dispatch({
        type: 'tag/querryTagGroups',
        payload: getCleanTagGroups(documents[0]),
      });
    }
  }
  componentWillUnmount() {
    const { id, tagGroups } = this.props;
    saveTagGroups({ id, tagGroups });
  }

  changeDisplay = (key) => {
    this.props.dispatch({
      type: 'tag/handleExportDisplay',
      payload: key,
    });
  };
  render() {
    const { tagGroups, exportDisplay } = this.props;
    const { categories, links, data } = getStarData(tagGroups);
    return (
      <div className={styles.container}>
        <Tabs
          type="card"
          className={styles.tabs}
          activeKey={exportDisplay}
          onChange={this.changeDisplay}
        >
          <TabPane tab="维度星球图" key="1" />
          <TabPane tab="维度列表" key="2" />
        </Tabs>
        <div className={styles.content}>
          {exportDisplay === '2' ? (
            <List
              dataSource={tagGroups}
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
              renderItem={(item: TTagGroup) =>
                item.tags.length === 0 ? (
                  <div />
                ) : (
                  <Item>
                    <Card title={item.text}>
                      <List
                        dataSource={item.tags}
                        renderItem={(tag: TTag) => <Item> {tag.text}</Item>}
                      />
                    </Card>
                  </Item>
                )
              }
            />
          ) : (
            <div className={styles.star}>
              <StarPic categories={categories} data={data} links={links} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
