import { effects } from 'dva/saga';
import model, { initRawData } from '../../src/models/interview';
import { queryDocument, saveDocument } from '../../src/services/interview';
import { generateId } from '../../src/utils';

import { set, reset } from 'mockdate';

const reducers = model.reducers;

describe('Interview Model', () => {
  it('loads', () => {
    expect(model);
  });
  it('namespace is interview', () => {
    expect(model.namespace).toEqual('interview');
  });
});

describe('Reducers', () => {
  describe('querryDocument', () => {
    it('if id is empty should generate a new id', () => {
      set('1/1/2000'); // Mock datetime
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
        tagGroups: [],
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
        tagGroups: [{ id: generateId(), text: 'ungroup', tags: [] }],
      });
      reset();
    });
    it("if id isn't empty should keep it", () => {
      set('1/1/2000'); // Mock datetime
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
      });
      reset();
    });
    it('should init document if key is not compete', () => {
      set('1/1/2000'); // Mock datetime
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
        tagGroups: [
          {
            text: 'ungroup',
            id: generateId(),
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
            id: generateId(),
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
        selectedValues: ['3'],
        recordFocusId: generateId(),
        id: '1',
      });
      reset();
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

  it('addRecord', () => {
    set('1/1/2000'); // Mock datetime
    const reducer = reducers.addRecord;
    const state = {
      recordFocusId: '4',
      records: [
        {
          text: '1',
          id: '4',
        },
      ],
    };
    const action = {
      type: 'interview/addRecord',
      payload: '4',
    };
    expect(reducer(state, action)).toEqual({
      recordFocusId: generateId(),
      records: [
        {
          text: '1',
          id: '4',
        },
        {
          text: '',
          id: generateId(),
          rawData: initRawData(),
        },
      ],
    });
    reset(); // reset to realtime
  });
  describe('deleteRecord', () => {
    it("delete the record and set the previous item's focus to be true", () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteRecord;
      const state = {
        recordFocusId: '3',
        records: [
          {
            id: '1',
            text: 'delete',
          },
          {
            id: '3',
            text: '',
          },
        ],
      };
      const action = {
        type: 'interview/deleteRecord',
        payload: '3',
      };
      expect(reducer(state, action)).toEqual({
        recordFocusId: '1',
        records: [
          {
            id: '1',
            text: 'delete',
          },
        ],
      });
    });
    it("should stay original if there's only one record", () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteRecord;
      const state = { recordFocusId: '1', records: [{ id: '1', text: '' }] };
      const action = {
        type: 'interview/deleteRecord',
        payload: '1',
      };
      expect(reducer(state, action)).toEqual({
        recordFocusId: '1',
        records: [
          {
            id: '1',
            text: '',
          },
        ],
      });
    });
    it("delete the record and set the next item's focus to be true if it's the first item", () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteRecord;
      const state = {
        recordFocusId: '1',
        records: [
          {
            id: '1',
            text: '',
            comment: '',
          },
          {
            id: '3',
            text: 'delete',
            comment: '345',
          },
        ],
      };
      const action = {
        type: 'interview/deleteRecord',
        payload: '1',
      };
      expect(reducer(state, action)).toEqual({
        recordFocusId: '3',
        records: [
          {
            id: '3',
            text: 'delete',
            comment: '345',
          },
        ],
      });
    });
  });
  it('changeRecordText', () => {
    const reducers = model.reducers;
    const reducer = reducers.changeRecordText;
    const state = {
      records: [
        {
          id: '1',
          text: 'delete',
          focus: false,
        },
        {
          id: '3',
          text: '',
          focus: true,
        },
      ],
    };
    const action = {
      type: 'interview/changeRecordText',
      payload: { id: '3', newText: 'hello' },
    };

    expect(reducer(state, action)).toEqual({
      records: [
        {
          id: '1',
          text: 'delete',
          focus: false,
        },
        {
          id: '3',
          text: 'hello',
          focus: true,
        },
      ],
    });
  });

  it('changeRecordFocusId', () => {
    const reducer = reducers.changeRecordFocusId;
    const state = {
      recordFocusId: '',
      records: [
        {
          id: '1',
          text: 'delete',
          comment: '345',
        },
      ],
    };
    const action = {
      type: 'interview/changeRecordFocus',
      payload: '1',
    };
    expect(reducer(state, action)).toEqual({
      recordFocusId: '1',
      records: [
        {
          id: '1',
          text: 'delete',
          comment: '345',
        },
      ],
    });
  });
  describe('moveUpRecordFocusId', () => {
    it("Focus Id should be preview one's id when id in middle", () => {
      const reducer = reducers.moveUpRecordFocusId;
      const state = {
        recordFocusId: '3',
        records: [
          { id: '1', text: 'delete' },
          { id: '3', text: 'rerqdf' },
          { id: '5', text: 'rerqdf' },
          { id: '6', text: 'rerqdf' },
        ],
      };
      const action = {
        type: 'interview/moveUpRecordFocusId',
        payload: '3',
      };
      expect(reducer(state, action)).toEqual({
        recordFocusId: '1',
        records: [
          { id: '1', text: 'delete' },
          { id: '3', text: 'rerqdf' },
          { id: '5', text: 'rerqdf' },
          { id: '6', text: 'rerqdf' },
        ],
      });
    });
    it("Focus Id should remain if it's the first one", () => {
      const reducer = reducers.moveUpRecordFocusId;
      const state = {
        recordFocusId: '1',
        records: [
          { id: '1', text: 'delete' },
          { id: '3', text: 'rerqdf' },
          { id: '7', text: 'rerqdf' },
          { id: '6', text: 'rerqdf' },
        ],
      };
      const action = {
        type: 'interview/moveUpRecordFocusId',
        payload: '1',
      };
      expect(reducer(state, action)).toEqual({
        recordFocusId: '1',
        records: [
          { id: '1', text: 'delete' },
          { id: '3', text: 'rerqdf' },
          { id: '7', text: 'rerqdf' },
          { id: '6', text: 'rerqdf' },
        ],
      });
    });
  });
  describe('moveDownRecordFocusId', () => {
    it("Focus Id should be preview one's id when id in middle", () => {
      const reducer = reducers.moveDownRecordFocusId;
      const state = {
        recordFocusId: '3',
        records: [
          { id: '1', text: 'delete' },
          { id: '3', text: 'rerqdf' },
          { id: '4', text: 'rerqdf' },
          { id: '6', text: 'rerqdf' },
        ],
      };
      const action = {
        type: 'interview/moveDownRecordFocusId',
        payload: '3',
      };
      expect(reducer(state, action)).toEqual({
        recordFocusId: '4',
        records: [
          { id: '1', text: 'delete' },
          { id: '3', text: 'rerqdf' },
          { id: '4', text: 'rerqdf' },
          { id: '6', text: 'rerqdf' },
        ],
      });
    });
    it("Focus Id should remain if it's the last one", () => {
      const reducer = reducers.moveDownRecordFocusId;
      const state = {
        recordFocusId: '6',
        records: [
          { id: '1', text: 'delete' },
          { id: '3', text: 'rerqdf' },
          { id: '6', text: 'rerqdf' },
        ],
      };
      const action = {
        type: 'interview/moveDownRecordFocusId',
        payload: '6',
      };
      expect(reducer(state, action)).toEqual({
        recordFocusId: '6',
        records: [
          { id: '1', text: 'delete' },
          { id: '3', text: 'rerqdf' },
          { id: '6', text: 'rerqdf' },
        ],
      });
    });
  });

  describe('addDimensionKey', () => {
    it("should add a dimension key if it's not empty", () => {
      set('1/1/2000'); // Mock datetime

      const reducer = reducers.addDimensionKey;
      const state = {
        dimensions: [],
      };
      const action = {
        type: 'interview/addDimensionKey',
        payload: 'dsa',
      };
      expect(reducer(state, action)).toEqual({
        dimensions: [
          {
            key: 'dsa',
            id: generateId(),
            values: [],
          },
        ],
      });

      reset(); // reset to realtime
    });
    it("should remain if it's empty", () => {
      set('1/1/2000'); // Mock datetime

      const reducer = reducers.addDimensionKey;
      const state = {
        dimensions: [],
      };
      const action = {
        type: 'interview/addDimensionKey',
        payload: '',
      };
      expect(reducer(state, action)).toEqual({
        dimensions: [],
      });

      reset(); // reset to realtime
    });
  });
  it('deleteDimensionKey', () => {
    const reducers = model.reducers;
    const reducer = reducers.deleteDimensionKey;
    const state = {
      dimensions: [
        { key: '1', id: '34', values: [] },
        { key: '2', id: '21', values: [] },
        { key: '3', id: '4', values: [] },
      ],
    };
    const action = {
      type: 'interview/deleteDimensionKey',
      payload: '21',
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [{ key: '1', id: '34', values: [] }, { key: '3', id: '4', values: [] }],
    });
  });
  it('changeDimensionKey', () => {
    const reducers = model.reducers;
    const reducer = reducers.changeDimensionKey;
    const state = {
      dimensions: [
        {
          key: '34',
          id: '222',
          values: [],
        },
        {
          key: '31',
          id: '111',
          values: [],
        },
      ],
    };
    const action = {
      type: 'interview/changeDimension',
      payload: { id: '222', newKey: 'eed' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          key: 'eed',
          id: '222',
          values: [],
        },
        {
          key: '31',
          id: '111',
          values: [],
        },
      ],
    });
  });

  describe('addDimensionValue', () => {
    it("should add a dimension value if it's not empty", () => {
      set('1/1/2000'); // Mock datetime

      const reducer = reducers.addDimensionValue;
      const state = {
        dimensions: [
          {
            id: '3',
            key: '1',
            values: [],
          },
        ],
      };
      const action = {
        type: 'interview/addDimensionValue',
        payload: { id: '3', newValue: 'dsa' },
      };

      expect(reducer(state, action)).toEqual({
        dimensions: [
          {
            id: '3',
            key: '1',
            values: [
              {
                id: generateId(),
                text: 'dsa',
              },
            ],
          },
        ],
      });
      reset();
    });
    it("should add a dimension value if it's empty", () => {
      set('1/1/2000'); // Mock datetime

      const reducer = reducers.addDimensionValue;
      const state = {
        dimensions: [
          {
            id: '3',
            key: '1',
            values: [],
          },
        ],
      };
      const action = {
        type: 'interview/addDimensionValue',
        payload: { id: '3', newValue: '' },
      };

      expect(reducer(state, action)).toEqual({
        dimensions: [
          {
            id: '3',
            key: '1',
            values: [],
          },
        ],
      });
      reset();
    });
  });
  it('changeDimensionValue', () => {
    const reducer = reducers.changeDimensionValue;
    const state = {
      dimensions: [
        {
          id: '3',
          key: '1',
          values: [{ text: '31', id: '22' }, { text: '42', id: '1' }],
        },
        {
          id: '43',
          key: '1',
          values: [{ text: 'sad', id: '1' }, { text: 'daqw', id: '4' }],
        },
      ],
    };
    const action = {
      type: 'interview/addDimensionValue',
      payload: { id: '3', vid: '22', newValue: 'dsa' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          key: '1',
          values: [{ text: 'dsa', id: '22' }, { text: '42', id: '1' }],
        },
        {
          id: '43',
          key: '1',
          values: [{ text: 'sad', id: '1' }, { text: 'daqw', id: '4' }],
        },
      ],
    });
  });
  it('deleteDimensionValue', () => {
    const reducer = reducers.deleteDimensionValue;
    const state = {
      dimensions: [
        {
          id: '3',
          key: '1',
          values: [{ id: 'ed', text: 'eee' }, { id: '4', text: '444' }, { id: '5', text: 's3' }],
        },
        {
          id: '5',
          key: '1',
          values: [{ id: 'ed', text: 'eee' }, { id: '4', text: '444' }, { id: '5', text: 's3' }],
        },
      ],
    };
    const action = {
      type: 'interview/deleteDimensionValue',
      payload: { id: '3', vid: '5' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          key: '1',
          values: [{ id: 'ed', text: 'eee' }, { id: '4', text: '444' }],
        },
        {
          id: '5',
          key: '1',
          values: [{ id: 'ed', text: 'eee' }, { id: '4', text: '444' }, { id: '5', text: 's3' }],
        },
      ],
    });
  });

  it('showValueInput', () => {
    const reducer = reducers.showValueInput;
    const state = {
      dimensions: [
        {
          id: '3',
          inputVisible: false,
        },
        {
          id: '4',
          inputVisible: false,
        },
      ],
    };

    const action = {
      type: 'interview/showValueInput',
      payload: '3',
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          inputVisible: true,
        },
        {
          id: '4',
          inputVisible: false,
        },
      ],
    });
  });
  it('hideValueInput', () => {
    const reducer = reducers.hideValueInput;
    const state = {
      dimensions: [
        {
          id: '3',
          inputVisible: false,
        },
        {
          id: '4',
          inputVisible: true,
        },
      ],
    };

    const action = {
      type: 'interview/hideValueInput',
      payload: '4',
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          inputVisible: false,
        },
        {
          id: '4',
          inputVisible: false,
        },
      ],
    });
  });

  it('showValueEdit', () => {
    const reducer = reducers.showValueEdit;
    const state = {
      dimensions: [
        {
          id: '3',
          values: [
            {
              id: '1',
              editable: false,
            },
            { id: '2', editable: false },
          ],
        },
        {
          id: '4',
          values: [
            {
              id: '2',
              editable: false,
            },
          ],
        },
      ],
    };

    const action = {
      type: 'interview/showValueEdit',
      payload: { id: '3', vid: '1' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          values: [
            {
              id: '1',
              editable: true,
            },
            { id: '2', editable: false },
          ],
        },
        {
          id: '4',
          values: [
            {
              id: '2',
              editable: false,
            },
          ],
        },
      ],
    });
  });
  it('hideValueEdit', () => {
    const reducer = reducers.hideValueEdit;
    const state = {
      dimensions: [
        {
          id: '3',
          values: [
            {
              id: '1',
              editable: false,
            },
            { id: '2', editable: true },
          ],
        },
        {
          id: '4',
          values: [
            {
              id: '2',
              editable: false,
            },
          ],
        },
      ],
    };

    const action = {
      type: 'interview/hideValueEdit',
      payload: { id: '3', vid: '2' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          values: [
            {
              id: '1',
              editable: false,
            },
            { id: '2', editable: false },
          ],
        },
        {
          id: '4',
          values: [
            {
              id: '2',
              editable: false,
            },
          ],
        },
      ],
    });
  });

  it('changeSelectedValues', () => {
    const reducer = reducers.changeSelectedValues;
    const state = {
      selectedValues: [],
    };

    const action = {
      type: 'interview/changeSelectedValues',
      payload: ['1234', '1235175'],
    };

    expect(reducer(state, action)).toEqual({
      selectedValues: ['1234', '1235175'],
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

  it('addTag', () => {
    set('1/1/2000');

    const reducer = reducers.addTag;
    const state = {
      tagGroups: [
        {
          text: 'ungroup',
          id: '542424',
          tags: [],
        },
      ],
    };
    const action = {
      type: 'interview/addTag',
      payload: { text: 'dsa', refId: '1' },
    };
    expect(reducer(state, action)).toEqual({
      tagGroups: [
        {
          text: 'ungroup',
          id: '542424',
          tags: [{ text: 'dsa', id: generateId(), refId: '1' }],
        },
      ],
    });
    reset();
  });
  it('deleteTag', () => {
    const reducers = model.reducers;
    const reducer = reducers.deleteTag;
    const state = {
      tagGroups: [
        {
          text: 'ungroup',
          id: '4234',
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
    };
    const action = {
      type: 'interview/deleteTag',
      payload: '2',
    };

    expect(reducer(state, action)).toEqual({
      tagGroups: [
        {
          text: 'ungroup',
          id: '4234',
          tags: [
            {
              id: '1',
              text: '测试1',
              refText: '',
              refId: '',
              groupId: '',
            },
          ],
        },
      ],
    });
  });
  it('changeTagText', () => {
    const reducers = model.reducers;
    const reducer = reducers.changeTagText;
    const state = {
      tagGroups: [
        {
          text: 'ungroup',
          id: '434',
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
    };
    const action = {
      type: 'interview/changeTagText',
      payload: { id: '2', newText: 'hello' },
    };

    expect(reducer(state, action)).toEqual({
      tagGroups: [
        {
          text: 'ungroup',
          id: '434',
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
              text: 'hello',
              refText: '',
              refId: '',
              groupId: '',
            },
          ],
        },
      ],
    });
  });

  describe('addTagGroup', () => {
    it("should add a new tagGroup if it's not empty", () => {
      set('1/1/2000'); // Mock datetime

      const reducer = reducers.addTagGroup;
      const state = {
        tagGroups: [],
      };
      const action = {
        type: 'interview/addTagGroup',
        payload: 'dsa',
      };
      expect(reducer(state, action)).toEqual({
        tagGroups: [
          {
            text: 'dsa',
            id: generateId(),
            tags: [],
          },
        ],
      });

      reset(); // reset to realtime
    });
    it("should remain if it's empty", () => {
      set('1/1/2000'); // Mock datetime

      const reducer = reducers.addDimensionKey;
      const state = {
        dimensions: [],
      };
      const action = {
        type: 'interview/addDimensionKey',
        payload: '',
      };
      expect(reducer(state, action)).toEqual({
        dimensions: [],
      });

      reset(); // reset to realtime
    });
  });
  describe('deleteTagGroup', () => {
    it("should delete the tagGroup if it is n't ungroup ", () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteTagGroup;
      const state = {
        tagGroups: [
          { text: 'ungroup', id: '341411', tags: [] },
          { text: '2', id: '21', tags: [] },
          { text: '3', id: '4', tags: [] },
        ],
      };
      const action = {
        type: 'interview/deleteTagGroup',
        payload: '21',
      };

      expect(reducer(state, action)).toEqual({
        tagGroups: [{ text: 'ungroup', id: '341411', tags: [] }, { text: '3', id: '4', tags: [] }],
      });
    });
    it("shouldn't delete the tagGroup if it is ungroup ", () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteTagGroup;
      const state = {
        tagGroups: [
          { text: 'ungroup', id: '341411', tags: [] },
          { text: '2', id: '21', tags: [] },
          { text: '3', id: '4', tags: [] },
        ],
      };
      const action = {
        type: 'interview/deleteTagGroup',
        payload: '341411',
      };

      expect(reducer(state, action)).toEqual({
        tagGroups: [
          { text: 'ungroup', id: '341411', tags: [] },
          { text: '2', id: '21', tags: [] },
          { text: '3', id: '4', tags: [] },
        ],
      });
    });
  });
  describe('changeTagGroupText', () => {
    it("should changeTagGroupText if it is n't ungroup", () => {
      const reducers = model.reducers;
      const reducer = reducers.changeTagGroupText;
      const state = {
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
      };
      const action = {
        type: 'interview/changeTagGroupText',
        payload: { id: '111', newText: 'eed' },
      };

      expect(reducer(state, action)).toEqual({
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
      });
    });
    it("shouldn't changeTagGroupText if it is ungroup", () => {
      const reducers = model.reducers;
      const reducer = reducers.changeTagGroupText;
      const state = {
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
      };
      const action = {
        type: 'interview/changeTagGroupText',
        payload: { id: '222', newText: 'eed' },
      };

      expect(reducer(state, action)).toEqual({
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
      });
    });
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
