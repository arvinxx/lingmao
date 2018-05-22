import { effects } from 'dva/saga';
import model, { initRawData } from '../../src/models/interview';
import { queryDocument } from '../../src/services/api';
import { generateId } from '../../src/utils';

jest.mock('shortid');

const reducers = model.reducers;

describe('Interview Model', () => {
  it('loads', () => {
    expect(model);
  });
  it('namespace is interview', () => {
    expect(model.namespace).toEqual('interview');
  });
});

describe('Effects', () => {
  const { call, put } = effects;
  const sagas = model.effects;

  it('fetchDocument', () => {
    const mockData = {
      records: ['1'],
      dimensions: [],
      title: 'hello',
    };
    const saga = sagas.fetchDocument;
    const generator = saga({ type: 'model/fetchDocument' }, { call, put });

    // 不是很懂下方的测试原理
    let next = generator.next();
    expect(next.value).toEqual(call(queryDocument));
    next = generator.next();
    expect(next.value).toEqual(put({ type: 'querryDocument', payload: [] }));
  });
});

describe('Reducers', () => {
  describe('querryDocument', () => {
    it('if id is empty should generate a new id', () => {
      const reducer = reducers.querryDocument;
      const state = {
        title: '',
        records: [
          {
            id: '',
            text: '',
            comment: '',
          },
        ],
        id: '',
        dimensions: [
          {
            id: '',
            key: '',
            values: [
              {
                id: '',
                text: '',
                editable: false,
              },
            ],
            inputVisible: false,
          },
        ],
        selectedValues: [],
      };
      const action = {
        type: 'interview/querryDocument',
        payload: [
          {
            _id: '5af03ce213e345a0b389babb',
            id: '',
            __v: 0,
            createdAt: '2018-05-07T11:47:46.881Z',
            title: '',
            updatedAt: '2018-05-07T11:47:49.701Z',
            dimensions: [
              {
                key: '',
                id: '',
                _id: '5af03ce5f6999c642e53ce35',
                values: [{ text: '', id: '', _id: '5af03ce5f6999c642e53ce36' }],
              },
            ],
            tagGroups: [],
            records: [{ text: '', id: '', _id: '5af03ce5f6999c642e53ce37' }],
          },
        ],
      };
      expect(reducer(state, action)).toEqual({
        dimensions: [
          {
            id: generateId(),
            key: '',
            values: [
              {
                id: generateId(),
                text: '',
                editable: false,
              },
            ],
            inputVisible: false,
          },
        ],
        records: [{ text: '', id: generateId() }],
        title: '',
        selectedValues: [],
        recordFocusId: generateId(),
        id: generateId(),
      });
    });
    it("if id isn't empty should keep it", () => {
      const reducer = reducers.querryDocument;
      const state = {
        title: '',
        records: [
          {
            id: '',
            text: '',
            comment: '',
          },
        ],
        id: '',
        dimensions: [
          {
            id: '',
            key: '',
            values: [
              {
                id: '',
                text: '',
                editable: false,
              },
            ],
            inputVisible: false,
          },
        ],
        selectedValues: [],
      };
      const action = {
        type: 'interview/querryDocument',
        payload: [
          {
            _id: '5af03ce213e345a0b389babb',
            id: '1',
            __v: 0,
            createdAt: '2018-05-07T11:47:46.881Z',
            title: '',
            updatedAt: '2018-05-07T11:47:49.701Z',
            dimensions: [
              {
                key: '',
                id: '2',
                _id: '5af03ce5f6999c642e53ce35',
                values: [{ text: '', id: '3', _id: '5af03ce5f6999c642e53ce36' }],
              },
            ],
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
                text: 'eed',
                id: '111',
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
            ],
            records: [{ text: '', id: '4', _id: '5af03ce5f6999c642e53ce37' }],
          },
        ],
      };
      expect(reducer(state, action)).toEqual({
        dimensions: [
          {
            id: '2',
            key: '',
            values: [
              {
                id: '3',
                text: '',
                editable: false,
              },
            ],
            inputVisible: false,
          },
        ],
        records: [{ text: '', id: '4' }],
        title: '',
        selectedValues: [],
        recordFocusId: '4',
        id: '1',
      });
    });
    it('should init document if key is not compete', () => {
      const reducer = reducers.querryDocument;
      const state = {
        title: '',
        records: [
          {
            id: '',
            text: '',
            comment: '',
          },
        ],
        id: '',
        dimensions: [
          {
            id: '',
            key: '',
            values: [
              {
                id: '',
                text: '',
                editable: false,
              },
            ],
            inputVisible: false,
          },
        ],
        selectedValues: [],
      };
      const action = {
        type: 'interview/querryDocument',
        payload: [
          {
            _id: '5af03ce213e345a0b389babb',
            id: '1',
            __v: 0,
            createdAt: '2018-05-07T11:47:46.881Z',
            updatedAt: '2018-05-07T11:47:49.701Z',
            dimensions: [
              {
                key: '',
                id: '2',
                _id: '5af03ce5f6999c642e53ce35',
                values: [{ text: '', id: '3', _id: '5af03ce5f6999c642e53ce36' }],
              },
            ],
            tagGroups: [
              {
                text: 'ungroup',
                id: '',
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
                text: 'eed',
                id: '',
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
            ],
            records: [],
            selectedValues: ['3'],
          },
        ],
      };
      expect(reducer(state, action)).toEqual({
        dimensions: [
          {
            id: '2',
            key: '',
            values: [
              {
                id: '3',
                text: '',
                editable: false,
              },
            ],
            inputVisible: false,
          },
        ],
        records: [{ id: generateId(), text: '', rawData: initRawData() }],
        title: '',
        selectedValues: ['3'],
        recordFocusId: generateId(),
        id: '1',
      });
    });
  });

  it('changeTitle', () => {
    const reducer = reducers.changeTitle;
    const state = {
      title: '',
    };

    const action = {
      type: 'interview/changeTitle',
      payload: 'sda',
    };

    expect(reducer(state, action)).toEqual({
      title: 'sda',
    });
  });
  it('changeTagVisible', () => {
    const reducer = reducers.changeTagVisible;
    const state = {
      tagVisible: true,
    };

    const action = {
      type: 'interview/changeTagVisible',
    };

    expect(reducer(state, action)).toEqual({
      tagVisible: false,
    });
  });
  it('changeUploadVisible', () => {
    const reducer = reducers.changeUploadVisible;
    const state = {
      uploadVisible: true,
    };

    const action = {
      type: 'interview/changeUploadVisible',
    };

    expect(reducer(state, action)).toEqual({
      uploadVisible: false,
    });
  });
});
