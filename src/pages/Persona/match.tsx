import React, { Component, Fragment } from 'react';
import styles from './match.less';
import { Icon } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { DraggableTag } from './components';

import { connect } from 'dva';
import { TQuesData } from '../../models/data';
import { TPersonaData } from '../../models/persona';
import { personaQuesData } from '../../../mock/data';
import { TTag, TTagGroup } from '../../models/tag';
import { extractTags } from '../../utils';
import { DispatchProp } from 'react-redux';

interface IMatchProps {
  personaQuesData: TQuesData;
  personaData: TPersonaData;
  tags: TTag[];
}

@connect(({ data, persona, tag }) => ({
  personaQuesData: data.personaQuesData,
  personaData: persona.personaData,
  tags: extractTags(tag.tagGroups),
}))
@(DragDropContext(HTML5Backend) as any)
export default class Match extends Component<IMatchProps & DispatchProp> {
  static defaultProps: IMatchProps = {
    personaQuesData: [],
    personaData: [],
    tags: [],
  };

  render() {
    // const { personaQuesData, personaData } = this.props;
    const { personaData, dispatch } = this.props;
    // console.log(personaQuesData);
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sources}>
            {personaQuesData.length === 0 ? (
              <div>no data</div>
            ) : (
              <Fragment>
                <div className={styles.info}>
                  <Icon type="info-circle-o" style={{ marginRight: 8 }} />通过拖拽将需要的维度加入到右侧
                </div>

                <div className={styles['list-container']}>
                  <div className={styles.title}> 问卷数据 </div>
                  <div className={styles.list}>
                    {personaQuesData[0].map((record, index) => {
                      const { question, key, tagId } = record;
                      return (
                        <DraggableTag dispatch={dispatch} key={key} index={index} id={tagId}>
                          <div className={styles.tag}>{question}</div>
                        </DraggableTag>
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            )}
          </div>
          <div className={styles.scroll}>
            <div className={styles['board-container']}>
              {personaData[0].dimGroups.map((d, index) => (
                <div className={styles.board} key={d.key}>
                  <div className={styles.dims}>{d.text}</div>
                  <div className={styles['tag-container']}>
                    {d.dims.map((dim, index) => (
                      <DraggableTag
                        key={dim.tagId}
                        index={index}
                        dispatch={dispatch}
                        id={dim.tagId}
                      >
                        <div className={styles.tag}>{dim.tagText}</div>
                      </DraggableTag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
