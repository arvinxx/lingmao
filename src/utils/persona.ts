import { IDimGroup, TDimGroups } from '@/models/persona';

export const extractKeyDimensions = (keyDimensions: TDimGroups) => {
  let dims = [];
  keyDimensions.forEach((keyDimension) => {
    keyDimension.dims.forEach((dim) => {
      dims.push(dim.labelKey);
    });
  });
  return dims;
};

export const generateTagId = (tagId: string, question: string): string => {
  return tagId === '' ? question : tagId;
};

/**
 * 在画布上根据 checkDims 的值过滤显示维度群组
 * @param dimGroups 维度群组
 * @param checkedDims 勾选的维度
 */
export const displayDimGroups = (dimGroups: TDimGroups, checkedDims: string[]) => {
  const filterDimGroups = dimGroups.filter((dimGroup: IDimGroup) =>
    dimGroup.dims.some((dim) => checkedDims.some((key) => key === dim.labelKey))
  );
  return filterDimGroups.map((dimGroup) => ({
    ...dimGroup,
    dims: dimGroup.dims.filter((dim) => checkedDims.some((key) => key === dim.labelKey)),
  }));
};
