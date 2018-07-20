import { tail, compact } from 'lodash';

import { ILabel } from '@/models/tag';

/**
 * 根据选择维度过滤已有的维度标签
 * @param labels 所有维度
 * @param isFilter true 返回不包含选择维度信息，false 返回只包含选择维度信息
 */
export const getFilterLabels = (labels: ILabel[], isFilter: boolean = true): ILabel[] => {
  // 去掉第一个'未分组'对象
  return tail(labels).filter((label) => {
    const result = label.questionKey !== undefined && label.questionKey !== '';
    return isFilter ? !result : result;
  });
};

export const getMatchLabelKeys = (labels: ILabel[]): string[] => {
  return compact(labels.map((label) => label.questionKey));
};
