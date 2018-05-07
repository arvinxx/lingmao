import React, { Component } from 'react';
import { List, Input } from 'antd';
import { isEmpty } from 'lodash';
import { HotKeys } from 'react-hotkeys';

import './index.less';

const { Item } = List;
const map = {
  deleteRecord: ['del', 'backspace'],
};

interface IRecord {
  id: string;
  text: string;
  comment: string;
}

interface RecordListProps {
  records: Array<IRecord>;
  recordFocusId: string;
  dispatch: any;
  loading: any;
}

export default class RecordList extends Component<RecordListProps, any> {
  state = {};

  changeRecordText = (e, id) => {
    const text = e.target.value;
    this.props.dispatch({
      type: 'interview/changeRecordText',
      payload: { id, newText: text },
    });
  };

  addRecord = (id) => {
    this.props.dispatch({
      type: 'interview/addRecord',
      payload: id,
    });
  };
  deleteRecord = (id, text) => {
    if (isEmpty(text)) {
      this.props.dispatch({ type: 'interview/deleteRecord', payload: id });
    }
  };

  onTabChange = (id, bool) => {
    console.log('按下了 Tab！');
  };
  onDirectionChange = (id, dd) => {
    console.log(id + '方向变化');
  };
  changeRecordFocusId = (id) => {
    this.props.dispatch({ type: 'interview/changeRecordFocusId', payload: id });
  };

  onKeyDown = (e, id, text) => {
    const { onDirectionChange, onTabChange } = this;
    const { keyCode, shiftKey } = e;
    console.log(keyCode);
    if (keyCode === 9 && shiftKey) {
      // console.log("shift + Tab clicked!")
      if (onTabChange) {
        onTabChange(id, true);
      }
    }
    if (keyCode === 9 && !shiftKey) {
      // console.log("Tab clicked!")
      if (onTabChange) {
        e.preventDefault();
        onTabChange(id, false);
      }
    }
    if (keyCode >= 37 && keyCode <= 40 && onDirectionChange) {
      const temp = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
      };
      onDirectionChange(id, temp[keyCode.toString()]);
    }
  };

  render() {
    const { records, recordFocusId, loading } = this.props;

    return (
      <HotKeys keyMap={map}>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={records}
          loading={loading}
          renderItem={(record: IRecord) => {
            const { comment, id, text } = record;
            return (
              <HotKeys
                handlers={{
                  deleteRecord: () => {
                    this.deleteRecord(id, text);
                  },
                }}
              >
                <Item>
                  <Item.Meta
                    key={id + 'meta'}
                    title={
                      <Input
                        value={text}
                        id={id + 'text'}
                        onChange={(e) => {
                          this.changeRecordText(e, id);
                        }}
                        onFocus={() => {
                          this.changeRecordFocusId(id);
                        }}
                        autoFocus={recordFocusId === id}
                        onPressEnter={() => {
                          this.addRecord(id);
                        }}
                      />
                    }
                    //TODO: 按 Tab 编辑描述
                    // description=
                    //   () => {
                    //   if (comment !== ''||) {
                    //     return <InputCell id={id} text={comment} type="comment" dispatch={dispatch} />;
                    //   } else return '';
                    // }
                  />
                </Item>
              </HotKeys>
            );
          }}
        />
      </HotKeys>
    );
  }
}
