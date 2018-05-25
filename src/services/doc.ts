import { trim, compact } from 'lodash';

/**
 * 从纯文本提取文字内容
 * @param text string
 * @param model 格式化参数
 */
export const extractPlainText = async (text: string, model: number): Promise<string[]> => {
  try {
    let re;
    const filterText = compact(text.split(/\n/).map((str) => trim(str)));
    switch (model) {
      case 1:
        return filterText;
      case 3:
        re = /([,，])/;
        return compact(returnStr(filterText, re).map((str) => trim(str, ' 。.')));
      case 2:
        re = /([.。])/;
        return compact(returnStr(filterText, re).map((str) => trim(str, ' ,，')));
    }
  } catch (e) {
    console.log(e);
  }
};

const returnStr = (array: string[], re): string[] => {
  if (array.some((str) => str.match(re) === null)) {
    return array;
  } else
    return array
      .toString()
      .split(re)
      .filter((str) => str.match(re) === null);
};
