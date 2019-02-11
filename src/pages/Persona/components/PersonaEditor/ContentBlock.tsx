import React, { Component } from 'react';
import styles from './ContentBlock.less';
import { Input } from 'antd';

import { MiniProgress } from '@/components';
import DraggableBlock from './DraggableBlock';
import { DispatchProp } from 'react-redux';
import { TDimGroups } from '@/models/persona';

const { TextArea } = Input;
interface IContentBlockProps {
  bios: string;
  career: string;
  percent: number;
  dimGroups: TDimGroups;
  displayDimGroups: TDimGroups;
  showText: boolean;
  personaIndex: number;
}
export default class ContentBlock extends Component<IContentBlockProps & DispatchProp> {
  static defaultProps: IContentBlockProps = {
    percent: 0,
    bios: '',
    dimGroups: [],
    displayDimGroups: [],
    personaIndex: 0,
    showText: true,
    career: '',
  };
  changePercent = (e, index) => {
    let text = 0;
    if (e.target.value !== '') text = parseInt(e.target.value);
    this.props.dispatch({
      type: 'persona/handlePercent',
      payload: { text, index },
    });
  };
  changeItemText = (e, index, dimIndex, itemIndex) => {
    this.props.dispatch({
      type: 'persona/handleDimText',
      payload: { text: e.target.value, index, dimIndex, itemIndex },
    });
  };
  changeBios = (e, index) => {
    this.props.dispatch({
      type: 'persona/handleBios',
      payload: { text: e.target.value, index },
    });
  };
  render() {
    const { percent, showText, displayDimGroups, dimGroups, personaIndex, bios } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <div
            style={{
              display: 'flex',
              alignItems: 'start',
            }}
          >
            {/*<Input*/}
            {/*style={{ width: career.length > 0 ? career.length * 16 : 72 }}*/}
            {/*onChange={(e) => this.changeCareer(e, index)}*/}
            {/*value={career}*/}
            {/*className={styles.career}*/}
            {/*placeholder="职业"*/}
            {/*/>*/}
          </div>
          <div className={styles.percent}>
            <div className={styles.text}>
              <div style={{ width: 64, marginRight: 4 }}>人群占比</div>
              <div style={{ width: 48 }} className={styles.number}>
                <Input
                  onChange={(e) => this.changePercent(e, personaIndex)}
                  value={percent.toFixed(0)}
                  placeholder="比例"
                />
                %
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
        <div className={styles.content}>
          {displayDimGroups.map((displayDimGroup, index) => (
            <DraggableBlock
              key={index}
              displayDimGroups={displayDimGroups}
              dimGroups={dimGroups}
              personaIndex={personaIndex}
              index={index}
              text={displayDimGroup.text}
            >
              {displayDimGroup.dims.map(
                (dim, itemIndex) =>
                  showText ? (
                    <div key={dim.labelKey} className={styles['dim-item']}>
                      {displayDimGroups[index].text === '基本信息' ? (
                        <span> {dim.labelText}: </span>
                      ) : null}
                      <Input
                        style={{ width: dim.text.length * 17 }}
                        onChange={(e) => this.changeItemText(e, personaIndex, index, itemIndex)}
                        className={styles['item-text']}
                        value={dim.text}
                      />
                    </div>
                  ) : (
                    <div key={dim.labelKey}>
                      {dim.labelText}
                      <MiniProgress
                        percent={dim.value * 10}
                        color={'l(0) 0:#99f5ff 1:#a6a6ff'}
                        target={0}
                        strokeWidth={8}
                      />
                    </div>
                  )
              )}
            </DraggableBlock>
          ))}
        </div>
        {bios === undefined ? null : (
          <div className={styles.bios}>
            <TextArea
              autosize
              onChange={(e) => this.changeBios(e, personaIndex)}
              placeholder="请在此输入画像的个人介绍"
              value={bios}
            />
          </div>
        )}
      </div>
    );
  }
}
