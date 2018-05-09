import React, { Component, DOMElement, ReactDOM, ReactElement } from 'react';
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
  tagValue: string;
  value: Value;
}

export default class HoveringMenu extends Component<IHoveringMenuProps, IHoveringMenuStates> {
  state = {
    value: Value.fromJSON(Plain.deserialize('')),
    tagValue: '',
  };
  value: Value;
  onChange = ({ value }) => {
    const { dispatch, id } = this.props;
    if (value.document !== this.state.value.document) {
      const newText: string = Plain.serialize(value);
      dispatch({ type: 'interview/changeRecordText', payload: { id, newText } });
    }
    this.setState({ value });
  };
  updateMenu = () => {
    const { menu } = this;
    const { value } = this.state;
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
  menuRef = (menu) => {
    this.menu = menu;
  };
  onKeyDown = (event: KeyboardEvent, change) => {
    const { id, dispatch } = this.props;
    // 处理回车事件: 新增一条数据
    if (event.key === 'Enter') {
      dispatch({
        type: 'interview/addRecord',
        payload: id,
      });
      return false;
    }
    console.log(event.key);
    const text = Plain.serialize(this.state.value);
    console.log(text);
    if (text === '') {
      if (event.key === 'Backspace') {
        console.log('delete!');
        dispatch({
          type: 'interview/deleteRecord',
          payload: id,
        });
        return false;
      }
    }
    // 向上时移动光标
    if (event.key === 'ArrowUp') {
      console.log('Up!');
      this.props.dispatch({
        type: 'interview/moveUpRecordFocusId',
        payload: id,
      });
    }
    // 向下时移动光标
    if (event.key === 'ArrowDown') {
      console.log('Down!');
      this.props.dispatch({
        type: 'interview/moveDownRecordFocusId',
        payload: id,
      });
    }
  };
  changeFocus = (id) => {
    console.log(id);
    this.props.dispatch({ type: 'interview/changeRecordFocusId', payload: id });
  };
  deleteTag = (id) => {
    this.props.dispatch({
      type: '',
    });
  };
  private menu?: any;
  private editorRef?: HTMLElement;

  constructor(props) {
    super(props);
    this.state.value = Value.fromJSON(Plain.deserialize(props.text));
  }

  componentDidMount() {
    this.updateMenu();
  }

  componentDidUpdate() {
    this.updateMenu();
    const { id, recordFocusId } = this.props;
    if (id === recordFocusId) {
      this.editorRef.focus();
    }
  }
  changeTagValue = (e) => {
    this.setState({ tagValue: e.target.value });
  };

  componentWillReceiveProps(nextProps: IHoveringMenuProps) {
    this.state.value = Value.fromJSON(Plain.deserialize(nextProps.text));
  }

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
    const value: Value = this.state.value;
    const { recordFocusId, id } = this.props;
    const focusTransferPlugin = {
      onFocus: () => this.changeFocus(id),
    };
    return (
      <div className={styles.input}>
        <div className={styles.editor}>
          <Editor
            ref={(editor) => (this.editorRef = editor)}
            value={value}
            autoFocus={(() => {
              return recordFocusId === id;
            })()}
            onFocus={() => this.changeFocus(id)}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            renderMark={this.underLineComponent}
          />
        </div>
        <PopupMenu menuRef={this.menuRef} value={value} onChange={this.onChange} />
      </div>
    );
  }
}
