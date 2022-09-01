import { DeletingError } from './deletingError.js';
import { InvalidInputError } from './invalidInputError.js';
import { InvalidOutputPathError } from './invalidOutputPathError.js';
import { InvalidPathError } from './invalidPathError.js';
import { ProcessingError } from './processingError.js';

export const processErrors = (error) => {
  if (
    error instanceof DeletingError ||
    error instanceof InvalidInputError ||
    error instanceof InvalidOutputPathError ||
    error instanceof InvalidPathError ||
    error instanceof ProcessingError
  ) {
    console.log(`${error.message}\n`);
    process.exit(1);
  } else
    console.log(`Unexpected error: ${error.message}. Stack: ${error.stack}\n`);
  process.exit(1);
};
