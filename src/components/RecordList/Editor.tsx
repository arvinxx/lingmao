import React, { Component, createContext } from 'react';
import { Popover, Input, Popconfirm, Icon } from 'antd';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
// import { createContext } from 'react-broadcast';
import { extractTags } from '../../utils';
import { TTag, TTagGroup } from '../../models/interview';
import PopupMenu from './PopupMenu';
import InputTooltip from './InputTooltip';
import styles from './Editor.less';

export interface IEditorProps {
  dispatch: any;
  id: string;
  text: string;
  rawData: Value;
  recordFocusId: string;
  tagGroups: Array<TTagGroup>;
}

interface IEditorStates {
  tagValue: string;
  value: Value;
}

export default class Editor extends Component<IEditorProps, IEditorStates> {
  state = {
    value: Value.fromJSON(Plain.deserialize('')),
    tagValue: '',
  };
  menuRef = (menu) => {
    this.menu = menu;
  };
  private menu?: HTMLElement;
  private editorRef: HTMLElement;

  constructor(props: IEditorProps) {
    super(props);
    this.state.value = Value.fromJSON(props.rawData);
  }

  componentDidMount() {
    this.updateMenu();
  }
  componentWillReceiveProps(nextProps: IEditorProps) {
    this.state.value = Value.fromJSON(nextProps.rawData);
    // this.state.tags = ;
  }
  componentWillUpdate() {
    return false;
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
    // console.log('触发更新');
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

  changeFocus = (id) => {
    console.log(id);
    this.props.dispatch({ type: 'interview/changeRecordFocusId', payload: id });
  };

  render() {
    const value: Value = this.state.value;
    const { recordFocusId, id, dispatch, tagGroups } = this.props;
    const { Provider, Consumer } = createContext({});
    const tags = extractTags(tagGroups);
    return (
      <div className={styles.input}>
        <div className={styles.editor}>
          <SlateEditor
            ref={(editor) => (this.editorRef = editor)}
            value={value}
            // autoFocus={(() => {
            //   return recordFocusId === id;
            // })()}
            // onFocus={() => this.changeFocus(id)}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            renderMark={(props) => (
              <InputTooltip props={props} id={id} tags={tags} dispatch={dispatch} />
            )}
          />
        </div>
        <div id="tooltip" />
        <PopupMenu
          menuRef={this.menuRef}
          value={value}
          onChange={this.onChange}
          dispatch={dispatch}
          refId={id}
        />
      </div>
    );
  }
}
