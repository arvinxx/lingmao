import { set, reset } from 'mockdate';
import model from '../../src/models/tag';
import { generateId } from '../../src/utils';

const reducers = model.reducers;

describe('Reducers', () => {
  it('addTag', () => {
    set('1/1/2000');

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
});
