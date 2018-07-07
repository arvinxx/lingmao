import React, { PureComponent, ReactNode } from 'react';
import { Layout, Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './styles.less';

const { Sider } = Layout;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon: ReactNode = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export const getMeunMatcheys = (flatMenuKeys, path) => {
  return flatMenuKeys.filter((item) => {
    return pathToRegexp(item).test(path);
  });
};

interface MenuObj {
  name: string;
  icon: string | ReactNode;
  path: string;
  children?: MenuObj;
  target: string;
}

export default class SiderMenu extends PureComponent<any> {
  menus: Array<MenuObj>;

  constructor(props) {
    super(props);
    this.menus = props.menuData;
  }

  /**
   * 递归地将 json 格式数据转成列表
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus): string[] {
    let keys: string[] = [];
    menus.forEach((item: MenuObj) => {
      if (item.children) {
        keys.push(item.path);
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      } else {
        keys.push(item.path);
      }
    });
    return keys;
  }

  /**
   * 去掉前缀 /user => user
   * /user/chen => ['user','/user/:id']
   */
  getSelectedMenuKeys = (path) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.menus);
    return flatMenuKeys.filter((item) => pathToRegexp(`/${item}(.*)`).test(path));
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * @memberof SiderMenu
   */
  getMenuItemPath = (item: MenuObj) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;

    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        // target={target}
        replace={itemPath === this.props.location.pathname}
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  /**
   * 获得 MenuItem VDOM
   */
  getMenuItem = (item) => {
    return (
      <Menu.Item className={styles.submenu} key={item.path}>
        {this.getMenuItemPath(item)}
      </Menu.Item>
    );
  };

  /**
   * 展示 Menu 内容
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => {
        const ItemDom = this.getMenuItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item) => !!item);
  };

  /**
   * 转化路径
   */
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  /**
   * 检验权限
   */
  checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  /**
   * 改变 menu 的展示样式
   */
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const { logo, collapsed, location: { pathname }, onCollapse, width, showMenu } = this.props;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {};
    // if pathname can't match, use the nearest parent's key
    const selectedKeys = this.getSelectedMenuKeys(pathname);
    return (
      <div
        className={styles.display}
        style={
          showMenu ? { visibility: 'visible', opacity: 1 } : { visibility: 'hidden', opacity: 0 }
        }
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          onCollapse={onCollapse}
          width={width}
          className={styles.sider}
        >
          <div className={styles.container}>
            <div className={styles.logo} key="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <Menu
              key="Menu"
              mode="inline"
              {...menuProps}
              selectedKeys={selectedKeys}
              className={styles.menu}
            >
              {this.getNavMenuItems(this.menus)}
            </Menu>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </div>
        </Sider>
      </div>
    );
  }
}
