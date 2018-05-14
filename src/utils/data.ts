import XLSX from 'xlsx';
import { uniqBy } from 'lodash';
import { TColumn, TQuestion, TSavedData } from '../models/data';

export const xlsxToJson = (file: ArrayBuffer): Array<JSON> => {
  const workbook = XLSX.read(file, { type: 'buffer' });
  const sheetNames = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheetNames[0]];
  return XLSX.utils.sheet_to_json<JSON>(worksheet);
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

export const rawToSaved = (rawData: Array<object>): Array<TSavedData> => {

  return []
};

export const getQuestions = (rawData: object[]): Array<TQuestion> => {
  let questions: TQuestion[] = [];
  Object.keys(rawData[0]).map((name) => {
    questions.push({ name, key: name });
  });
  return questions;
};

export const getRawColumns = (rawData: object[]): Array<TColumn> => {
  let columns: TColumn[] = [];
  if (rawData.length > 0) {
    Object.keys(rawData[0]).map((title) => {
      columns.push({ key: title, dataIndex: title, title });
    });
    return columns;
  } else return [];
};

export const getAnswers = (rawData: object[], question: string): Array<TQuestion> => {
  let answers: Array<TQuestion> = [];
  rawData.map((item) => {
    const answer = item[question];
    answers.push({ name: answer, key: answer });
  });
  return uniqBy(answers, 'name');
};

export const getKeyArrays = (selectedQuestions: Array<TQuestion>): Array<string> => {
  let selectedRowKeys: Array<string> = [];
  selectedQuestions.map((selectedQuestion: TQuestion) => {
    selectedRowKeys.push(selectedQuestion.key);
  });
  return selectedRowKeys;
};

export const generateIndexData = (savedData) => {};
