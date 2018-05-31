import model from '../../src/models/persona';
import { basicInfo, dimGroups } from '../../src/common/persona';

const reducers = model.reducers;

describe('Persona Model', () => {
  it('loads', () => {
    expect(model);
  });
  it('namespace is persona', () => {
    expect(model.namespace).toEqual('persona');
  });
});

describe('Reducers', () => {
  it('changeDimVisible', () => {
    const reducer = reducers.changeDimVisible;
    const state = {
      dimVisible: true,
    };

    const action = {
      type: 'persona/changeDimVisible',
    };

    expect(reducer(state, action)).toEqual({
      dimVisible: false,
    });
  });
  it('changeExportVisible', () => {
    const reducer = reducers.changeExportVisible;
    const state = {
      exportVisible: true,
    };

    const action = {
      type: 'persona/changeExportVisible',
    };

    expect(reducer(state, action)).toEqual({
      exportVisible: false,
    });
  });
  it('changeExpandedDims', () => {
    const reducer = reducers.changeExpandedDims;
    const state = {
      expandedDims: [],
    };

    const action = {
      type: 'persona/changeExpandedDims',
      payload: ['1', '3'],
    };

    expect(reducer(state, action)).toEqual({
      expandedDims: ['1', '3'],
    });
  });
  it('changeCheckedDims', () => {
    const reducer = reducers.changeCheckedDims;
    const state = {
      personaData: [
        {},
        {
          checkedDims: [],
        },
      ],
    };

    const action = {
      type: 'persona/changeCheckedDims',
      payload: { checkedDims: ['1', '3'], index: 1 },
    };

    expect(reducer(state, action)).toEqual({
      personaData: [{}, { checkedDims: ['1', '3'] }],
    });
  });
  it('handleDragDisplayDim', () => {
    const reducer = reducers.handleDragDisplayDim;
    const state = {
      personaDisplayDimGroups: ['1', '2'],
    };

    const action = {
      type: 'persona/handleDragDisplayDim',
      payload: { dragIndex: 0, dropIndex: 1 },
    };

    expect(reducer(state, action)).toEqual({
      personaDisplayDimGroups: ['2', '1'],
    });
  });

  it('getDisplayDims', () => {
    const reducer = reducers.getDisplayDims;
    const state = { checkedDims: ['1', '2', '5'], disPlayDims: [] };

    const action = {
      type: 'persona/getDisplayDims',
      payload: {
        tagGroups: [
          {
            text: 'ungroup',
            id: '222',
            tags: [
              {
                id: '1',
                text: '测试1',
                refText: '',
                refId: '',
                groupId: '',
              },
              {
                id: '2',
                text: '测试2',
                refText: '',
                refId: '',
                groupId: '',
              },
            ],
          },
          {
            text: '31',
            id: '111',
            tags: [
              {
                id: '5',
                text: '测试1',
                refText: '',
                refId: '',
                groupId: '',
              },
              {
                id: '7',
                text: '测试2',
                refText: '',
                refId: '',
                groupId: '',
              },
            ],
          },
        ],
      },
    };

    expect(reducer(state, action)).toEqual({
      checkedDims: ['1', '2', '5'],
      disPlayDims: [
        {
          id: '1',
          text: '测试1',
          refText: '',
          refId: '',
          groupId: '',
        },
        {
          id: '2',
          text: '测试2',
          refText: '',
          refId: '',
          groupId: '',
        },
        {
          id: '5',
          text: '测试1',
          refText: '',
          refId: '',
          groupId: '',
        },
      ],
    });
  });
  it('addDimToPersonaGroups', () => {
    const reducer = reducers.addDimToPersonaGroups;

    const state = {
      personaData: [
        {
          dimGroups: [
            {
              text: '痛点',
              key: 'frustrations',
              dims: [
                {
                  tagId: '1!',
                  tagText: '1',
                  text: '3',
                  value: 0.5,
                },
              ],
            },
          ],
        },
      ],
    };

    const action = {
      type: 'persona/getDisplayDims',
      payload: {
        personaQuesData: [
          {
            quesData: [
              {
                tagText: '1',
                tagId: '1!',
                key: 'persona-0-0',
                type: 1,
                answer: { order: 0.5, text: '3' },
                question: 'b',
              },
              {
                tagText: '2',
                tagId: '2!',
                key: 'persona-0-1',
                type: 1,
                answer: { order: 3, text: 'q' },
                question: 'd',
              },
              {
                tagText: '3',
                tagId: '3!',
                key: 'persona-0-2',
                type: 1,
                answer: { order: 3.5, text: 'z' },
                question: 'c',
              },
            ],
          },
        ],
        groupId: 'frustrations',
        personaDimId: '3!',
      },
    };
    expect(reducer(state, action)).toEqual({
      personaData: [
        {
          dimGroups: [
            {
              text: '痛点',
              key: 'frustrations',
              dims: [
                {
                  tagId: '1!',
                  tagText: '1',
                  text: '3',
                  value: 0.5,
                },
                {
                  tagId: '3!',
                  tagText: '3',
                  text: 'z',
                  value: 3.5,
                },
              ],
            },
          ],
        },
      ],
    });
  });
  it('changeDimGroup', () => {
    const reducer = reducers.changeDimGroup;

    const state = {
      personaData: [
        {
          dimGroups: [
            {
              text: '痛点',
              key: 'frustrations',
              dims: [
                {
                  tagId: '1!',
                  tagText: '1',
                  text: '3',
                  value: 0.5,
                },
              ],
            },
            {
              text: '动机',
              key: 'motivation',
              dims: [
                {
                  tagId: '2！',
                  tagText: '31',
                  text: '34',
                  value: 0.51,
                },
              ],
            },
          ],
        },
      ],
    };

    const action = {
      type: 'persona/changeDimGroup',
      payload: {
        dragGroup: 'frustrations',
        dropGroup: 'motivation',
        dim: {
          tagId: '1!',
          tagText: '1',
          text: '3',
          value: 0.5,
        },
      },
    };
    expect(reducer(state, action)).toEqual({
      personaData: [
        {
          dimGroups: [
            {
              text: '痛点',
              key: 'frustrations',
              dims: [],
            },
            {
              text: '动机',
              key: 'motivation',
              dims: [
                {
                  tagId: '2！',
                  tagText: '31',
                  text: '34',
                  value: 0.51,
                },
                {
                  tagId: '1!',
                  tagText: '1',
                  text: '3',
                  value: 0.5,
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('initPersonaData', () => {
    const reducer = reducers.initPersonaData;

    const state = {
      personaData: [
        {
          dimGroups: [
            {
              text: '痛点',
              key: 'frustrations',
              dims: [
                {
                  tagId: '1!',
                  tagText: '1',
                  text: '3',
                  value: 0.5,
                },
              ],
            },
            {
              text: '动机',
              key: 'motivation',
              dims: [
                {
                  tagId: '2！',
                  tagText: '31',
                  text: '34',
                  value: 0.51,
                },
              ],
            },
          ],
        },
      ],
    };

    const action = {
      type: 'persona/initPersonaData',
      payload: [
        {
          typeName: '类别1',
          percent: 2 / 3,
          type: 1,
          quesData: [
            {
              tagText: '1',
              key: 'persona-0-0',
              answer: { order: 0.5, text: '3' },
              question: 'b',
            },
            { tagText: '2', key: 'persona-0-1', answer: { order: 3, text: 'q' }, question: 'd' },
            {
              tagText: '3',
              key: 'persona-0-2',
              answer: { order: 3.5, text: 'z' },
              question: 'c',
            },
          ],
        },
        {
          typeName: '类别2',
          percent: 1 / 3,
          type: 2,
          quesData: [
            { tagText: '1', key: 'persona-1-0', answer: { order: 2, text: '2' }, question: 'b' },
            { tagText: '2', key: 'persona-1-1', answer: { order: 1, text: 'w' }, question: 'd' },
            { tagText: '3', key: 'persona-1-2', answer: { order: 2, text: 'x' }, question: 'c' },
          ],
        },
      ],
    };
    expect(reducer(state, action)).toEqual({
      personaData: [
        {
          dimGroups,
          checkedDims: [],
          typeName: '类别1',
          basicInfo: {
            ...basicInfo(),
            percent: 2 / 3,
          },
        },
        {
          dimGroups,
          checkedDims: [],
          typeName: '类别2',
          basicInfo: {
            ...basicInfo(),
            percent: 1 / 3,
          },
        },
      ],
    });
  });
});
