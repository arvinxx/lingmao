import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { drop, dropRight, last } from 'lodash';
import pathToRegexp from 'path-to-regexp';
import HeaderSearch from './HeaderSearch';

import router from 'umi/router';
import { generateId, getBaseUrl } from '../../utils';

const TabPane = Tabs.TabPane;
type TIcon = {
  text: string;
  dispatch: {
    type?: string;
  };
};
type TPanel = {
  text: string;
  path: string;
  right: Array<TIcon>;
  left: Array<TIcon>;
};
interface IHeaderProps {
  header: Array<TPanel>;
  pathname?: string;
  dispatch?: any;
  showMenu?: boolean;
}

interface IHeaderStates {
  currentPanel: string;
}

@connect(({ routing, global }) => ({
  pathname: routing.location.pathname,
  showMenu: global.showMenu,
}))
export default class Header extends Component<IHeaderProps, IHeaderStates> {
  static defaultProps: IHeaderProps = {
    dispatch: () => {},
    header: [],
    pathname: '',
    showMenu: true,
  };
  state = {
    currentPanel: '',
  };
  componentDidMount() {
    const { pathname } = this.props;
    this.urlPanelParse(pathname);
  }
  componentWillReceiveProps(nextProps:IHeaderProps) {
    this.urlPanelParse(nextProps.pathname);
  }
  // 根据路由状态更新
  urlPanelParse = (pathname: string): void => {
    const re = pathToRegexp('*/:panel');
    this.setState({
      currentPanel: last(re.exec(pathname)) || '',
    });
  };

  changeMenuState = () => {
    this.props.dispatch({
      type: 'menu/handleVisibility',
    });
  };

  goToRoute = (path: string) => {
    const { pathname } = this.props;
    const baseUrl = getBaseUrl(pathname);
    this.setState({
      currentPanel: path,
    });
    router.replace(`${baseUrl}/${path}`);
  };
  onClick = (dispatch) => {
    this.props.dispatch(dispatch);
  };

  render() {
    const { header, showMenu } = this.props;
    const { currentPanel } = this.state;
    const center = header.map((header) => ({ text: header.text, path: header.path }));
    return header.map((header, index) => {
      const { right, left } = header;
      if (header.path === currentPanel) {
        return (
          <div key={header + index.toString()} className={styles.header}>
            <div className={styles['tool-container']}>
              <Icon
                key="menu-hide"
                onClick={this.changeMenuState}
                type={showMenu ? 'menu-fold' : 'menu-unfold'}
                className={styles.icon}
              />
              {left.map((item) => {
                const { text, dispatch } = item;
                return (
                  <Icon
                    key={'icon' + text}
                    onClick={() => {
                      this.onClick(dispatch);
                    }}
                    type={text}
                    className={styles.icon}
                  />
                );
              })}
            </div>
            <Tabs
              key={header + index.toString()}
              activeKey={this.state.currentPanel}
              onChange={this.goToRoute}
              className={styles['tool-container']}
            >
              {center.map((item) => {
                const { text, path } = item;
                return <TabPane tab={text} key={path} />;
              })}
            </Tabs>
            <div className={styles['tool-container']}>
              <HeaderSearch
                placeholder="搜索"
                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                onSearch={(value) => {
                  console.log('input', value);
                }}
                onPressEnter={(value) => {
                  console.log('enter', value);
                }}
              />
              {right.map((item) => {
                const { text, dispatch } = item;
                return (
                  <Icon
                    key={'icon' + text}
                    onClick={() => {
                      this.onClick(dispatch);
                    }}
                    type={text}
                    className={styles.icon}
                  />
                );
              })}
            </div>
          </div>
        );
      }
    });
  }
}
