import { generateId, initRecords } from '../utils';

export const getCleanDocument = (document) => {
  let { title, records, id: docId } = document;
  if (records === undefined || records === null) {
    records = initRecords('');
  }
  if (title === undefined || records === null) {
    title = '';
  }
  if (docId === '') {
    docId = generateId();
  }
  return { title, records, docId };
};

export const getCleanDimensions = (document) => {
  let { dimensions, selectedValues } = document;
  // 处理 dimensions

  const filterDimensions = dimensions.map((dimension) => {
    let { id, values, key } = dimension;
    return {
      values: values.map((value) => {
        let { id, text } = value;
        id = id === '' ? generateId() : id;
        return {
          text,
          id,
          editable: false,
        };
      }),
      key,
      id: id === '' ? generateId() : id,
      inputVisible: false,
    };
  });
  if (selectedValues === null) {
    selectedValues = [];
  }

  return { dimensions: filterDimensions, selectedValues };
};
export const getCleanTagGroups = (document) => {
  let { tagGroups } = document;
  if (tagGroups !== undefined && tagGroups !== null && tagGroups.length > 0) {
    tagGroups = tagGroups.map((tagGroup, index) => ({
      id: tagGroup.id === '' ? generateId() : tagGroup.id,
      text: index === 0 ? '未分组' : tagGroup.text,
      tags: tagGroup.tags,
    }));
  } else {
    tagGroups = [{ id: generateId(), tags: [], text: '未分组' }];
  }
  return tagGroups;
};
