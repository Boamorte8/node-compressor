export class InvalidPathError extends Error {
  constructor(filename) {
    super(`Cannot read file ${filename}\n`);
  }
}
