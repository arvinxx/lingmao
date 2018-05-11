import React, { Component, ReactNode, Fragment } from 'react';
import { Collapse, Tag, Modal, Input } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { connect } from 'dva';

import { TTag, TTagGroup } from '../../models/interview';
import { TInterview } from './record';
import styles from './tag.less';

const Panel = Collapse.Panel;
const CheckableTag = Tag.CheckableTag;

const tags2 = [
  { id: '5345234', text: 'ddsd' },
  { id: '42366355', text: 'ddsd' },
  { id: '534673552423', text: 'ddsd' },
];
const tags3 = [
  { id: '5345234', text: 'd5362dsd' },
  { id: '42366355', text: 'ddsd' },
  { id: '534673552423', text: '3654323' },
];

const tagGroups: Array<TTagGroup> = [
  { id: '6457676556', text: 'sawe', tags: tags2, groupEditable: false },
  { id: '43276443', text: 'rwe 而', tags: tags3, groupEditable: true },
  { id: '64856893423', text: '儿童体验', tags: tags2, groupEditable: false },
];

interface ITagsProps {
  dispatch: any;
  interview: TInterview;
  loading: boolean;
}

@connect(({ interview, loading }) => ({
  interview,
  loading: loading.models.interview,
}))
export default class Tags extends Component<ITagsProps> {
  state = {
    visible: false,
    selectedTags: [],
    tagGroupText: '',
    tagGroupPlaceHolder: '新的标签组',
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'interview/fetchDocument',
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleClick = (e) => {};
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  groupTags = () => {
    console.log('组合标签');
  };

  newGroupOnInput = (e) => {
    this.setState({ tagGroupText: e.target.value });
  };
  newGroupOnFocus = (e) => {
    this.setState({ tagGroupPlaceHolder: '' });
  };
  newGroupOnBlur = () => {
    this.props.dispatch({
      type: 'interview/addTagGroup',
      payload: this.state.tagGroupText,
    });
    this.setState({ tagGroupPlaceHolder: '新的标签组', tagGroupText: '' });
  };
  newGroupOnPressEnter = () => {
    this.props.dispatch({
      type: 'interview/addTagGroup',
      payload: this.state.tagGroupText,
    });
    this.setState({ tagGroupPlaceHolder: '', tagGroupText: '' });
  };

  changeTagGroupText = (e, id) => {
    this.props.dispatch({
      type: 'interview/changeTagGroupText',
      payload: { id, newText: e.target.value },
    });
  };
  showGroupEdit = (id) => {
    this.props.dispatch({
      type: 'interview/showGroupEdit',
      payload: id,
    });
  };
  hideGroupEdit = (id) => {
    this.props.dispatch({
      type: 'interview/hideGroupEdit',
      payload: id,
    });
  };
  childTag = () => {
    console.log('成为子级');
  };
  TagsComponent = (tags: any[]): ReactNode => {
    const { selectedTags } = this.state;
    return (
      <div className={styles['tag-container']}>
        {tags.map((tag: TTag) => {
          const { id, text } = tag;
          return (
            <ContextMenuTrigger id="some-unique-identifier" key={id + 'trigger'}>
              <CheckableTag
                key={id + 'tag'}
                //@ts-ignore
                checked={selectedTags.indexOf(id) > -1}
                onChange={(checked) => this.handleChange(id, checked)}
              >
                {text}
              </CheckableTag>
            </ContextMenuTrigger>
          );
        })}
      </div>
    );
  };
  TagsGroupComponent = (tagGroups:Array<TTagGroup>) => (
    <Fragment>
      {tagGroups.map((tagGroup) => {
        const { text, id, tags, groupEditable } = tagGroup;
        return (
          <Collapse bordered={false}>
            <Panel
              key={id + 'Group'}
              //@ts-ignore
              onDoubleClick={() => this.showGroupEdit(id)}
              header={
                groupEditable ? (
                  <Input
                    value={text}
                    onChange={(e) => this.changeTagGroupText(e, id)}
                    onBlur={() => this.hideGroupEdit(id)}
                  />
                ) : (
                  text
                )
              }
            >
              {this.TagsComponent(tags)}
            </Panel>
          </Collapse>
        );
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
    </Fragment>
  );
  ContextMenuComponent = () => (
    <ContextMenu className={styles['context-menu']} id="some-unique-identifier">
      <MenuItem onClick={this.showModal}>组合</MenuItem>
      <MenuItem onClick={this.showModal}>合并标签</MenuItem>
      <MenuItem onClick={this.showModal}>重命名</MenuItem>
      {/*<MenuItem onClick={this.showModal}>成为子级</MenuItem>*/}
    </ContextMenu>
  );
  CombineTagsComponent = () => {
    const { selectedTags } = this.state;
    const { tags } = this.props.interview;
    return (
      <Modal
        mask={false}
        closable={false}
        title="请选择合并后的标签名称"
        wrapClassName={styles['combine-modal']}
        onCancel={this.handleCancel}
        visible={this.state.visible}

        //footer={} //TODO:自定义页脚组件与样式
      >
        <div className={styles['tag-container']}>
          {tags.map((tag: TTag) => {
            const { id, text } = tag;
            return (
              <CheckableTag
                key={id + 'tag'}
                //@ts-ignore
                checked={selectedTags.indexOf(id) > -1}
                onChange={(checked) => this.handleChange(id, checked)}
              >
                {text}
              </CheckableTag>
            );
          })}
          <Input className={styles['tag-new-name']} placeholder="新的名称..." />
        </div>
        <div className={styles.warning}>注意：合并标签后将无法撤回，请确认后再操作！</div>
      </Modal>
    );
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { tags, tagGroups } = this.props.interview;
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.content}>
            <div className={styles.tips}>
              点击需要选中操作的一个或多个标签,鼠标右键使用菜单工具进行操作,点击空白处取消选中
            </div>
            <div className={styles.ungroup}> {this.TagsComponent(tags)}</div>
            <div className={styles.group}>{this.TagsGroupComponent(tagGroups)}</div>
            <div>{this.ContextMenuComponent()}</div>
            <div>{this.CombineTagsComponent()}</div>
          </div>
        </div>
      </div>
    );
  }
}
