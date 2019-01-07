import React, { Component } from 'react';
import { Card, Icon, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

import styles from './view.less';

import { DispatchProp } from 'react-redux';
import { IProjectState } from './models/project';

const { Meta } = Card;
const projectListName = ['星标项目', '最近查看', '全部项目'];

@connect(({ project, user }) => ({
  project,
  user,
}))
export default class View extends Component<DispatchProp> {
  static defaultProps: IProjectState = {
    projectList: {
      starProjectList: [],
      recentProjectList: [],
      allProjectList: [],
    },
  };
  deleteProject = (index) => {
    console.log('delete index:', index);
    this.props.dispatch({
      type: 'project/deleteProject',
      payload: { index },
    });
  };
  gotoOneProject = (index, option) => {
    console.log('goto project index:', index, option);
    this.props.dispatch({
      type: 'project/gotoProject',
      payload: { index, option },
    });
  };
  render() {
    console.log(this.props);
    const projectList = this.props.project.projectList;
    const { starProjectList, recentProjectList, allProjectList } = projectList;
    // console.log(projectList);
    return (
      <div className={styles.container}>
        <div className={styles.projectBox}>
          <div className={styles.list}>
            <div className={styles.title}>{projectListName[0]}</div>
            <div className={styles.projectList}>
              {starProjectList.map((item, index) => {
                return (
                  <Card hoverable key={index} style={{ width: 200, height: 100 }}>
                    <Meta title={item.name} description={item.description} />
                  </Card>
                );
              })}
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.title}>{projectListName[1]}</div>
            <div className={styles.projectList}>
              {recentProjectList.map((item, index) => {
                return (
                  <Card hoverable key={index} style={{ width: 200, height: 100 }}>
                    <Meta title={item.name} description={item.description} />
                  </Card>
                );
              })}
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.title}>{projectListName[2]}</div>
            <div className={styles.projectList}>
              {allProjectList.map((item, index) => {
                return (
                  <Card
                    hoverable
                    key={index}
                    style={{ width: 200, height: 100 }}
                    onClick={() => this.gotoOneProject(index, 'all')}
                  >
                    <Button
                      type="primary"
                      icon="delete"
                      size="small"
                      className={styles.deleteButton}
                      onClick={() => {
                        this.deleteProject(index);
                      }}
                    />
                    <Meta title={item.name} description={item.description} />
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
