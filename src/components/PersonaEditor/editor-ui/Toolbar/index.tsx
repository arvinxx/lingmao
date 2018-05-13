import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isInsertMode } from 'ory-editor-core/lib/selector/display';
import { createStructuredSelector } from 'reselect';
import { Editor } from 'ory-editor-core/lib';
import { List } from 'antd';
import { LayoutPlugin, ContentPlugin } from 'ory-editor-core/lib/service/plugin/classes';
import Item from './Item/index';
import Provider from '../Provider/index';

type Props = {
  isInsertMode: boolean;
  editor: Editor;
};

class Raw extends Component<any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { isInsertMode, editor: { plugins } } = this.props;
    const content = plugins.plugins.content;

    return (
      <div style={isInsertMode ? { visibility: 'visible' } : { visibility: 'hidden' }}>
        <List
          dataSource={content}
          renderItem={(plugin: ContentPlugin, k: Number) => {
            const initialState = plugin.createInitialState();
            return (
              <Item plugin={plugin} key={k} insert={{ content: { plugin, state: initialState } }} />
            );
          }}
        />

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({ isInsertMode });

const Decorated = connect(mapStateToProps)(Raw);

const Toolbar = (props: any) => (
  <Provider {...props}>
    <Decorated {...props} />
  </Provider>
);

export default Toolbar;
