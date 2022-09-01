import { constants, createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { unlink } from 'fs/promises';

import { DeletingError } from '#Errors/deletingError.js';
import { ProcessingError } from '#Errors/processingError.js';

export const compressFile = async (pathFile, outputPath) => {
  try {
    const readFileStream = createReadStream(pathFile);
    // To work with multiple files is recommended to install the next library https://www.npmjs.com/package/archiver
    const gzipStream = createGzip({ level: constants.Z_BEST_COMPRESSION });
    const writeFileStream = createWriteStream(outputPath);

    await pipeline(readFileStream, gzipStream, writeFileStream);

    console.log('Compression completed successfully');
    process.exit();
  } catch (error) {
    try {
      await unlink(outputPath);
    } catch (error) {
      throw new DeletingError(outputPath);
    }
    throw new ProcessingError();
  }
};
