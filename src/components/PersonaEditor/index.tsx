import React, { Component, Fragment } from 'react';
import { TTag } from '../../models/tag';
import styles from './index.less';

import Editor, { Editable, createEmptyState } from 'ory-editor-core';
import 'ory-editor-core/lib/index.css';

import { DisplayModeToggle, Toolbar } from './editor-ui';

import 'components/PersonaEditor/editor-ui/index.less';
import spacer from 'ory-editor-plugins-spacer';
import 'ory-editor-plugins-spacer/lib/index.css';
import slate from 'ory-editor-plugins-slate';
import 'ory-editor-plugins-slate/lib/index.css';
import image from 'ory-editor-plugins-image';
import 'ory-editor-plugins-image/lib/index.css';

const plugins = {
  content: [slate(), image, spacer],
};

require('react-tap-event-plugin')();

// Creates an empty editable
const content = createEmptyState();
// Instantiate the editor
const editor = new Editor({
  plugins,
  defaultPlugin: image,
  editables: [content],
});

interface IPersonaEditorProps {
  tagArr: Array<TTag>;
}
export default class PersonaEditor extends Component<IPersonaEditorProps> {
  render() {
    const { tagArr } = this.props;
    return (
      <Fragment>
        <div className={styles.container}>
          {tagArr.map((tag: TTag) => <div>{tag.text}</div>)}
          <Editable editor={editor} id={content.id} />
          <DisplayModeToggle editor={editor} />
        </div>
        <Toolbar editor={editor} />
      </Fragment>
    );
  }
}
