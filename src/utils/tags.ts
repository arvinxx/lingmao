import { TTag, TTagGroup } from '../models/tag';
import { tail } from 'lodash';
import { TPersonaRecord } from '../models/persona';

export const extractTags = (tagGroups: Array<TTagGroup>): Array<TTag> => {
  let tags: Array<TTag> = [];
  if (tagGroups !== undefined) {
    tagGroups.map((tagGroup: TTagGroup) => {
      tags.push(...tagGroup.tags);
    });
    return tags;
  } else return [];
};

export const getTagsArrById = (tagGroups: Array<TTagGroup>, Ids: Array<string>): Array<TTag> => {
  if (tagGroups !== undefined && Ids !== undefined) {
    let tagsArr: Array<TTag> = [];
    Ids.map((id) => {
      tagGroups.map((tagGroup) => {
        const temp = tagGroup.tags.filter((tag) => tag.id === id);
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
export const getStarData = (tagGroups: Array<TTagGroup>): TStarModel => {
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

export const getTagGroupId = (personaRecord: TPersonaRecord): TPersonaRecord => {
  return personaRecord.map((item) => {
    if (item.tagGroupId !== '') {
      return item;
    } else {
      //TODO : 获取 GroupId
      console.log('TODO : 获取 GroupId');
      return item;
    }
  });
};
