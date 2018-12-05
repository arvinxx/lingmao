import { ITag, ILabel } from '@/models/label';
import { tail } from 'lodash';
import { IPersonaDim } from '@/models/persona';

/**
 * 将标签组拍平成标签数组
 * @param labels 标签群组
 */
export const extractTags = (labels: ILabel[]): ITag[] => {
  let tags: ITag[] = [];
  if (labels !== undefined) {
    labels.map((label: ILabel) => {
      tags.push(...label.tags);
    });
    return tags;
  } else return [];
};

/**
 * 根据 Key 获取标签数组
 * @param labels 标签群组
 * @param keys 唯一编码数组
 */
export const getTagsArrByKey = (labels: ILabel[], keys: string[]): ITag[] => {
  if (labels !== undefined && keys !== undefined) {
    let tagsArr: ITag[] = [];
    keys.map((key) => {
      labels.map((label) => {
        const temp = label.tags.filter((tag) => tag.key === key);
        tagsArr = tagsArr.concat(temp);
      });
    });
    return tagsArr;
  } else return [];
};

export type TStarData = {
  value: string;
  name: string;
  category: number;
};
export type TStarCategory = {
  name: string;
};
export type TStarLink = {
  source: number;
  target: number;
};
export type TStarModel = {
  data: Array<TStarData>;
  categories: Array<TStarCategory>;
  links: Array<TStarLink>;
};

// TODO 关联潜在需求和需求强度
export const getStarData = (tagGroups: Array<ILabel>): TStarModel => {
  let data: TStarData[] = [];
  let categories: TStarCategory[] = [];
  let links: TStarLink[] = [];
  tail(tagGroups).map((tagGroup, index) => {
    const { tags, text } = tagGroup;
    categories.push({ name: text });
    data.push({ name: text, value: '0', category: index });
  });
  categories.map((category, index) => {
    const source = index;
    const target = index + 1 === categories.length ? 0 : index + 1;
    links.push({ source, target });
  });
  tail(tagGroups).map((tagGroup, index) => {
    const { tags } = tagGroup;
    tags.map((tag, tIndex) => {
      const { text } = tag;
      data.push({ name: text, value: '0', category: index });
      links.push({ source: index, target: links.length });
    });
  });
  return { data, categories, links };
};

export const getTagGroupId = (personaRecord: IPersonaDim[]): IPersonaDim[] => {
  return personaRecord.map((item) => {
    if (item.text !== '') {
      return item;
    } else {
      //TODO : 获取 GroupId
      console.log('TODO : 获取 GroupId');
      return item;
    }
  });
};
