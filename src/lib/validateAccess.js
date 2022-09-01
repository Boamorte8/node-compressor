import { access } from 'fs/promises';
import { constants } from 'fs';
import { dirname } from 'path';
import { InvalidPathError } from '#Errors/invalidPathError.js';
import { InvalidOutputPathError } from '#Errors/invalidOutputPathError.js';

export const validateReadable = async (path) => {
  try {
    await access(path, constants.R_OK);
  } catch (error) {
    throw new InvalidPathError(path);
  }
};

export const validateWriteable = async (path) => {
  const dirFile = dirname(path);
  try {
    await access(dirFile, constants.W_OK);
  } catch (error) {
    throw new InvalidOutputPathError(dirFile);
  }
};
