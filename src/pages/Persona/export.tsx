import React, { Component } from 'react';
import { Slider, InputNumber, Row, Col, Radio } from 'antd';
import { connect } from 'dva';
import styles from './export.less';
import personaImg from '../../assets/persona.png';
const RadioGroup = Radio.Group;

@connect()
export default class Export extends Component {
  state = {
    inputValue: 1,
    value: 1,
  };
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  exportOptionChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  exportConfirm = () => {
    console.log('成功导出');
  };
  hideExportModal = () => {
    this.props.dispatch({
      type: 'persona/changeExportVisible',
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <div>导出画像</div>
        <p>预览</p>
        <img className={styles['preview-img']} src={personaImg} alt="用户画像" />
        <div className={styles['option-container']}>
          <Row>
            <Col span={18}>
              <div>样式选择</div>
              <div>
                背景
                <div>颜色</div>
                <div>间距</div>
              </div>
              阴影
              <Row>
                <Col span={12}>
                  大小
                  <Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue} />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={20}
                    style={{ marginLeft: 16 }}
                    value={this.state.inputValue}
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <div>导出选项</div>
              <RadioGroup onChange={this.exportOptionChange} value={this.state.value}>
                <Radio className={styles.radio} value={1}>
                  导出为 JPG
                </Radio>
                <Radio className={styles.radio} value={2}>
                  导出为 PNG
                </Radio>
                <Radio className={styles.radio} value={3}>
                  导出为 PDF
                </Radio>
              </RadioGroup>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
