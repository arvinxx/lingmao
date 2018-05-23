import { Value } from 'slate';

export const initRecords = (text) => ({
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: [
      {
        object: 'block',
        type: 'ul_list',
        isVoid: false,
        data: {},
        nodes: [
          {
            object: 'block',
            type: 'list_item',
            isVoid: false,
            data: {},
            nodes: [
              {
                object: 'block',
                type: 'paragraph',
                isVoid: false,
                data: {},
                nodes: [
                  {
                    object: 'text',
                    leaves: [
                      {
                        object: 'leaf',
                        text,
                        marks: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});

export const initRecordsAsValue = (text) => Value.fromJSON(initRecords(text));
