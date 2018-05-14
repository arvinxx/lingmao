import pathToRegexp from 'path-to-regexp';
import { drop, dropRight } from 'lodash';

export const baseUrl = (pathname: string): string => {
  const re = pathToRegexp('*/:panel');
  return dropRight(drop(re.exec(pathname))).toString(); // 删掉第一个，删掉最后一个
};
