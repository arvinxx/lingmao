import React from 'react';
import { connect } from 'react-redux';
import { previewMode } from 'ory-editor-core/lib/actions/display';
import { isPreviewMode } from 'ory-editor-core/lib/selector/display';
import { createStructuredSelector } from 'reselect';

import { Button } from 'antd';

const Inner = ({
  isPreviewMode,
  previewMode,
}: {
  isPreviewMode: boolean;
  previewMode: Function;
}) => <Button icon="ssss" active={isPreviewMode} onClick={previewMode} />;

const mapStateToProps = createStructuredSelector({ isPreviewMode });
const mapDispatchToProps = { previewMode };

export default connect(mapStateToProps, mapDispatchToProps)(Inner);
