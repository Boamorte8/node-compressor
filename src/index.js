import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { getOutputName } from '#Lib/getOutputName.js';
import { InvalidInputError } from '#Errors/invalidInputError.js';
import { InvalidPathError } from '#Errors/invalidPathError.js';
import { promptQuestion } from '#Lib/promptQuestion.js';
import { validateReadable, validateWriteable } from '#Lib/validateAccess.js';

const BASE_PATH = dirname(fileURLToPath(import.meta.url));

export const bootstrap = async () => {
  try {
    // 1 Create the input and output path
    const userAnswer = await promptQuestion(
      'Introduce your action or operation:\n'
    );

    const standardAnswer = userAnswer.trim();

    if (standardAnswer === 'exit') process.exit(0);

    if (!standardAnswer) throw new InvalidInputError();

    const path = join(BASE_PATH, standardAnswer);
    await validateReadable(path);

    const outputPath = getOutputName(path);
    await validateWriteable(outputPath);
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
      process.exit(1);
    } else
      console.log(
        `Unexpected error: ${error.message}. Stack: ${error.stack}\n`
      );
    process.exit(1);
  }
};

bootstrap();
