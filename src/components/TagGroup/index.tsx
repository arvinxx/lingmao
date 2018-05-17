import React, { Component, Fragment } from 'react';
import { Collapse, Input, Popconfirm, Icon } from 'antd';

import Tags from './tags';
import styles from './index.less';
import { TSelectedTags, TTagGroup } from '../../models/tag';

const Panel = Collapse.Panel;

interface ITagGroupProps {
  dispatch: Function;
  tagGroups: Array<TTagGroup>;
  selectedTags: TSelectedTags;
}
export default class TagGroup extends Component<ITagGroupProps> {
  static defaultProps: ITagGroupProps = {
    dispatch: () => {},
    selectedTags: [],
    tagGroups: [{ text: '未分组', id: 'temp', tags: [] }],
  };
  state = {
    visible: false,
    tagGroupText: '',
    tagGroupPlaceHolder: '新的标签组',
  };

  newGroupOnInput = (e) => {
    this.setState({ tagGroupText: e.target.value });
  };
  newGroupOnFocus = (e) => {
    this.setState({ tagGroupPlaceHolder: '' });
  };
  newGroupOnBlur = () => {
    this.props.dispatch({
      type: 'tag/addTagGroup',
      payload: this.state.tagGroupText,
    });
    this.setState({ tagGroupPlaceHolder: '新的标签组', tagGroupText: '' });
  };
  newGroupOnPressEnter = () => {
    this.props.dispatch({
      type: 'tag/addTagGroup',
      payload: this.state.tagGroupText,
    });
    this.setState({ tagGroupPlaceHolder: '', tagGroupText: '' });
  };
  changeTagGroupText = (e, id) => {
    this.props.dispatch({
      type: 'tag/changeTagGroupText',
      payload: { id, newText: e.target.value },
    });
  };

  deleteTagGroup = (id) => {
    this.props.dispatch({
      type: 'tag/deleteTagGroup',
      payload: id,
    });
  };
  render() {
    const { tagGroups, selectedTags, dispatch } = this.props;
    const ungroupTags = tagGroups[0].tags;
    return (
      <Fragment>
        <div className={styles.ungroup}>
          <Tags tags={ungroupTags} selectedTags={selectedTags} dispatch={dispatch} />
        </div>
        <div className={styles.group}>
          {tagGroups.map((tagGroup, index) => {
            const { text, id, tags } = tagGroup;
            if (index !== 0) {
              return (
                <Collapse key={id + 'colap'} bordered={false}>
                  <Panel
                    key={id + 'Groups'}
                    header={
                      <div className={styles.header}>
                        <Input
                          key={id + 'groups+input'}
                          value={text}
                          onChange={(e) => this.changeTagGroupText(e, id)}
                        />
                        <Popconfirm
                          key={'ppp'}
                          title="确认要删除吗?"
                          onConfirm={() => this.deleteTagGroup(id)}
                          okText="是"
                          cancelText="否"
                        >
                          <Icon type="close" className={styles.close} />
                        </Popconfirm>
                      </div>
                    }
                  >
                    <Tags tags={tags} selectedTags={selectedTags} dispatch={dispatch} />
                  </Panel>
                </Collapse>
              );
            }
          })}
          <Input
            className={styles['add-group']}
            value={this.state.tagGroupText}
            placeholder={this.state.tagGroupPlaceHolder}
            onChange={this.newGroupOnInput}
            onFocus={this.newGroupOnFocus}
            onBlur={this.newGroupOnBlur}
            onPressEnter={this.newGroupOnPressEnter}
          />
        </div>
      </Fragment>
    );
  }
}
