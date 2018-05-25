import React, { Component } from 'react';
import { Radio, List, Collapse, Upload, message, Button, InputNumber, Icon } from 'antd';
import { Ellipsis } from '../../../components/index';

import styles from './Upload.less';

const Dragger = Upload.Dragger;
const { Panel } = Collapse;

const params = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:8000/api/upload',
};

const data = [
  'Racing car sprays burning fuel into crowd.',
  '考察重点在你分析问题的全面性，以及说服能力',
  '考察重点在于分析问题本质，抓住问本质的能力',
  '考察重点在于分析问题本质，抓住问题本质的能力',
];

const RadioGroup = Radio.Group;

export default class UploadComp extends Component<any, any> {
  state = {
    value: 1,
  };
  onChange = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  RadioChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <div className={styles.left}>
        <div className={styles.upload}>
          <Dragger {...params}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <div className={styles['text-container']}>
              <p className="ant-upload-text">点击或者拖拽上传</p>
              <p className={styles.hint}>支持：docx、xls、md</p>
            </div>
          </Dragger>

          <div className={styles['button-container']}>
            <Button type="primary" ghost disabled size={'small'} className={styles['button-style']}>
              上传提纲
            </Button>
            <Button type="primary" ghost disabled size={'small'} className={styles['button-style']}>
              上传记录
            </Button>
          </div>
          <div className={styles.preview}>
            <List
              header={<div style={{ textAlign: 'center' }}>前三行预览</div>}
              footer={<div />}
              size="small"
              dataSource={data.slice(0, 3)}
              renderItem={(item) => (
                <div className={styles['pre-contatiainer']}>
                  <div className={styles.circle} />
                  <Ellipsis length={20}>{item}</Ellipsis>
                </div>
              )}
              split={false}
            />
          </div>
          <div className={styles.advanced}>
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Panel className={styles['adv-opts']} header="高级选项" key="1">
                <div className={styles.description}>格式化参数</div>
                <RadioGroup
                  className={styles['radio-group']}
                  onChange={this.RadioChange}
                  value={this.state.value}
                >
                  <Radio className={styles['radio-style']} value={1}>
                    基于换行
                  </Radio>
                  <Radio className={styles['radio-style']} value={2}>
                    基于分号
                  </Radio>
                  <Radio className={styles['radio-style']} value={3}>
                    基于逗号
                  </Radio>
                  <Radio className={styles['radio-style']} value={4}>
                    基于句号
                  </Radio>
                </RadioGroup>

                <div className={styles.delete}>
                  删除前
                  <InputNumber
                    className={styles['delete-number']}
                    min={1}
                    size="small"
                    max={10}
                    defaultValue={3}
                    onChange={(e) => console.log('changed', e)}
                  />
                  条内容
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}
