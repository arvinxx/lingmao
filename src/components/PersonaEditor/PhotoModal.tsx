import React, { Component } from 'react';
import { Upload, Modal, Icon, message } from 'antd';
const Dragger = Upload.Dragger;
import styles from './PhotoModal.less';
import { photo } from '../../../mock/persona';
const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
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
  },
};

interface IPhotoModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
}

export default class PhotoModal extends Component<IPhotoModalProps> {
  static defaultProps: IPhotoModalProps = {
    modalVisible: false,
    setModalVisible: () => {},
  };

  render() {
    const { modalVisible, setModalVisible } = this.props;
    return (
      <Modal
        title="编辑图片"
        wrapClassName={styles.wrapper}
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <div className={styles.container}>
          <div className={styles.left}>
            <div>从图片库上传</div>
            <div>
              从本地上传
              <Dragger className={styles.upload} {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">拖拽文件或选择图片上传</p>
              </Dragger>
            </div>
          </div>
          <div className={styles.right}>
            预览
            <img src={photo.value} className={styles.photo}/>
          </div>
        </div>
      </Modal>
    );
  }
}
