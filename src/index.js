import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { compressFile } from '#Lib/compressFile.js';
import createTitle from '#Lib/printTitle.js';
import { getOutputName } from '#Lib/getOutputName.js';
import { InvalidInputError } from '#Errors/invalidInputError.js';
import { processErrors } from '#Errors/processErrors.js';
import { promptQuestion } from '#Lib/promptQuestion.js';
import { validateReadable, validateWriteable } from '#Lib/validateAccess.js';

const BASE_PATH = dirname(fileURLToPath(import.meta.url));

export const bootstrap = async () => {
  try {
    await createTitle('Compressor');
    // 1 Create the input and output path
    const userAnswer = await promptQuestion(
      'Introduce your action or operation:\n'
    );

    const standardAnswer = userAnswer.trim();

    if (standardAnswer === 'exit') process.exit();

    if (!standardAnswer) throw new InvalidInputError();

    const pathFile = join(BASE_PATH, standardAnswer);
    await validateReadable(pathFile);

    const outputPath = getOutputName(pathFile);
    await validateWriteable(outputPath);
    console.log(pathFile, outputPath);

    // 2 Create reading, compression and writing streams
    await compressFile(pathFile, outputPath);
  } catch (error) {
    processErrors(error);
  }
};

bootstrap();
