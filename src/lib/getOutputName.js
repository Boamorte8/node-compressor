import { basename, dirname, extname, join } from 'path';

export const getOutputName = (pathFile) => {
  const dirFile = dirname(pathFile);
  const extFile = extname(pathFile);
  const nameFile = basename(pathFile, extFile);
  const newDate = new Date().getTime().toString();
  return join(dirFile, '../out', `${nameFile}-${newDate}${extFile}.gz`);
};
