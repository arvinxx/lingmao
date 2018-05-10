import React, { Component } from 'react';
import { Popover, Input, Popconfirm, Icon } from 'antd';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

import { TTag } from '../../models/interview';
import PopupMenu from './PopupMenu';

import styles from './InputTooltip.less';

interface IHoveringMenuProps {
  dispatch: any;
  id: string;
  text: string;
  rawData: Value;
  recordFocusId: string;
  tags: Array<TTag>;
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
  menuRef = (menu) => {
    this.menu = menu;
  };
  private menu?: HTMLElement;
  private editorRef: HTMLElement;

  constructor(props: IHoveringMenuProps) {
    super(props);
    this.state.value = Value.fromJSON(props.rawData);
  }

  componentDidMount() {
    this.updateMenu();
  }
  componentWillReceiveProps(nextProps: IHoveringMenuProps) {
    this.state.value = Value.fromJSON(nextProps.rawData);
  }
  componentDidUpdate() {
    this.updateMenu();
    // const { id, recordFocusId } = this.props;
    // if (id === recordFocusId) {
    //   this.editorRef.focus();
    // }
  }

  updateMenu = () => {
    const { menu } = this;
    const { value } = this.state;
    if (!menu) return;

    if (value.isBlurred || value.isEmpty) {
      menu.removeAttribute('style');
      return;
    }

    const selection: Selection = window.getSelection();
    const range: Range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = '1';
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
    menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
  };

  onChange = ({ value }) => {
    const { dispatch, id } = this.props;
    if (value.document !== this.state.value.document) {
      const newText: string = Plain.serialize(value);
      dispatch({ type: 'interview/changeRecordText', payload: { id, newText } });
      dispatch({ type: 'interview/changeRecordRawData', payload: { id, rawData: value } });
    }
    console.log('触发更新');
    this.setState({ value });
  };
  onKeyDown = (event: KeyboardEvent, change) => {
    const { id, dispatch } = this.props;
    // 处理回车事件: 新增一条数据
    if (event.key === 'Enter') {
      dispatch({
        type: 'interview/addRecord',
        payload: id,
      });
      return false; // 阻止原生事件
    }
    // console.log(event.key);
    const text = Plain.serialize(this.state.value);
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
      this.props.dispatch({
        type: 'interview/moveUpRecordFocusId',
        payload: id,
      });
    }
    // 向下时移动光标
    if (event.key === 'ArrowDown') {
      this.props.dispatch({
        type: 'interview/moveDownRecordFocusId',
        payload: id,
      });
    }
  };

  changeTagText = (e, id, editor) => {
    console.log(e.target.value);
    this.props.dispatch({
      type: 'interview/changeTagText',
      payload: { id, newText: e.target.value },
    });
  };
  deleteTag = (id, editor) => {
    const { dispatch, tags } = this.props;
    dispatch({
      type: 'interview/deleteTag',
      payload: id,
    });
    if (tags.length <= 1) {
      editor.change((change) => change.removeMark(''));
      console.log('取消下划线');
    }
  };

  changeFocus = (id) => {
    console.log(id);
    this.props.dispatch({ type: 'interview/changeRecordFocusId', payload: id });
  };
  underLineComponent = (props) => {
    const { children, attributes, editor } = props;
    const { tags } = this.props;
    return (
      <Popover
        overlayClassName={styles['tag-pop']}
        // trigger="click"
        getPopupContainer={() => document.getElementById('tooltip') || document.body}
        visible={true}
        content={tags.map((tag: TTag) => {
          const { id, text } = tag;
          return (
            <div key={id + 'tag-container'} className={styles['tag-container']}>
              <div key={id + 'input-container'} className={styles['input-container']}>
                <Input
                  className={styles.tag}
                  onChange={(e) => this.changeTagText(e, id, editor)}
                  value={text}
                />
                <Popconfirm
                  key={'ppp'}
                  title="确认要删除吗?"
                  onConfirm={() => this.deleteTag(id, editor)}
                  okText="是"
                  cancelText="否"
                >
                  <Icon key={'close'} type="close" className={styles['value-delete']} />
                </Popconfirm>
              </div>
            </div>
          );
        })}
      >
        <span className={styles.underlines} {...attributes}>
          {children}
        </span>
      </Popover>
    );
  };

  render() {
    const value: Value = this.state.value;
    const { recordFocusId, id, dispatch } = this.props;
    return (
      <div className={styles.input}>
        <div className={styles.editor}>
          <Editor
            ref={(editor) => (this.editorRef = editor)}
            value={value}
            autoFocus={(() => {
              return recordFocusId === id;
            })()} // onFocus={() => this.changeFocus(id)}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            renderMark={this.underLineComponent}
          />
        </div>
        <div id="tooltip" />
        <PopupMenu
          menuRef={this.menuRef}
          value={value}
          onChange={this.onChange}
          dispatch={dispatch}
        />
      </div>
    );
  }
}
