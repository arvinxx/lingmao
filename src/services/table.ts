import XLSX from 'xlsx';
import { TQuesData, TQuesRecord } from '../models/data';
import { generateId } from '../utils';

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
      const answer = entry[1];
      record.push({
        tagId: '',
        tagText: '',
        type: null,
        typeName: '',
        key: generateId(),
        question,
        answer: { text: answer, order: 0 },
      });
    });
    saveData.push(record);
  });
  return saveData;
};

export const addMissData = (quesData: TQuesData): TQuesData => {
  // TODO: 补充缺失数据 #54
  return quesData;
};
