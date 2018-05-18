import pathToRegexp from 'path-to-regexp';
import { drop, dropRight, tail } from 'lodash';

export const getBaseUrl = (pathname: string): string => {
  const re = pathToRegexp('*/:panel');
  return dropRight(drop(re.exec(pathname))).toString();
};
export const getLastRouter = (pathname: string): string => {
  const re = pathToRegexp('*/:panel');
  return tail(drop(re.exec(pathname))).toString();
};
