import { createInterface } from 'readline';
import { promisify } from 'util';

const consoleInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const promptQuestion = promisify(consoleInterface.question).bind(
  consoleInterface
);

export const closeInterface = () => consoleInterface.close();
