import XLSX from 'xlsx';
import { TQuesData, TQuesRecord } from '../models/data';
import { generateId } from '../utils';
import { uniq, orderBy } from 'lodash';

/**
 * 利用三方库将xlsx转成 json
 * @param file Xlsx 格式文件
 */
export const xlsxToJson = (file: ArrayBuffer): TQuesData => {
  const workbook = XLSX.read(file, { type: 'buffer' });
  const sheetNames = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheetNames[0]];
  const rawData = XLSX.utils.sheet_to_json<JSON>(worksheet);
  return rawToSaved(rawData);
};

/**
 *  将 xlsx 转出的数据转换为保存的数据
 * @param rawData 直接转换获得的键值对
 */
export const rawToSaved = (rawData: Array<object>): TQuesData => {
  let saveData: TQuesData = [];
  rawData.map((item) => {
    const entries = Object.entries(item);
    let record: TQuesRecord = [];
    entries.map((entry) => {
      const question = entry[0];
      const answer: string = entry[1];
      record.push({
        tagId: '',
        tagText: '',
        type: null,
        typeName: '',
        key: generateId(),
        question,
        answer: { text: answer, order: getAnswerOrder(answer) },
      });
    });
    saveData.push(record);
  });

  return saveData;
};

// TODO 修改成更加优雅地方法
export const getAnswerOrder = (answer: string): number => {
  let order = 0;
  switch (answer.slice(0, 1)) {
    case 'A' || 'a':
      order = 0;
      break;
    case 'B' || 'b':
      order = 1;
      break;
    case 'C' || 'c':
      order = 2;
      break;
    case 'D' || 'd':
      order = 3;
      break;
    case 'E' || 'e':
      order = 4;
      break;
    case 'F' || 'f':
      order = 5;
      break;
    case 'G' || 'g':
      order = 6;
      break;
    case 'H' || 'h':
      order = 7;
      break;
  }
  return order;
};

export const addMissData = (quesData: TQuesData): TQuesData => {
  // TODO: 补充缺失数据 #54
  return quesData;
};
