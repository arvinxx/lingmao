import React, { Component } from 'react';
import { Button, Icon, Upload } from 'antd';
import { xlsxToJson } from '../../utils';

import styles from './Upload.less';

interface IUploadDataProps {
  dispatch: Function;
  analysisStage: number;
}
interface IUploadDataStates {
  fileList: Array<object>;
  uploading: boolean;
}

export default class UploadData extends Component<IUploadDataProps, IUploadDataStates> {
  state = {
    fileList: [],
    uploading: false,
  };
  static defaultProps = {
    analysisStage: 0,
  };
  readFile = (file: File) => {
    // console.log(file);
    const data = xlsxToJson(file);
    console.log(data);
    this.setState(({ fileList }) => ({
      fileList: [...fileList, file],
    }));
    return false;
  };
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
    // if (this.props.analysisStage === 0) {
    //   this.props.dispatch({ type: 'data/addAnalysisStageCount' });
    //   this.props.dispatch({ type: 'data/addActivePanelList', payload: '1' });
    //   this.props.dispatch({ type: 'data/removeActivePanelList', payload: '0' });
    // }
  };
  removeFiles = (file) => {
    this.setState(({ fileList }) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  };
  render() {
    const { uploading, fileList } = this.state;

    return (
      <div className={styles.button}>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          onRemove={this.removeFiles}
          fileList={fileList}
          beforeUpload={this.readFile}
        >
          <Button>
            <Icon type="upload" /> 选择文件
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? '导入中' : '导入'}
        </Button>
      </div>
    );
  }
}
