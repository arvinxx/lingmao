import React, { Component } from 'react';
import { Button, Icon, Upload } from 'antd';

interface IUploadDataProps {
  dispatch: Function;
  analysisStage: number;
}

export default class UploadData extends Component<IUploadDataProps> {
  state = {
    fileList: [],
    uploading: false,
  };
  static defaultProps = {
    analysisStage: 0,
  };
  handleUpload = () => {
    // const { fileList } = this.state;
    // const formData = new FormData();
    // fileList.forEach((file) => {
    //   formData.append('files[]', file);
    // });
    //
    // this.setState({
    //   uploading: true,
    // });
    if (this.props.analysisStage === 0) {
      this.props.dispatch({ type: 'data/addAnalysisStageCount' });
    }
  };

  render() {
    const { uploading } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={false}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}
