import model from '../label';
import { generateKey } from '@/utils';

const reducers = model.reducers;

describe('Reducers', () => {
  it('addTag', () => {
    const reducer = reducers.addTag;
    const state = {
      labels: [
        {
          text: '未分组',
          key: '542424',
          tags: [],
        },
      ],
    };
    const action = {
      type: 'tag/addTag',
      payload: { text: 'dsa', key: '542424' },
    };
    expect(reducer(state, action)).toEqual({
      labels: [
        {
          text: '未分组',
          key: '542424',
          tags: [{ text: 'dsa', key: generateKey() }],
        },
      ],
    });
  });
  it('deleteTag', () => {
    const reducer = reducers.deleteTag;
    const state = {
      labels: [
        {
          text: '未分组',
          key: '4234',
          tags: [
            {
              key: '1',
              text: '测试1',
              refText: '',
              refKey: '',
              groupKey: '',
            },
            {
              key: '2',
              text: '测试2',
              refText: '',
              refKey: '',
              groupKey: '',
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
      labels: [
        {
          text: '未分组',
          key: '4234',
          tags: [
            {
              key: '1',
              text: '测试1',
              refText: '',
              refKey: '',
              groupKey: '',
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
      labels: [
        {
          text: '未分组',
          key: '434',
          tags: [
            {
              key: '1',
              text: '测试1',
              refText: '',
              refKey: '',
              groupKey: '',
            },
            {
              key: '2',
              text: '测试2',
              refText: '',
              refKey: '',
              groupKey: '',
            },
          ],
        },
      ],
    };
    const action = {
      type: 'tag/changeTagText',
      payload: { key: '2', text: 'hello' },
    };

    expect(reducer(state, action)).toEqual({
      labels: [
        {
          text: '未分组',
          key: '434',
          tags: [
            {
              key: '1',
              text: '测试1',
              refText: '',
              refKey: '',
              groupKey: '',
            },
            {
              key: '2',
              text: 'hello',
              refText: '',
              refKey: '',
              groupKey: '',
            },
          ],
        },
      ],
    });
  });

  describe('addLabel', () => {
    it("should add a new label if it's not empty", () => {
      const reducer = reducers.addLabel;
      const state = {
        labels: [],
      };
      const action = {
        type: 'tag/addLabel',
        payload: 'dsa',
      };
      expect(reducer(state, action)).toEqual({
        labels: [
          {
            text: 'dsa',
            key: generateKey(),
            tags: [],
          },
        ],
      });
    });
    it("should remain if it's empty", () => {
      const reducer = reducers.addLabel;
      const state = {
        labels: [],
      };
      const action = {
        type: 'tag/addLabel',
        payload: '',
      };
      expect(reducer(state, action)).toEqual({
        labels: [],
      });
    });
  });
  describe('deleteLabel', () => {
    it("should delete the label if it is n't 未分组 ", () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteLabel;
      const state = {
        labels: [
          { text: '未分组', key: '341411', tags: [] },
          { text: '2', key: '21', tags: [] },
          { text: '3', key: '4', tags: [] },
        ],
      };
      const action = {
        type: 'tag/deleteLabel',
        payload: '21',
      };

      expect(reducer(state, action)).toEqual({
        labels: [{ text: '未分组', key: '341411', tags: [] }, { text: '3', key: '4', tags: [] }],
      });
    });
    it("shouldn't delete the label if it is 未分组 ", () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteLabel;
      const state = {
        labels: [
          { text: '未分组', key: '341411', tags: [] },
          { text: '2', key: '21', tags: [] },
          { text: '3', key: '4', tags: [] },
        ],
      };
      const action = {
        type: 'tag/deleteLabel',
        payload: '341411',
      };

      expect(reducer(state, action)).toEqual({
        labels: [
          { text: '未分组', key: '341411', tags: [] },
          { text: '2', key: '21', tags: [] },
          { text: '3', key: '4', tags: [] },
        ],
      });
    });
  });
  describe('changeLabelText', () => {
    it("should changeLabelText if it is n't 未分组", () => {
      const reducers = model.reducers;
      const reducer = reducers.changeLabelText;
      const state = {
        labels: [
          {
            text: '未分组',
            key: '222',
            tags: [],
          },
          {
            text: '31',
            key: '111',
            tags: [],
          },
        ],
      };
      const action = {
        type: 'tag/changeLabelText',
        payload: { key: '111', text: 'eed' },
      };

      expect(reducer(state, action)).toEqual({
        labels: [
          {
            text: '未分组',
            key: '222',
            tags: [],
          },
          {
            text: 'eed',
            key: '111',
            tags: [],
          },
        ],
      });
    });
    it("shouldn't changeLabelText if it is 未分组", () => {
      const reducers = model.reducers;
      const reducer = reducers.changeLabelText;
      const state = {
        labels: [
          {
            text: '未分组',
            key: '222',
            tags: [],
          },
          {
            text: '31',
            key: '111',
            tags: [],
          },
        ],
      };
      const action = {
        type: 'tag/changeLabelText',
        payload: { key: '222', text: 'eed' },
      };

      expect(reducer(state, action)).toEqual({
        labels: [
          {
            text: '未分组',
            key: '222',
            tags: [],
          },
          {
            text: '31',
            key: '111',
            tags: [],
          },
        ],
      });
    });
  });

  it('handleSelectedTags', () => {
    const reducer = reducers.handleSelectedTags;
    const state = { selectedTags: ['1', '5', '745', '6'] };

    const action = { type: 'tag/handleSelectedTags', payload: { checked: false, key: '5' } };
    expect(reducer(state, action)).toEqual({ selectedTags: ['1', '745', '6'] });

    const action2 = { type: 'tag/handleSelectedTags', payload: { checked: true, key: '55' } };
    expect(reducer(state, action2)).toEqual({ selectedTags: ['1', '5', '745', '6', '55'] });
  });

  describe('handleTagIndexDrag', () => {
    const reducer = reducers.handleTagIndexDrag;
    xit('should switch tag index if in the same group', () => {
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
    xit('should add to the end group if in the different group', () => {
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

    xit('should switch tag index if in the same group', () => {
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

  it('showTagInput', () => {
    const reducer = reducers.showTagInput;
    const state = {
      labels: [
        {
          key: '3',
          inputVisible: false,
        },
        {
          key: '4',

          inputVisible: false,
        },
      ],
    };

    const action = {
      type: 'tag/showTagInput',
      payload: '3',
    };

    expect(reducer(state, action)).toEqual({
      labels: [
        {
          key: '3',
          inputVisible: true,
        },
        {
          key: '4',
          inputVisible: false,
        },
      ],
    });
  });
  it('hideTagInput', () => {
    const reducer = reducers.hideTagInput;
    const state = {
      labels: [
        {
          key: '3',
          inputVisible: true,
        },
        {
          key: '4',
          inputVisible: false,
        },
      ],
    };

    const action = {
      type: 'tag/hideTagInput',
      payload: '3',
    };

    expect(reducer(state, action)).toEqual({
      labels: [
        {
          key: '3',
          inputVisible: false,
        },
        {
          key: '4',

          inputVisible: false,
        },
      ],
    });
  });

  it('showTagEdit', () => {
    const reducer = reducers.showTagEdit;
    const state = {
      labels: [{ tags: [{ key: '3', editable: false }] }, { key: '4', editable: false }],
    };

    const action = {
      type: 'tag/showTagEdit',
      payload: '3',
    };

    expect(reducer(state, action)).toEqual({
      labels: [{ tags: [{ key: '3', editable: true }] }, { key: '4', editable: false }],
    });
  });
  it('hideTagEdit', () => {
    const reducer = reducers.hideTagEdit;
    const state = {
      labels: [{ tags: [{ key: '3', editable: true }] }, { key: '4', editable: false }],
    };

    const action = {
      type: 'tag/hideTagEdit',
      payload: '3',
    };

    expect(reducer(state, action)).toEqual({
      labels: [{ tags: [{ key: '3', editable: false }] }, { key: '4', editable: false }],
    });
  });
});
