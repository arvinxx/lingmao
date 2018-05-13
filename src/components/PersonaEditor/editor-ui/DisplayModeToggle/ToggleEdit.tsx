import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { editMode } from 'ory-editor-core/lib/actions/display';
import { isEditMode } from 'ory-editor-core/lib/selector/display';
import { createStructuredSelector } from 'reselect';

const Inner = ({ isEditMode, editMode }: { isEditMode: boolean; editMode: Function }) => (
  <Button type="ghost" shape="circle" onClick={editMode} icon="edit" />
);

const mapStateToProps = createStructuredSelector({ isEditMode });
const mapDispatchToProps = { editMode };

export default connect(mapStateToProps, mapDispatchToProps)(Inner);
