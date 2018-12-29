import { TDimGroups } from '@/models/persona';
import keyDimensions from '@/data/keyDimensions';

export const extractKeyDimensions = (keyDimensions: TDimGroups) => {
  let dims = [];
  keyDimensions.forEach((keyDimension) => {
    keyDimension.dims.forEach((dim) => {
      dims.push(dim.tagId);
    });
  });
  return dims;
};

export const generateTagId = (tagId: string, question: string): string => {
  return tagId === '' ? question : tagId;
};
