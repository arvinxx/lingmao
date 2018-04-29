import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;
import styles from './styles.less';

class index extends Component {
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    const props = {
      name: 'file',
      multiple: true,
      action: '//jsonplaceholder.typicode.com/posts/',
    };

    return (
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <div className={styles['text-container']}>
          <p className="ant-upload-text">点击或者拖拽上传</p>
          <p className={styles.hint}>支持：docx、xls、md</p>
        </div>
      </Dragger>
    );
  }
}

export default index;
