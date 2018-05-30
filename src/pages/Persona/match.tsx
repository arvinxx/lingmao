import React, { Component, Fragment } from 'react';
import styles from './match.less';
import { Icon } from 'antd';
import { DraggableTag, DraggableList } from './components';

import { connect } from 'dva';
import { TQuesData } from '../../models/data';
import { TPersonaData } from '../../models/persona';
import { personaQuesData } from '../../../mock/data';
import { TTag } from '../../models/tag';
import { extractTags, getFilterPersonaQuesData, getFilterQuesData } from '../../utils';
import { DispatchProp } from 'react-redux';
import { extractDims, generateTagId } from '../../utils/persona';

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
export default class Match extends Component<IMatchProps & DispatchProp> {
  static defaultProps: IMatchProps = {
    personaQuesData: [],
    personaData: [],
    tags: [],
  };
  componentDidMount() {
    // 根据 personaQuesData 初始化 personaData 数据
    const { personaData, dispatch, personaQuesData } = this.props;
    if (personaQuesData.length !== 0 && personaQuesData.length !== personaData.length) {
      dispatch({
        type: 'persona/initPersonaData',
        payload: personaQuesData,
      });
    }
  }

  render() {
    const { personaData, dispatch, personaQuesData } = this.props;
    // 从 personaData 中抽取 id
    if (personaData.length === 0 || personaQuesData.length === 0) {
      return <div>noData</div>;
    }
    const selectDims = extractDims(personaData[0].dimGroups);
    const filterPersonaQuesData = getFilterPersonaQuesData(personaQuesData, selectDims);
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sources}>
            <Fragment>
              <div className={styles.info}>
                <Icon type="info-circle-o" style={{ marginRight: 8 }} />
                <div>
                  拖拽需要的维度到分类区 <br /> 双击卡片取消分类
                </div>
              </div>

              <div className={styles['list-container']}>
                <div className={styles.title}> 问卷数据 </div>
                <div className={styles.list}>
                  {filterPersonaQuesData[0].map((record, index) => {
                    const { question, key, tagId, tagText } = record;
                    return (
                      <DraggableTag
                        dispatch={dispatch}
                        key={key}
                        index={index}
                        groupId={'ques'}
                        id={generateTagId(tagId, question)}
                      >
                        <div className={styles.tag}>{tagText === '' ? question : tagText}</div>
                      </DraggableTag>
                    );
                  })}
                </div>
              </div>
            </Fragment>
          </div>
          <div className={styles.scroll}>
            <div className={styles['board-container']}>
              {personaData[0].dimGroups.map((d, index) => (
                <DraggableList
                  personaQuesData={filterPersonaQuesData}
                  key={d.key}
                  dimGroup={d}
                  index={index}
                  dispatch={dispatch}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
