import React from 'react';
import { shallow } from 'enzyme';
import App, { IEditorProps } from './InputTooltip';

const rawData = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
};
const props: IEditorProps = {
  rawData,
  dispatch: jest.fn(),
  id: '1',
  tags:[],
  text:'5',
  recordFocusId: '4',
};
it('Render correct when receive props', () => {
  const wrapper = shallow(<App {...props} />);
  expect(wrapper.find('.input').length).toEqual(1);
});
