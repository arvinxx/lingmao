import model from '../../src/models/persona';

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
      checkedDims: [],
    };

    const action = {
      type: 'persona/changeCheckedDims',
      payload: ['1', '3'],
    };

    expect(reducer(state, action)).toEqual({
      checkedDims: ['1', '3'],
    });
  });
  it('handleDragPersonaData', () => {
    const reducer = reducers.handleDragPersonaData;
    const state = {
      personaData: ['1', '2'],
    };

    const action = {
      type: 'persona/handleDragPersonaData',
      payload: { dragIndex: 0, dropIndex: 1 },
    };

    expect(reducer(state, action)).toEqual({
      personaData: ['2', '1'],
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
          [
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
  fit('changeDimGroup', () => {
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
});
