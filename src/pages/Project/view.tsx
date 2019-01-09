import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

import styles from './view.less';

import { DispatchProp } from 'react-redux';
import { IProjectState, default as project } from './models/project';

const { Meta } = Card;
const projectListName = ['星标项目', '最近查看', '全部项目'];

export interface IViewProps {
  project: IProjectState;
}
@connect(({ project, user }) => ({
  project,
  user,
}))
export default class View extends Component<IViewProps & DispatchProp> {
  static defaultProps: IProjectState = {
    projectList: {
      starProjectList: [],
      recentProjectList: [],
      allProjectList: [],
    },
    currentProject: {},
  };
  deleteProject = (e, index) => {
    e.preventDefault();
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
    const { projectList } = this.props.project;
    const { starProjectList, recentProjectList, allProjectList } = projectList;
    console.log(projectList);

    return (
      <div className={styles.container}>
        <div className={styles.projectBox}>
          <div className={styles.list}>
            <div className={styles.title}>{projectListName[0]}</div>
            <div className={styles.projectList}>
              {starProjectList.map((item, index) => {
                return (
                  <Card hoverable key={index} className={styles['project-card']}>
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
                  <Card hoverable key={index} className={styles['project-card']}>
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
                    className={styles['project-card']}
                    onClick={() => this.gotoOneProject(index, 'all')}
                  >
                    <Button
                      type="primary"
                      icon="delete"
                      size="small"
                      className={styles['delete-button']}
                      onClick={(e) => {
                        this.deleteProject(e, index);
                      }}
                    />
                    <Button
                      type="primary"
                      icon="star"
                      size="small"
                      className={styles['star-button']}
                      onClick={(e) => {
                        this.deleteProject(e, index);
                      }}
                    />
                    <Meta title={item.name} description={item.description} />
                  </Card>
                );
              })}
              <Card
                hoverable
                className={`${styles['project-card']} ${styles['project-card-add']}`}
                onClick={() => this.createNewProject()}
              >
                <div className={styles['create-project']}>
                  <Icon className={styles['icon-plus']} type={'plus'} />
                  <Meta title="创建新项目" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
