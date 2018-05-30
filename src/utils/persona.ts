import { TPersonaDimGroups } from '../models/persona';

export const extractDims = (dimGroups: TPersonaDimGroups) => {
  let dims = [];
  dimGroups.forEach((dimGroup) => {
    dimGroup.dims.forEach((dim) => {
      dims.push(dim.tagId);
    });
  });
  return dims;
};

export const generateTagId = (tagId: string, question: string): string => {
  return tagId === '' ? question : tagId;
};
