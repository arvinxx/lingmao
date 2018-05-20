import React, { Component, Fragment } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableBlock from './DraggableBlock';
import { getBlockData, getBlockText, getFilterBlockData } from '../../utils';
import {
  features,
  photo,
  name,
  percent,
  bios,
  basicInfo,
  career,
  keywords,
} from '../../../mock/persona';
import { MiniProgress } from '../Charts';
import { TBlock, TPersonaRecord } from '../../models/persona';

interface IPersonaEditorProps {
  personaData: TPersonaRecord;
  checkedDims: string[];
  dispatch?: Function;
}

@connect()
@(DragDropContext(HTML5Backend) as any)
export default class PersonaEditor extends Component<IPersonaEditorProps> {
  render() {
    const { personaData, dispatch, checkedDims } = this.props;
    const filterData = getFilterBlockData(personaData, checkedDims);
    const blockData = getBlockData(filterData);
    return (
      <Fragment>
        <div className={styles.container}>
          <div className={styles['photo-container']}>
            <img className={styles.photo} src={photo.value} alt={photo.text} />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              <div>
                <span className={styles.name}>{name}</span>
                <span className={styles.career}>{career}</span>
              </div>
              <div className={styles.percent}>
                <div className={styles.text}>
                  <div style={{ width: 80, marginRight: 4 }}>人群占比</div>
                  <div style={{ width: 80 }}>
                    <span className={styles.number}> {percent} </span> %
                  </div>
                </div>
                <MiniProgress
                  percent={percent}
                  color={'l(0) 0:#99f5ff 1:#a6a6ff'}
                  target={100}
                  strokeWidth={12}
                />
              </div>
            </div>
            <div className={styles.keywords}>
              <span style={{ fontSize: 36, marginRight: 24 }}>"</span>
              {keywords}
              <span style={{ fontSize: 36, marginLeft: 24 }}>"</span>
            </div>
            <div className={styles.body}>
              <div className={styles.basic}>
                {basicInfo.length > 0 ? (
                  <div style={{ marginBottom: 24 }}>
                    <div className={styles.info}> 基本信息 </div>
                    {basicInfo.map((item) => (
                      <div key={item.type} style={{ fontSize: 16, marginBottom: 8 }}>
                        <span> {item.text}</span>
                        ： {item.value}
                      </div>
                    ))}
                  </div>
                ) : null}
                {bios !== undefined ? (
                  <div>
                    <div className={styles.info}>个人介绍</div>
                    <div className={styles.bios}>{bios}</div>
                  </div>
                ) : null}
              </div>
              <div className={styles.right}>
                <div className={styles.features}>
                  {features.map((block) => {
                    const { type, values } = block;
                    return (
                      <div key={type} className={styles.feature}>
                        <div className={styles.info}> {getBlockText(block)}</div>
                        <ul className={styles.list}>
                          {values.map((text) => <li key={text}>{text}</li>)}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.behaviors}>
                  {blockData.map((block: TBlock, index) => (
                    <DraggableBlock key={index} dispatch={dispatch} index={index}>
                      <div className={styles.info}>{getBlockText(block)}</div>
                      {block.values.map((value) => (
                        <div>
                          {value.text}
                          <MiniProgress
                            percent={value.value * 10}
                            color={'l(0) 0:#99f5ff 1:#a6a6ff'}
                            target={0}
                            strokeWidth={8}
                          />
                        </div>
                      ))}
                    </DraggableBlock>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
