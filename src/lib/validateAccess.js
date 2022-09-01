import { access } from 'fs/promises';
import { constants } from 'fs';
import { InvalidPathError } from '#Errors/invalidPathError.js';

export const validateAccess = async (path) => {
  try {
    await access(path, constants.F_OK);
  } catch (error) {
    throw new InvalidPathError();
  }
};
