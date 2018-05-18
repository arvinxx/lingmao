import XLSX from 'xlsx';
import { uniqBy, has } from 'lodash';
import {
  TColumn,
  TTableData,
  TQuesData,
  TDim,
  TQuesDataItem,
  TQuesRecord,
  TSelectedQue,
} from '../models/data';
import { generateId } from './utils';

export const xlsxToJson = (file: ArrayBuffer): TQuesData => {
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

//将 xlsx 转出的数据转换为保存的数据
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
        key: generateId(),
        question,
        answer: { text: answer, order: 0 },
      });
    });
    saveData.push(record);
  });
  return saveData;
};

export const getQuestions = (quesData: TQuesData): Array<TTableData> => {
  let questions: TTableData[] = [];
  quesData[0].map((ques) => {
    questions.push({ name: ques.question, key: ques.question });
  });
  return questions;
};

export const getAnswers = (quesData: TQuesData, question: string): Array<TTableData> => {
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

export const getColumns = (quesData: TQuesData): Array<TColumn> => {
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
export const getTableData = (quesData: TQuesData, displayOrder: boolean): Array<object> => {
  let tableData: object[] = [];
  quesData.map((ques) => {
    let record: object = {};
    ques.map((entries) => {
      const { question, answer, tagText, tagId, key } = entries;
      record['key'] = key;
      if (tagText !== '') {
        record[tagId] = displayOrder ? (answer.order + 1).toString() : answer.text;
      } else {
        record[question] = displayOrder ? (answer.order + 1).toString() : answer.text;
      }
    });
    tableData.push(record);
  });
  return tableData;
};

export const getFilterTableData = (
  tableData: Array<object>,
  selectedQues: TSelectedQue[],
  displayFilter: boolean
): object[] => {
  if (displayFilter) {
    return tableData.map((item: object) => {
      let tempTableData = { key: item.key };
      selectedQues.map((selectedQue) => {
        const selectedQuestion = selectedQue.question.name;
        if (item[selectedQuestion] !== undefined) {
          tempTableData[selectedQuestion] = item[selectedQuestion];
        }
      });
      return tempTableData;
    });
  }

  return tableData;
};

export const getFilterColumns = (
  columns: Array<TColumn>,
  selectedQues: TSelectedQue[],
  displayFilter: boolean
): TColumn[] => {
  if (displayFilter) {
    let filterColumns: TColumn[] = [];
    selectedQues.map((selectedQue) => {
      const { question } = selectedQue;
      filterColumns = filterColumns.concat(
        columns.filter((column) => column.title === question.name)
      );
    });
    return filterColumns;
  }
  return columns;
};

/**
 * 根据选择维度过滤已有的维度标签
 * @param dims 所有维度
 * @param selectDims 选择维度
 * @param isFilter true 返回不包含选择维度信息，false 返回只包含选择维度信息
 */
export const getFilterDims = (
  dims: TDim[],
  selectDims: string[],
  isFilter: boolean = true
): TDim[] => {
  return dims.filter((dim) => {
    const res = selectDims.some((id) => {
      return dim.id === id;
    });
    return isFilter ? !res : res;
  });
};
