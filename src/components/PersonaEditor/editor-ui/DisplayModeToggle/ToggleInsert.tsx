import React from 'react';
import { Button } from 'antd';

import { connect } from 'react-redux';

import { insertMode } from 'ory-editor-core/lib/actions/display';
import { isInsertMode } from 'ory-editor-core/lib/selector/display';
import { createStructuredSelector } from 'reselect';

const Inner = ({ isInsertMode, insertMode }: { isInsertMode: boolean; insertMode: Function }) => (
  <Button icon="plus" type="ghost" shape="circle" onClick={insertMode} />
);

const mapStateToProps = createStructuredSelector({ isInsertMode });
const mapDispatchToProps = { insertMode };

export default connect(mapStateToProps, mapDispatchToProps)(Inner);
