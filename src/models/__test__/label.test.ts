import model from '../label';
import { generateKey } from '@/utils';
import { mediumLabel } from '@/data/labels';

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
    it('should switch tag index if in the same group', () => {
      const state = {
        labels: mediumLabel,
      };

      const action = {
        type: 'tag/handleTagIndexDrag',
        payload: {
          start: { dragIndex: 0, dragKey: 'rJecwftRf' },
          end: { dropIndex: 1, dropKey: 'rJecwfsdstRf' },
        },
      };
      expect(reducer(state, action)).toEqual({
        labels: [
          {
            text: '未分组',
            key: '1526132530988',
            tags: [
              {
                text: '测试标签2',
                key: 'rJecwfsdstRf',
                refText: '1352dx',
              },
              {
                text: '测试标签1',
                key: 'rJecwftRf',
                refText: '21312',
              },
            ],
          },
          {
            text: '性别',
            key: 'S1a3uMt0M',
            tags: [
              {
                text: '男',
                key: 'Byb9PfYRG',
              },
              {
                text: '女',
                key: 'Byb9PfY2RG',
              },
            ],
          },
        ],
      });
    });
    it('should add to the end group if in the different group', () => {
      const state = {
        labels: mediumLabel,
      };
      const action = {
        type: 'tag/handleTagIndexDrag',
        payload: {
          start: { dragIndex: 0, dragKey: 'rJecwftRf' },
          end: { dropIndex: 0, dropKey: 'Byb9PfYRG' },
        },
      };
      expect(reducer(state, action)).toEqual({
        labels: [
          {
            text: '未分组',
            key: '1526132530988',
            tags: [
              {
                text: '测试标签2',
                key: 'rJecwfsdstRf',
                refText: '1352dx',
              },
            ],
          },
          {
            text: '性别',
            key: 'S1a3uMt0M',
            tags: [
              {
                text: '测试标签1',
                key: 'rJecwftRf',
                refText: '21312',
              },
              {
                text: '男',
                key: 'Byb9PfYRG',
              },
              {
                text: '女',
                key: 'Byb9PfY2RG',
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
