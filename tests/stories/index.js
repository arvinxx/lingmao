import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from 'antd';

storiesOf('Login', module).add('with text', () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
)).add('with some emoji', () => (
  <Button onClick={action('clicked')}>123123</Button>
));
