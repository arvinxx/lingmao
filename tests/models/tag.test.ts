import { set, reset } from 'mockdate';
import model from '../../src/models/tag';
import { generateId } from '../../src/utils';

const reducers = model.reducers;

describe('Reducers', () => {
  it('querryTagGroups', () => {
    const reducer = reducers.querryTagGroups;
    const state = {
      tagGroups: [],
    };

    const action = {
      type: 'tag/querryTagGroups',
      payload: [{ id: 'dsad', tags: [], text: '未分组' }],
    };

    expect(reducer(state, action)).toEqual({
      tagGroups: [{ id: 'dsad', tags: [], text: '未分组' }],
    });
  });

  it('addTag', () => {
    const reducer = reducers.addTag;
    const state = {
      tagGroups: [
        {
          text: '未分组',
          id: '542424',
          tags: [],
        },
      ],
    };
    const action = {
      type: 'tag/addTag',
      payload: { text: 'dsa', refId: '1' },
    };
    expect(reducer(state, action)).toEqual({
      tagGroups: [
        {
          text: '未分组',
          id: '542424',
          tags: [{ text: 'dsa', refText: 'dsa', id: generateId(), refId: '1' }],
        },
      ],
    });
  });
  it('deleteTag', () => {
    const reducers = model.reducers;
    const reducer = reducers.deleteTag;
    const state = {
      tagGroups: [
        {
          text: '未分组',
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
      type: 'tag/deleteTag',
      payload: '2',
    };

    expect(reducer(state, action)).toEqual({
      tagGroups: [
        {
          text: '未分组',
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
          text: '未分组',
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
      type: 'tag/changeTagText',
      payload: { id: '2', newText: 'hello' },
    };

    expect(reducer(state, action)).toEqual({
      tagGroups: [
        {
          text: '未分组',
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
        type: 'tag/addTagGroup',
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

      const reducer = reducers.addTagGroup;
      const state = {
        dimensions: [],
      };
      const action = {
        type: 'tag/addDimensionKey',
        payload: '',
      };
      expect(reducer(state, action)).toEqual({
        dimensions: [],
      });

      reset(); // reset to realtime
    });
  });
  describe('deleteTagGroup', () => {
    it("should delete the tagGroup if it is n't 未分组 ", () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteTagGroup;
      const state = {
        tagGroups: [
          { text: '未分组', id: '341411', tags: [] },
          { text: '2', id: '21', tags: [] },
          { text: '3', id: '4', tags: [] },
        ],
      };
      const action = {
        type: 'tag/deleteTagGroup',
        payload: '21',
      };

      expect(reducer(state, action)).toEqual({
        tagGroups: [{ text: '未分组', id: '341411', tags: [] }, { text: '3', id: '4', tags: [] }],
      });
    });
    it("shouldn't delete the tagGroup if it is 未分组 ", () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteTagGroup;
      const state = {
        tagGroups: [
          { text: '未分组', id: '341411', tags: [] },
          { text: '2', id: '21', tags: [] },
          { text: '3', id: '4', tags: [] },
        ],
      };
      const action = {
        type: 'tag/deleteTagGroup',
        payload: '341411',
      };

      expect(reducer(state, action)).toEqual({
        tagGroups: [
          { text: '未分组', id: '341411', tags: [] },
          { text: '2', id: '21', tags: [] },
          { text: '3', id: '4', tags: [] },
        ],
      });
    });
  });
  describe('changeTagGroupText', () => {
    it("should changeTagGroupText if it is n't 未分组", () => {
      const reducers = model.reducers;
      const reducer = reducers.changeTagGroupText;
      const state = {
        tagGroups: [
          {
            text: '未分组',
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
        type: 'tag/changeTagGroupText',
        payload: { id: '111', newText: 'eed' },
      };

      expect(reducer(state, action)).toEqual({
        tagGroups: [
          {
            text: '未分组',
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
    it("shouldn't changeTagGroupText if it is 未分组", () => {
      const reducers = model.reducers;
      const reducer = reducers.changeTagGroupText;
      const state = {
        tagGroups: [
          {
            text: '未分组',
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
        type: 'tag/changeTagGroupText',
        payload: { id: '222', newText: 'eed' },
      };

      expect(reducer(state, action)).toEqual({
        tagGroups: [
          {
            text: '未分组',
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

  it('addTagToNewGroup', () => {
    set('1/1/2000');
    const reducer = reducers.addTagToNewGroup;
    const state = {
      tagGroups: [
        {
          text: '未分组',
          id: '78979',
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
            {
              id: '3',
              text: '测试5',
              refText: '',
              refId: '',
              groupId: '',
            },
          ],
        },
      ],
      selectedTags: ['1', '2'],
    };
    const action = {
      type: 'tag/addTagToNewGroup',
    };
    expect(reducer(state, action)).toEqual({
      tagGroups: [
        {
          text: '未分组',
          id: '78979',
          tags: [
            {
              id: '3',
              text: '测试5',
              refText: '',
              refId: '',
              groupId: '',
            },
          ],
        },
        {
          id: generateId(),
          text: '未命名',
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
      selectedTags: [],
    });
    reset();
  });

  it('changeSelectedTags', () => {
    const reducer = reducers.changeSelectedTags;
    const state = { selectedTags: ['1', '5', '745', '6'] };

    const action = { type: 'tag/changeSelectedTags', payload: { checked: false, id: '5' } };
    expect(reducer(state, action)).toEqual({ selectedTags: ['1', '745', '6'] });

    const action2 = { type: 'tag/changeSelectedTags', payload: { checked: true, id: '55' } };
    expect(reducer(state, action2)).toEqual({ selectedTags: ['1', '5', '745', '6', '55'] });
  });

  describe('handleTagIndexDrag', () => {
    const reducer = reducers.handleTagIndexDrag;
    it('should switch tag index if in the same group', () => {
      const state = {
        tagGroups: [
          {
            text: '未分组',
            id: '78979',
            tags: [
              {
                id: '3',
                text: '测试5',
                refText: '',
                refId: '',
                groupId: '',
              },
            ],
          },
          {
            id: '143213',
            text: '分组1',
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
        type: 'tag/handleTagIndexDrag',
        payload: {
          start: { dragIndex: 0, dragId: '1' },
          end: { dropIndex: 1, dropId: '2' },
        },
      };
      expect(reducer(state, action)).toEqual({
        tagGroups: [
          {
            text: '未分组',
            id: '78979',
            tags: [
              {
                id: '3',
                text: '测试5',
                refText: '',
                refId: '',
                groupId: '',
              },
            ],
          },
          {
            id: '143213',
            text: '分组1',
            tags: [
              {
                id: '2',
                text: '测试2',
                refText: '',
                refId: '',
                groupId: '',
              },
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
    it('should add to the end group if in the different group', () => {
      const state = {
        tagGroups: [
          {
            text: '未分组',
            id: '78979',
            tags: [
              {
                id: '3',
                text: '测试5',
                refText: '',
                refId: '',
                groupId: '',
              },
            ],
          },
          {
            id: '143213',
            text: '分组1',
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
        type: 'tag/handleTagIndexDrag',
        payload: {
          start: { dragIndex: 0, dragId: '1' },
          end: { dropIndex: 0, dropId: '3' },
        },
      };
      expect(reducer(state, action)).toEqual({
        tagGroups: [
          {
            text: '未分组',
            id: '78979',
            tags: [
              {
                id: '1',
                text: '测试1',
                refText: '',
                refId: '',
                groupId: '',
              },
              {
                id: '3',
                text: '测试5',
                refText: '',
                refId: '',
                groupId: '',
              },
            ],
          },
          {
            id: '143213',
            text: '分组1',
            tags: [
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

    it('should switch tag index if in the same group', () => {
      const state = {
        tagGroups: [
          {
            id: '1526132530988',
            text: '未分组',
            tags: [
              {
                refId: '1525949157016',
                id: '1526132589586',
                text: '。但火',
                _id: '5af6ef700616452eb85a28b0',
              },
              {
                refId: 'HJ@OwGtAG',
                id: 'rJecwftRf',
                text: '少门分，用被孟',
                _id: '5afb98a5aec4ec586cd4bd86',
              },
              {
                refId: 'HJ@OwGtAG',
                id: 'SJQcwMYAz',
                text: '格活最任，问',
                _id: '5afb98a5aec4ec586cd4bd84',
              },
              {
                _id: '5afc6a4e29917c234c05ecbd',
                text: '百管百',
                id: 'r1H89JcRz',
                refId: 'ryaD76uCz',
              },
            ],
          },
        ],
      };
      const action = {
        type: 'tag/handleTagIndexDrag',
        payload: {
          start: {
            dragIndex: 2,
            dragId: 'SJQcwMYAz',
          },
          end: {
            dropIndex: 1,
            dropId: 'rJecwftRf',
          },
        },
      };
      expect(reducer(state, action)).toEqual({
        tagGroups: [
          {
            id: '1526132530988',
            text: '未分组',
            tags: [
              {
                refId: '1525949157016',
                id: '1526132589586',
                text: '。但火',
                _id: '5af6ef700616452eb85a28b0',
              },
              {
                refId: 'HJ@OwGtAG',
                id: 'SJQcwMYAz',
                text: '格活最任，问',
                _id: '5afb98a5aec4ec586cd4bd84',
              },
              {
                refId: 'HJ@OwGtAG',
                id: 'rJecwftRf',
                text: '少门分，用被孟',
                _id: '5afb98a5aec4ec586cd4bd86',
              },
              {
                _id: '5afc6a4e29917c234c05ecbd',
                text: '百管百',
                id: 'r1H89JcRz',
                refId: 'ryaD76uCz',
              },
            ],
          },
        ],
      });
    });
  });
});
