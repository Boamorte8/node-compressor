import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { getOutputName } from '#Lib/getOutputName.js';
import { InvalidInputError } from '#Errors/invalidInputError.js';
import { InvalidPathError } from '#Errors/invalidPathError.js';
import { promptQuestion } from '#Lib/promptQuestion.js';
import { validateAccess } from '#Lib/validateAccess.js';

const BASE_PATH = dirname(fileURLToPath(import.meta.url));

export const bootstrap = async () => {
  try {
    // 1 Create the input and output path
    const userAnswer = await promptQuestion(
      'Introduce your action or operation:\n'
    );

    const standardAnswer = userAnswer.trim();

    if (standardAnswer === 'exit') {
      return false;
    }

    if (!standardAnswer) throw new InvalidInputError();

    const path = join(BASE_PATH, standardAnswer);
    await validateAccess(path);

    const outputPath = getOutputName(path);
    console.log(path, outputPath);

    // 2 Create reading, compression and writing streams
    // 3. Connect the streams

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
