import { uniqBy, orderBy } from 'lodash';
import XLSX from 'xlsx';
import { ITextItem, TQuesData, IQuesRecord } from '@/models/data';

import { generateKey } from '@/utils';

/**
 * 读取文件转换为 Buffer
 * @param inputFile:输入文件
 */
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
/**
 * 读取文件转换为文本
 * @param  inputFile:输入文件
 */
export const readAsTextAsync = (inputFile: File): Promise<string> => {
  const temporaryFileReader = new FileReader();
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException('文件存在问题，请重新上传'));
    };
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(inputFile);
  });
};

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
    const record: IQuesRecord = {
      records: [],
    };
    entries.map((entry) => {
      const question = entry[0];
      const answer: string = entry[1];
      record.records.push({
        key: generateKey(),
        question,
        answer: { text: answer, order: getAnswerOrder(answer) },
      });
    });
    saveData.push(record);
  });

  return saveData;
};

/**
 * 抽取问题列表
 * @param  quesData: 问卷数据
 */
export const getQuestions = (quesData: TQuesData): Array<ITextItem> => {
  return quesData[0].records.map((ques) => ({ text: ques.question, key: ques.question }));
};
/**
 * 抽取一个问题的所有回答
 * @param quesData: 问卷数据
 * @param question: 问题
 */
export const getAnswers = (quesData: TQuesData, question: string): Array<ITextItem> => {
  let answers: Array<ITextItem> = [];
  quesData.forEach((quesRecord) => {
    quesRecord.records.forEach((item) => {
      if (item.question === question) {
        answers.push({ text: item.answer.text, key: generateKey() });
      }
    });
  });
  // 先求唯一，再排序
  return orderBy(uniqBy(answers, 'text'), 'text');
};
/**
 * 得到答案排序
 * @param answer:答案
 */
export const getAnswerOrder = (answer: string): number => {
  // TODO 修改成更加灵活的方法
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
/**
 * 根据答案排序获取回答
 * @param quesData: 问卷数据
 * @param question: 问题
 * @param order: 排序
 */
export const getAnswerByOrder = (quesData: TQuesData, question: string, order: number): string => {
  let answers = [];
  quesData.forEach((quesRecord) => {
    quesRecord.records.map((item) => {
      if (item.question === question) {
        answers.push({ ...item.answer });
      }
    });
  });
  // 求唯一
  answers = uniqBy(answers, 'text');
  //取数
  const answer = answers.find((answer) => answer.order === order).text;
  return answer === undefined ? answers[0].text : answer;
};

/**
 *  根据选择标签过滤问卷数据，用于降维与聚类
 */
export const getFilterQuesData = (quesData: TQuesData, selectedLabelKeys: string[]): TQuesData => {
  return quesData.map((quesRecord) => ({
    ...quesRecord,
    records: quesRecord.records.filter((record) => {
      const { question, labelKey } = record;
      return selectedLabelKeys.some((key) => key === labelKey || key === question);
    }),
  }));
};

/**
 * 从问卷数据获得降维所需数据
 * @param quesData:问卷数据
 */
export const getValueFromQuesData = (quesData: TQuesData): number[][] => {
  return quesData.map((quesRecord) =>
    quesRecord.records.map((quesDataItem) => quesDataItem.answer.order + 1)
  );
};

export class QuesData {
  private quesData: TQuesData;
  private questions: Array<ITextItem>;
  private values: number[][];

  constructor(rawData) {
    rawData.map((item) => {
      const entries = Object.entries(item);
      const record: IQuesRecord = {
        records: [],
      };
      entries.map((entry: {}) => {
        const question = entry[0];
        const answer = entry[1];
        record.records.push({
          key: generateKey(),
          question,
          answer: { text: answer, order: this.getAnswerOrder(answer) },
        });
      });
      this.quesData.push(record);
    });
    this.questions = this.quesData[0].records.map((ques) => ({
      text: ques.question,
      key: ques.question,
    }));
    this.values = this.quesData.map((quesRecord) =>
      quesRecord.records.map((quesDataItem) => quesDataItem.answer.order + 1)
    );
    console.log(this.quesData);
    console.log(this.questions);
    console.log(this.values);
  }

  /**
   * 抽取问题列表
   */
  public getQuestions = (): Array<ITextItem> => {
    return this.questions;
  };

  /**
   * 从问卷数据获得降维所需数据
   */
  public getValues = (): number[][] => {
    return this.values;
  };

  /**
   * 抽取一个问题的所有回答
   * @param question: 问题
   */
  public getAnswers = (question: string): Array<ITextItem> => {
    let answers: Array<ITextItem> = [];
    this.quesData.forEach((quesRecord) => {
      quesRecord.records.forEach((item) => {
        if (item.question === question) {
          answers.push({ text: item.answer.text, key: generateKey() });
        }
      });
    });
    // 先求唯一，再排序
    return orderBy(uniqBy(answers, 'text'), 'text');
  };

  /**
   * 根据答案排序获取回答
   * @param question: 问题
   * @param order: 排序
   */
  public getAnswerByOrder = (question: string, order: number): string => {
    let answers = [];
    this.quesData.forEach((quesRecord) => {
      quesRecord.records.map((item) => {
        if (item.question === question) {
          answers.push({ ...item.answer });
        }
      });
    });
    // 求唯一
    answers = uniqBy(answers, 'text');
    //取数
    const answer = answers.find((answer) => answer.order === order).text;
    return answer === undefined ? answers[0].text : answer;
  };

  /**
   *  根据选择标签过滤问卷数据，用于降维与聚类
   */
  public filterQuesDataBy = (selectedLabelKeys: string[]): TQuesData => {
    console.log(selectedLabelKeys);
    console.log(this.quesData);
    return this.quesData.map((quesRecord) => ({
      ...quesRecord,
      records: quesRecord.records.filter((quesDataItem) => {
        const { question } = quesDataItem;
        return selectedLabelKeys.some((key) => key === question);
      }),
    }));
  };

  /**
   * 得到答案排序
   * @param answer:答案
   */
  private getAnswerOrder = (answer: string): number => {
    // TODO 修改成更加灵活的方法
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
}
