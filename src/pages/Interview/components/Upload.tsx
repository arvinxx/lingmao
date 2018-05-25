import React, { Component } from 'react';
import { Radio, List, Collapse, Upload, message, Button, InputNumber, Icon } from 'antd';
import { Ellipsis } from '../../../components/index';
import { extractPlainText } from '../../../services';

import styles from './Upload.less';
import { readAsTextAsync } from '../../../utils';

const Dragger = Upload.Dragger;
const { Panel } = Collapse;

const params = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:8000/api/upload',
};

const data = ['暂未上传文档...'];

const RadioGroup = Radio.Group;
interface IUploadCompState {
  preview: string[];
  options: number;
}
export default class UploadComp extends Component<any, IUploadCompState> {
  state: IUploadCompState = {
    preview: data,
    options: 1,
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
  FormatOpts = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      options: e.target.value,
    });
  };
  handleBeforeUpload = async (file) => {
    const text = await readAsTextAsync(file);

    const filterText = await extractPlainText(text, this.state.options);
    console.log(filterText);
    this.setState({ preview: filterText });
    return true;
  };

  render() {
    const { preview } = this.state;
    return (
      <div className={styles.left}>
        <div className={styles.upload}>
          <Dragger {...params} beforeUpload={this.handleBeforeUpload}>
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
              dataSource={preview.slice(0, 3)}
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
                  onChange={this.FormatOpts}
                  value={this.state.options}
                >
                  <Radio className={styles['radio-style']} value={1}>
                    基于换行
                  </Radio>
                  <Radio className={styles['radio-style']} value={2}>
                    基于句号
                  </Radio>
                  <Radio className={styles['radio-style']} value={3}>
                    基于逗号
                  </Radio>
                </RadioGroup>

                <div className={styles.delete}>
                  删除前
                  <InputNumber
                    className={styles['delete-number']}
                    min={1}
                    size="small"
                    max={10}
                    defaultValue={0}
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
