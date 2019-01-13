import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input, Icon, Menu, Dropdown, Modal, Button } from 'antd';
import { DispatchProp } from 'react-redux';

import styles from './styles.less';
import logo from '@/assets/logo.png';
const Search = Input.Search;

@connect(({ project, login }) => ({
  project,
  login,
}))
export default class Topbar extends Component<DispatchProp> {
  state = {
    titleName: '灵猫',
    iconState: {
      user: false,
    },
    modalVisible: false,
    newProjectName: '',
    newProjectDescription: '',
  };
  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }
  changeIconStateForUser(visible) {
    this.state.iconState.user = visible;
  }
  logout = () => {
    console.log('logout function');
    this.props.dispatch({
      type: 'login/logout',
    });
    router.push('/');
  };
  createNewProject = () => {
    console.log('prepare to create new project');
    this.setModalVisible(true);
  };
  doCreateNewProject = () => {
    console.log('create new project');
    this.setModalVisible(false);
    const name = this.state.newProjectName;
    const description = this.state.newProjectDescription;
    console.log('name,description', name, description);
    this.props.dispatch({
      type: 'project/createNew',
      payload: { name, description },
    });
    this.setState({ newProjectName: '', newProjectDescription: '' });
  };
  changeNewProjectName = (e) => {
    const newName = e.target.value;
    // console.log(newName);
    this.setState({ newProjectName: newName });
  };
  changeNewProjectDescription = (e) => {
    const newDescription = e.target.value;
    this.setState({ newProjectDescription: newDescription });
  };

  render() {
    // console.log(this.props);
    const userInfo = this.props.login.userInfo;
    const nickname = userInfo === null ? 'tourist' : userInfo.nickname;
    const ProjectDropdownMenu = (
      <Menu className={styles['add-project']}>
        <span className={styles['add-project-title']}>创建</span>
        <Menu.Divider />
        <Menu.Item
          className={styles['add-project-text']}
          key="1"
          onClick={(e) => this.createNewProject()}
        >
          创建项目
        </Menu.Item>
      </Menu>
    );
    const UserDropdownMenu = (
      <Menu className={styles['user-setting']}>
        <Menu.Item key="0" disabled>
          {nickname}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1" className={styles['user-setting-text']}>
          个人资料
        </Menu.Item>
        <Menu.Item key="2" className={styles['user-setting-text']}>
          我的项目
        </Menu.Item>
        <Menu.Item key="3" className={styles['user-setting-text']}>
          账户设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4" className={styles['user-setting-text']}>
          帮助
        </Menu.Item>
        <Menu.Item key="5" className={styles['user-setting-text']}>
          快捷键
        </Menu.Item>
        <Menu.Item key="6" className={styles['user-setting-text']}>
          更改语言
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="7" className={styles['user-setting-text']} onClick={(e) => this.logout()}>
          登出
        </Menu.Item>
      </Menu>
    );
    const { newProjectName, newProjectDescription } = this.state;
    return (
      <div className={styles.display}>
        <Modal
          className={styles.modal}
          title="创建新项目"
          centered
          visible={this.state.modalVisible}
          onOk={() => this.doCreateNewProject()}
          onCancel={() => this.setModalVisible(false)}
        >
          <div className={styles['modal-content']}>
            <Input className={styles['modal-input']}
              placeholder={newProjectName === '' ? '项目名称' : newProjectName}
              onChange={(e) => this.changeNewProjectName(e)}
            />
            <Input className={styles['modal-input']}
              placeholder={newProjectDescription === '' ? '项目简介' : newProjectDescription}
              onChange={(e) => this.changeNewProjectDescription(e)}
            />
          </div>
        </Modal>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className={styles.right}>
            <Search
              placeholder="搜索我的个人项目"
              onSearch={(value) => console.log(value)}
              className={styles.searchbar}
            />
            <Dropdown overlay={ProjectDropdownMenu}>
              <Icon type="plus-circle" theme="filled" className={styles['icon-add']} />
            </Dropdown>
            <Icon type="bell" theme="outlined" className={styles['icon']} />
            <Dropdown
              overlay={UserDropdownMenu}
              onVisibleChange={(visible) => {
                this.changeIconStateForUser(visible);
              }}
            >
              <Icon type="user" theme="outlined" className={styles['icon']} />
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}
