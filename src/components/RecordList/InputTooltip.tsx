import React, { Component } from 'react';
import { Popover, Input, Popconfirm, Icon } from 'antd';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import PopupMenu from './PopupMenu';

import styles from './InputTooltip.less';

interface IHoveringMenuProps {
  dispatch: any;
  id: string;
  text: string;
  recordFocusId: string;
}

interface IHoveringMenuStates {
  value: Value;
  tagValue: string;
}

export default class HoveringMenu extends Component<IHoveringMenuProps, IHoveringMenuStates> {
  state = {
    value: Plain.deserialize(this.props.text ? this.props.text : ''),
    tagValue: '',
  };
  menu?;
  menuRef = (menu) => {
    console.log(menu);
    this.menu = menu;
  };
  componentDidMount() {
    this.updateMenu();
  }

  componentDidUpdate() {
    this.updateMenu();
  }

  onChange = ({ value }) => {
    const { dispatch, id } = this.props;
    if (value.document != this.state.value.document) {
      const newText = Plain.serialize(value);
      dispatch({
        type: 'interview/changeRecordText',
        payload: { id, newText },
      });
      console.log(newText);
    }
    this.setState({ value });
  };
  updateMenu = () => {
    const { value } = this.state;
    const menu = this.menu;
    if (!menu) return;

    if (value.isBlurred || value.isEmpty) {
      menu.removeAttribute('style');
      return;
    }

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
    menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
  };
  onKeyDown = (event, change) => {
    const { id, dispatch } = this.props;
    console.log(event.Code);

    // PressEnter
    if (event.Code === 13) {
      dispatch({
        type: 'interview/addRecord',
        payload: id,
      });
      return false;
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: Plain.deserialize(this.props.text) });
  }

  changeTagValue = (e) => {
    this.setState({ tagValue: e.target.value });
  };

  underLineComponent = (props) => {
    const { children, attributes } = props;
    return (
      <Popover
        overlayClassName={styles['tag-pop']}
        content={
          <div className={styles['tag-container']}>
            <div className={styles['input-container']}>
              <Input className={styles.tag} onClick={this.changeTagValue} />
              <Popconfirm
                key={'ppp'}
                title="确认要删除吗?"
                //onConfirm={() => this.oldValueDelete(id, vid)}
                okText="是"
                cancelText="否"
              >
                <Icon key={'close'} type="close" className={styles['value-delete']} />
              </Popconfirm>
            </div>
          </div>
        }
      >
        <span className={styles.underlines} {...attributes}>
          {children}
        </span>
      </Popover>
    );
  };

  render() {
    return (
      <div className={styles.input}>
        <div className={styles.editor}>
          <Editor
            value={this.state.value}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            renderMark={this.underLineComponent}
          />
        </div>
        <PopupMenu menuRef={this.menuRef} value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}
