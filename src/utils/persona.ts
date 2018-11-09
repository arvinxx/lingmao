import { TPersonaDimGroups } from '@/models/persona';
import { keyDimensions } from "@/mock/data";

export const extractKeyDimensions = (keyDimensions: TPersonaDimGroups) => {
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
