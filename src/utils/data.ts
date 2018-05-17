import XLSX from 'xlsx';
import { uniqBy } from 'lodash';
import { TColumn, TTableData, TQuesData, TDim } from '../models/data';
import { generateId } from './utils';

export const xlsxToJson = (file: ArrayBuffer): Array<TQuesData> => {
  const workbook = XLSX.read(file, { type: 'buffer' });
  const sheetNames = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheetNames[0]];
  const rawData = XLSX.utils.sheet_to_json<JSON>(worksheet);
  return rawToSaved(rawData);
};

export const readAsArrayBufferAsync = (inputFile: File): Promise<ArrayBuffer> => {
  const temporaryFileReader = new FileReader();
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException('文件存在问题，请重新上传'));
    };
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsArrayBuffer(inputFile);
  });
};

export const rawToSaved = (rawData: Array<object>): Array<TQuesData> => {
  let saveData: TQuesData[] = [];
  rawData.map((item) => {
    const entries = Object.entries(item);
    let record: TQuesData = [];
    entries.map((entry) => {
      const question = entry[0];
      const answer = entry[1];
      record.push({
        tagId: '',
        tagText: '',
        key: generateId(),
        question,
        answer: { text: answer, order: 0 },
      });
    });
    saveData.push(record);
  });
  return saveData;
};

export const getQuestions = (quesData: TQuesData[]): Array<TTableData> => {
  let questions: TTableData[] = [];
  quesData[0].map((ques) => {
    questions.push({ name: ques.question, key: ques.question });
  });
  return questions;
};

export const getAnswers = (quesData: TQuesData[], question: string): Array<TTableData> => {
  let answers: Array<TTableData> = [];
  quesData.map((ques) => {
    ques.map((item) => {
      if (item.question === question) {
        answers.push({ name: item.answer.text, key: generateId() });
      }
    });
  });
  return uniqBy(answers, 'name');
};

export const getKeyArrays = (selectedQuestions: Array<TTableData>): Array<string> => {
  let selectedRowKeys: Array<string> = [];
  selectedQuestions.map((selectedQuestion: TTableData) => {
    selectedRowKeys.push(selectedQuestion.key);
  });
  return selectedRowKeys;
};

export const getColumns = (quesData: TQuesData[]): Array<TColumn> => {
  let columns: TColumn[] = [];
  if (quesData.length > 0 && quesData[0].length > 0) {
    quesData[0].map((record) => {
      const { tagId, tagText, key, question } = record;
      columns.push({ key: key, dataIndex: tagText !== '' ? tagId : question, title: question });
    });
    return columns;
  } else return [];
};
// for table page
export const getTableData = (quesData: TQuesData[], displayOrder: boolean): Array<object> => {
  let tableData: object[] = [];
  quesData.map((ques) => {
    let record: object = {};
    ques.map((entries) => {
      const { question, answer, tagText, tagId, key } = entries;
      record['key'] = key;
      if (tagText !== '') {
        record[tagId] = displayOrder ? answer.order.toString() : answer.text;
      } else {
        record[question] = displayOrder ? answer.order.toString() : answer.text;
      }
    });
    tableData.push(record);
  });
  return tableData;
};

export const getFilterTableData = <T>(tableData: Array<T>, isSelect: boolean): T[] => {
  console.log('filter');
  return tableData;
};

export const getFilterColumns = (columns: Array<TColumn>, isSelect: boolean): TColumn[] => {
  console.log('columns');
  return columns;
};

export const getFilterDims = (dims: TDim[], selectDims: string[]): TDim[] => {
  return dims.filter((dim) => {
    return !selectDims.some((id) => {
      return dim.id === id;
    });
  });
};
