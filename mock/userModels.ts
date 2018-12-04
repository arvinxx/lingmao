import { quesData } from './data';
import { TQuesData } from '@/models/data';
import Mock from 'mockjs';
const Random = Mock.Random;

export const userModels: TQuesData = quesData.map((item) => ({
  ...item,
  type: Random.natural(1, 5),
  typeName: Random.cword(),
  percent: Random.natural(1, 40),
}));
