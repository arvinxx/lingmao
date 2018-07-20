import React, { Component } from 'react';
import { Button, Icon, Upload } from 'antd';
import { readAsArrayBufferAsync, xlsxToJson } from '@/utils';

import styles from './Upload.less';
import { DispatchProp } from 'react-redux';

export interface IUploadDataProps {
  analysisStage: number;
}
interface IUploadDataStates {
  fileList: object[];
  uploading: boolean;
  rawData: object[];
}

export default class UploadData extends Component<
  IUploadDataProps & DispatchProp,
  IUploadDataStates
> {
  state = {
    fileList: [],
    uploading: false,
    rawData: [],
  };
  static defaultProps: IUploadDataProps = {
    analysisStage: 0,
  };
  readFile = async (file: File) => {
    const fileBuffer = await readAsArrayBufferAsync(file);
    const data = xlsxToJson(fileBuffer);
    this.setState(({ fileList }) => ({
      fileList: [...fileList, file],
      rawData: data,
    }));
    return true;
  };
  uploadFile = () => {
    const { rawData } = this.state;
    this.setState({
      uploading: true,
    });
    this.props.dispatch({
      type: 'data/handleQuesData',
      payload: rawData,
    });

    if (this.props.analysisStage === 0) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '1' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '0' });
    }
  };
  //TODO: 处理上传数据后的显示状态
  handleUpload = (status) => {
    console.log(status);
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
          action="/api/raw-table-data/"
          onRemove={this.removeFiles}
          onChange={this.handleUpload}
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
          onClick={this.uploadFile}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? '导入中' : '导入'}
        </Button>
      </div>
    );
  }
}
