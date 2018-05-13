import { TTag, TTagGroup } from '../models/tag';

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
