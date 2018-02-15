import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'antd';

storiesOf('Button', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => <Button>Button2</Button>);

// TODO 将源文件中的组件导出的
