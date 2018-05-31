import React, { Component } from 'react';
import { Collapse, Tag, Modal, Input } from 'antd';
import { connect } from 'dva';
import { TagGroup, ContextRightMenu } from '../../components';

import { IInterview } from '../../models/interview';
import { TTag } from '../../models/tag';
import { extractTags } from '../../utils';

import styles from './tag.less';
import { queryDocument, saveTagGroups, getCleanTagGroups } from '../../services';
import { DispatchProp } from 'react-redux';

const CheckableTag = Tag.CheckableTag;

interface ITagsProps {
  interview: IInterview;
  loading: boolean;
  tag: any;
}

@connect(({ interview, tag, loading }) => ({
  interview,
  tag,
  loading: loading.models.tag,
}))
export default class Tags extends Component<ITagsProps & DispatchProp> {
  state = {
    visible: false,
    tagGroupText: '',
    tagGroupPlaceHolder: '新的标签组',
  };
  async componentDidMount() {
    let documents = await queryDocument();
    documents = Array.isArray(documents) ? documents : [];
    if (documents.length > 0) {
      this.props.dispatch({
        type: 'tag/querryTagGroups',
        payload: getCleanTagGroups(documents[0]),
      });
    }
  }

  componentWillUnmount() {
    const { id } = this.props.interview;
    const { tagGroups } = this.props.tag;
    saveTagGroups({ id, tagGroups });
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

  childTag = () => {
    console.log('成为子级');
  };

  render() {
    const { dispatch, tag } = this.props;
    const { tagGroups, selectedTags } = tag;
    const tags = extractTags(tagGroups);
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.content}>
            <div className={styles.tips}>
              点击需要选中操作的一个或多个标签,鼠标右键使用菜单工具进行操作,点击空白处取消选中
            </div>
            <TagGroup tagGroups={tagGroups} selectedTags={selectedTags} dispatch={dispatch} />
            <ContextRightMenu />
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
                      // onChange={(checked) => this.handleChange(id, checked)}
                    >
                      {text}
                    </CheckableTag>
                  );
                })}
                <Input className={styles['tag-new-name']} placeholder="新的名称..." />
              </div>
              <div className={styles.warning}>注意：合并标签后将无法撤回，请确认后再操作！</div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
