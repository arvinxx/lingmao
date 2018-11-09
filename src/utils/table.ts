import { IKeyDimension, TQuesData } from '@/models/data';
import { ITableColumn } from '../pages/Data/models/table';

/**
 * 将问卷数据转换成表格展示数据
 * @param  quesData 问卷数据
 * @param  displayOrder 是否显示序号
 */
export const getTableData = (quesData: TQuesData, displayOrder: boolean): Array<object> => {
  let tableData: object[] = [];
  quesData.map((ques) => {
    let record: object = {};
    ques.records.map((quesItem) => {
      const { question, answer, labelText, labelKey, key } = quesItem;
      record['key'] = key;
      if (labelText !== undefined) {
        record[labelKey] = displayOrder ? (answer.order + 1).toString() : answer.text;
      } else {
        record[question] = displayOrder ? (answer.order + 1).toString() : answer.text;
      }
    });
    tableData.push(record);
  });
  return tableData;
};

/**
 * 显示过滤的表格数据
 * @param tableData 表格数据
 * @param keyDimensions 选择维度
 * @param displayFilter 控制开关
 */
export const getFilterTableData = (
  tableData: Array<object>,
  keyDimensions: IKeyDimension[],
  displayFilter: boolean
): object[] => {
  if (displayFilter) {
    return tableData.map((item: object) => {
      // @ts-ignore
      let tempTableData = { key: item.key };
      keyDimensions.map((keyDimension) => {
        const question = keyDimension.question.text;
        if (item[question] !== undefined) {
          tempTableData[question] = item[question];
        }
      });
      return tempTableData;
    });
  }
  return tableData;
};

/**
 * 获得表格列属性
 * @param  quesData 问卷数据
 */
export const getColumns = (quesData: TQuesData): Array<ITableColumn> => {
  let columns: ITableColumn[] = [];
  if (quesData.length > 0 && quesData[0].records.length > 0) {
    quesData[0].records.map((record) => {
      const { labelKey, labelText, key, question } = record;
      columns.push({
        key: key,
        dataIndex: labelText !== undefined ? labelKey : question,
        title: question,
      });
    });
    return columns;
  } else return [];
};

/**
 * 获得过滤后表格
 * @param  columns 表格
 * @param  keyDimensions 选择维度
 * @param  displayFilter 过滤开关
 */
export const getFilterColumns = (
  columns: Array<ITableColumn>,
  keyDimensions: IKeyDimension[],
  displayFilter: boolean
): ITableColumn[] => {
  if (displayFilter) {
    let filterColumns: ITableColumn[] = [];
    keyDimensions.map((keyDimension) => {
      const { question } = keyDimension;
      filterColumns = filterColumns.concat(
        columns.filter((column) => column.title === question.text)
      );
    });
    return filterColumns;
  }
  return columns;
};

/**
 * 补充缺失数据
 * @param quesData 问卷数据
 */
export const addMissData = (quesData: TQuesData): TQuesData => {
  // TODO: 补充缺失数据 #54
  return quesData;
};
