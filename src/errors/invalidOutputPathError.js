export class InvalidOutputPathError extends Error {
  constructor(outputPath) {
    super(`Cannot write on path ${outputPath}\n`);
  }
}
