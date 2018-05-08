import React, { Component, ReactNode } from 'react';
import styles from './tag.less';
import { Collapse, Tag, Modal, Input } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

const Panel = Collapse.Panel;
const CheckableTag = Tag.CheckableTag;
const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const tags = ['nian dasd ', 2, 3, 4, 5, 6];
const tags2 = [9, 32, 1453];
const tags4 = [3125, 54367];
export default class Index extends Component {
  state = {
    visible: false,
    selectedTags: [],
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleClick = (e) => {
  };
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  groupTags = () => {
    console.log('组合标签');
  };
  childTag = () => {
    console.log('成为子级');
  };
  TagsComponent = (tags: any[]): ReactNode => {
    const { selectedTags } = this.state;
    return (
      <div className={styles['tag-container']}>
        {tags.map((tag: string) => (
          <ContextMenuTrigger id="some-unique-identifier" key={tag + 'trigger'}>
            <CheckableTag
              key={tag + 'tag'}
              //@ts-ignore
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => this.handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          </ContextMenuTrigger>
        ))}
      </div>
    );
  };
  TagsGroupComponent = () => (
    <Collapse bordered={false}>
      <Panel key="1" header="This is header 1">
        {this.TagsComponent(tags2)}
      </Panel>
    </Collapse>
  );
  ContextMenuComponent = () => (
    <ContextMenu className={styles['context-menu']} id="some-unique-identifier">
      <MenuItem onClick={this.showModal}>组合</MenuItem>
      <MenuItem onClick={this.showModal}>合并标签</MenuItem>
      <MenuItem onClick={this.showModal}>成为子级</MenuItem>
    </ContextMenu>
  );
  CombineTagsComponent = () => {
    const { selectedTags } = this.state;
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
          {tags4.map((tag) => (
            <CheckableTag
              //@ts-ignore
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => this.handleChange(tag, checked)}
              key={tag + 'tag'}
            >
              {tag}
            </CheckableTag>
          ))}
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
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.content}>
            <div className={styles.tips}>
              点击需要选中操作的一个或多个标签,鼠标右键使用菜单工具进行操作,点击空白处取消选中
            </div>
            <div className={styles.ungroup}> {this.TagsComponent(tags)}</div>
            <div className={styles.group}>{this.TagsGroupComponent()}</div>
            <div>{this.ContextMenuComponent()}</div>
            <div>{this.CombineTagsComponent()}</div>
          </div>
        </div>
      </div>
    );
  }
}
