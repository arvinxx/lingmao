import React, { Component, Fragment } from 'react';
import { Collapse, Input } from 'antd';
import { connect } from 'dva';

import Tags from './tags';
import { generateId } from '../../utils';
import styles from './index.less';

const Panel = Collapse.Panel;
@connect()
export default class Index extends Component<any> {
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

  render() {
    const { tagGroups, selectedTags } = this.props;
    if (tagGroups[0] === undefined) tagGroups[0] = { text: 'ungroup', id: generateId(), tags: [] };
    const ungroupTags = tagGroups[0].tags;
    return (
      <Fragment>
        <div className={styles.ungroup}>
          <Tags tags={ungroupTags} selectedTags={selectedTags} />
        </div>
        <div className={styles.group}>
          {tagGroups.map((tagGroup, index) => {
            const { text, id, tags } = tagGroup;
            if (index !== 0) {
              return (
                <Collapse key={id + 'colap'} bordered={false}>
                  <Panel
                    key={id + 'Groups'}
                    //@ts-ignore
                    header={
                      <Input
                        key={id + 'groups+input'}
                        value={text}
                        onChange={(e) => this.changeTagGroupText(e, id)}
                      />
                    }
                  >
                    <Tags tags={tags}  selectedTags={selectedTags}/>
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
