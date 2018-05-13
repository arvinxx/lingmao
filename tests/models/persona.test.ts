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
});
