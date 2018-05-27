import React, { Component, Fragment } from 'react';
import { Input } from 'antd';
import { DispatchProp } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styles from './index.less';
import DraggableBlock from './DraggableBlock';
import PhotoModal from './PhotoModal';
import { MiniProgress } from '../Charts';

import { name as fakeName, percent, basicInfo, career } from '../../../mock/persona';
import { TBasicInfo, TPersona, TPersonaDimGroups } from '../../models/persona';

const { TextArea } = Input;

interface IPersonaEditorProps {
  persona: TBasicInfo;
  personaDimGroups: TPersonaDimGroups;
  index: number;
  showText: boolean;
}

@(DragDropContext(HTML5Backend) as any)
export default class PersonaEditor extends Component<IPersonaEditorProps & DispatchProp> {
  state = {
    modalVisible: false,
  };
  changePhoto = () => {
    this.setState({ modalVisible: true });
  };
  setModalVisible = (modalVisible) => {
    this.setState({ modalVisible: modalVisible });
  };
  changeBios = (e, index) => {
    this.props.dispatch({
      type: 'persona/handleBios',
      payload: { text: e.target.value, index },
    });
  };
  changeCareer = (e, index) => {
    this.props.dispatch({
      type: 'persona/handleCareer',
      payload: { text: e.target.value, index },
    });
  };
  changeName = (e, index) => {
    this.props.dispatch({
      type: 'persona/handleName',
      payload: { text: e.target.value, index },
    });
  };
  changeKeywords = (e, index) => {
    this.props.dispatch({
      type: 'persona/handleKeywords',
      payload: { text: e.target.value, index },
    });
  };

  render() {
    const { dispatch, persona, personaDimGroups, index, showText } = this.props;
    const { modalVisible } = this.state;
    const { keywords, name, photo, bios, career } = persona;
    return (
      <Fragment>
        <div className={styles.container}>
          <div className={styles['photo-container']} onClick={this.changePhoto}>
            <img className={styles.photo} src={photo.value} alt={photo.text} />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'end',
                }}
              >
                <Input
                  style={{ width: name.length * 36 }}
                  onChange={(e) => this.changeName(e, index)}
                  value={name}
                  className={styles.name}
                />
                <Input
                  style={{ width: career.length * 16 }}
                  onChange={(e) => this.changeCareer(e, index)}
                  value={career}
                  className={styles.career}
                />
              </div>
              <div className={styles.percent}>
                <div className={styles.text}>
                  <div style={{ width: 64, marginRight: 4 }}>人群占比</div>
                  <div style={{ width: 64 }}>
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
              <Input
                style={{ maxWidth: keywords.length * 20 }}
                onChange={(e) => this.changeKeywords(e, index)}
                value={keywords}
                placeholder="请输入口头禅"
              />
              <span style={{ fontSize: 36, marginLeft: 24 }}>"</span>
            </div>
            <div className={styles.body}>
              <div className={styles.basic}>
                {basicInfo.length > 0 ? (
                  <div style={{ marginBottom: 24 }}>
                    <div className={styles.info}> 基本信息 </div>
                    {basicInfo.map((item) => (
                      <div key={item.type} style={{ fontSize: 14, marginBottom: 8 }}>
                        <span> {item.text}</span>
                        ： {item.value}
                      </div>
                    ))}
                  </div>
                ) : null}
                {bios !== undefined ? (
                  <div>
                    <div className={styles.info}>个人介绍</div>
                    <TextArea
                      autosize
                      className={styles.bios}
                      onChange={(e) => this.changeBios(e, index)}
                      placeholder="请输入个人介绍"
                      value={bios}
                    />
                  </div>
                ) : null}
              </div>
              <div className={styles.right}>
                {personaDimGroups.map((dimGroup, index) => (
                  <DraggableBlock key={index} dispatch={dispatch} index={index}>
                    <div key={index} className={styles.behaviors}>
                      <div className={styles.info}>{dimGroup.text}</div>
                      {dimGroup.dims.map(
                        (dim) =>
                          showText ? (
                            <li key={dim.tagId}>{dim.text}</li>
                          ) : (
                            <div key={dim.tagId}>
                              {dim.tagText}
                              <MiniProgress
                                percent={dim.value * 10}
                                color={'l(0) 0:#99f5ff 1:#a6a6ff'}
                                target={0}
                                strokeWidth={8}
                              />
                            </div>
                          )
                      )}
                    </div>
                  </DraggableBlock>
                ))}
              </div>
            </div>
          </div>
        </div>
        <PhotoModal modalVisible={modalVisible} setModalVisible={this.setModalVisible} />
      </Fragment>
    );
  }
}
