import React, { Component } from 'react';
import { List, Card, Button, Tabs } from 'antd';
import { connect } from 'dva';

import styles from './export.less';
import { TTag, TTagGroup, TTagModel } from '../../models/tag';
const { Item } = List;
const { TabPane } = Tabs;
const ButtonGroup = Button.Group;
interface IExportProps {
  tag: TTagModel;
  dispatch: Function;
}
@connect(({ tag }) => ({ tag }))
export default class Export extends Component<IExportProps> {
  static defaultProps: IExportProps = {
    tag: {
      selectedTags: [],
      tagGroups: [],
      exportDisplay: '1',
      tagVisible: true,
    },
    dispatch: () => {},
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'tag/fetchTagGroups',
    });
  }
  changeDisplay = (key) => {
    this.props.dispatch({
      type: 'tag/handleExportDisplay',
      payload: key,
    });
  };
  render() {
    const { tag } = this.props;
    const { tagGroups, exportDisplay } = tag;
    return (
      <div className={styles.container}>
        <Tabs type="card" onChange={this.changeDisplay}>
          <TabPane tab="需求层级列表" key="1" />
          <TabPane tab="星球图" key="2" />
        </Tabs>
        <div className={styles.content}>
          {exportDisplay === '1' ? (
            <List
              dataSource={tagGroups}
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
              renderItem={(item: TTagGroup) => (
                <Item>
                  <Card title={item.text}>
                    <List
                      dataSource={item.tags}
                      renderItem={(tag: TTag) => <Item> {tag.text}</Item>}
                    />
                  </Card>
                </Item>
              )}
            />
          ) : (
            <div>星光囚徒</div>
          )}
        </div>
      </div>
    );
  }
}
