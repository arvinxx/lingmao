import React, { Component, Fragment } from 'react';
import { Input } from 'antd';
import { DispatchProp } from 'react-redux';
import { connect } from 'dva';

import { females, males } from '@/assets/photos';
import styles from './index.less';

import ContentBlock from './ContentBlock';
import PhotoModal from './PhotoModal';

import { IBasicInfo, TDimGroups } from '@/models/persona';

/**
 * PersonaEditor 说明
 * @interface persona 画布中展示的画像数量
 * @interface displayDimGroups 展示在画布上的 dimGroups,经过勾选过滤
 * @interface dimGroups 维度群组
 * @interface personaIndex 展示画像的位次
 * @interface showText 是否显示文字
 */
interface IPersonaEditorProps {
  persona: IBasicInfo;
  dimGroups: TDimGroups;
  displayDimGroups: TDimGroups;
  personaIndex: number;
  showText: boolean;
}
class PersonaEditor extends Component<IPersonaEditorProps & DispatchProp> {
  state = {
    modalVisible: false,
    imgIndex: Math.floor(Math.random() * 4),
  };
  changePhoto = (length) => {
    const { imgIndex } = this.state;
    let nextImgIndex = Math.floor(Math.random() * length);
    while (nextImgIndex === imgIndex) {
      nextImgIndex = Math.floor(Math.random() * length);
    }
    this.setState({ imgIndex: nextImgIndex });
  };
  customPhoto = () => {
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
  changePercent = (e, index) => {
    console.log(index, e.target.value);
    let value = 0;
    if (e.target.value !== '') value = parseInt(e.target.value);
    this.props.dispatch({
      type: 'persona/handlePercent',
      payload: { text: value, index },
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
  changeItemText = (e, index, dimIndex, itemIndex) => {
    this.props.dispatch({
      type: 'persona/handleDimText',
      payload: { text: e.target.value, index, dimIndex, itemIndex },
    });
  };

  render() {
    const { persona, dimGroups, displayDimGroups, personaIndex, showText, dispatch } = this.props;
    const { modalVisible, imgIndex } = this.state;
    const { keywords, name, photo, bios, career, percent } = persona;

    // 根据性别判断采用男性图片或女性图片
    // let gender = clusterResult[index].records.find((item) => item.labelText === '性别').answer.text || '男';
    let gender = '男';
    let img = photo.value;
    const res = gender.match(/[男女]/);
    gender = res.length !== 0 ? res[0] : '';
    switch (gender) {
      case '男':
        img = males;
        break;
      case '女':
        img = females;
        break;
    }
    return (
      <Fragment>
        <div className={styles.container}>
          <div className={styles['photo-combine']}>
            <div className={styles['photo-container']}>
              <img className={styles.photo} src={img[imgIndex]} alt="用户画像" />
              <Input
                style={{ width: name.length > 0 ? name.length * 96 : 108 }}
                onChange={(e) => this.changeName(e, personaIndex)}
                value={name}
                className={styles.name}
                placeholder="姓名"
              />
              <div className={styles.keywords}>
                <span style={{ fontSize: 36, marginRight: 24, color: 'white' }}>"</span>
                <Input
                  className={styles.mantra}
                  onChange={(e) => this.changeKeywords(e, personaIndex)}
                  value={keywords}
                  placeholder="请输入口头禅"
                />
                <span style={{ fontSize: 36, marginLeft: 24, color: 'white' }}>"</span>
              </div>
            </div>
            <div className={styles['toolbar-container']}>
              <div className={styles.toolbar}>
                <div className={styles.tool} onClick={() => this.changePhoto(img.length)}>
                  切换图片
                </div>
                <div className={styles.tool} onClick={this.customPhoto}>
                  自定义图片
                </div>
              </div>
            </div>
          </div>
          <ContentBlock
            dispatch={dispatch}
            bios={bios}
            career={career}
            percent={percent}
            dimGroups={dimGroups}
            displayDimGroups={displayDimGroups}
            showText={showText}
            personaIndex={personaIndex}
          />
        </div>
        <PhotoModal modalVisible={modalVisible} setModalVisible={this.setModalVisible} />
      </Fragment>
    );
  }
}

export default connect()(PersonaEditor);
