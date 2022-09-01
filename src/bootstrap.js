import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { InvalidInputError } from '#Errors/invalidInputError.js';
import { InvalidPathError } from '#Errors/invalidPathError.js';
import { promptQuestion } from '#Lib/promptQuestion.js';
import { validateAccess } from '#Lib/validateAccess.js';

const BASE_PATH = dirname(fileURLToPath(import.meta.url));

export const bootstrap = async () => {
  try {
    // 1 Get the path
    const userAnswer = await promptQuestion(
      'Introduce your action or operation:\n'
    );

    // 2 Validate entry
    const standardAnswer = userAnswer.trim();

    if (standardAnswer === 'exit') {
      return false;
    }

    if (!standardAnswer) throw new InvalidInputError();

    // 3. Check if document exists
    const path = join(BASE_PATH, standardAnswer);

    await validateAccess(path);

    // 4. Read the document
    // 5. Compress the document
    // 6. Write the document
    // 7. Add progress bar
    // 8. Add pause control
    // 9. Add resume control
  } catch (error) {
    if (
      error instanceof InvalidInputError ||
      error instanceof InvalidPathError
    ) {
      console.log(`${error.message}\n`);
      return false;
    } else
      console.log(
        `Unexpected error: ${error.message}. Stack: ${error.stack}\n`
      );
  }
};
