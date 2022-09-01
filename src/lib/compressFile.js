import { constants, createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { emitKeypressEvents } from 'readline';
import { pipeline } from 'stream/promises';
import { unlink } from 'fs/promises';

import createProgressBar from './progressBar.js';
import { DeletingError } from '#Errors/deletingError.js';
import { ProcessingError } from '#Errors/processingError.js';
import { ProgressStream } from './progressStream.js';

const deleteFile = async (path) => {
  try {
    await unlink(path);
  } catch (error) {
    throw new DeletingError(path, error);
  }
};

export const compressFile = async (pathFile, outputPath) => {
  try {
    console.log('Compression in progress, press "p" to pause\n');
    const progressBar = await createProgressBar(pathFile);
    const progressStream = new ProgressStream(progressBar);
    const readFileStream = createReadStream(pathFile);
    // To work with multiple files is recommended to install the next library https://www.npmjs.com/package/archiver
    const gzipStream = createGzip({ level: constants.Z_BEST_COMPRESSION });
    const writeFileStream = createWriteStream(outputPath);

    // Keyboard actions
    const keyPressHandler = async (key) => {
      if (key === '\u0003') {
        gzipStream.destroy();
        await deleteFile(outputPath);
        console.clear();
        console.log('Compression aborted');
        process.exit(1);
      } else if (!gzipStream.isPaused() && key === 'p') {
        gzipStream.pause();

        console.clear();
        console.log('Compression was paused, press "r" to continue');
      } else if (gzipStream.isPaused() && key === 'r') {
        console.clear();
        gzipStream.resume();
        console.log('Compression was resumed, press "p" to pause');
      }
    };

    emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', keyPressHandler);

    await pipeline(readFileStream, progressStream, gzipStream, writeFileStream);

    console.log('Compression completed successfully');
    process.stdin.setRawMode(false);
    process.stdin.off('keypress', keyPressHandler);
    process.exit();
  } catch (errorGeneral) {
    await deleteFile(outputPath);
    throw new ProcessingError(errorGeneral);
  }
};
