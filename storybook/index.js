import React from 'react';
import { storiesOf, addDecorator, setAddon } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Button } from 'antd';
import { checkA11y } from '@storybook/addon-a11y';
import { host } from 'storybook-host';
// import centered from '@storybook/addon-centered';
import JSXAddon from 'storybook-addon-jsx';

// import withTests from './config/withTests';
import { ListInput } from '../src/components';

setAddon(JSXAddon);

// addDecorator(centered);
addDecorator(checkA11y);
addDecorator(
  host({
    title: '组件开发中心',
    align: 'center middle',
    height: '100%',
    width: '80vw',
    background: 'white',
    backdrop: '#fafafa',
    border: '#f9f9f9 1px dashed',
  })
);

storiesOf('Button', module).addWithJSX('with text', () => (
  <Button className="sssss">Hello Button</Button>
));
storiesOf('test 2', module).addWithJSX('Paris', () => <div color="#333">test</div>);

storiesOf('Component', module).addWithJSX(
  'ListInput',
  withInfo(`
      访谈中的TreeList 列表
    
      ~~~js
      <Button>Click Here</Button>
      ~~~
    
    `)(() => <ListInput />)
);
