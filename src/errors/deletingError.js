export class DeletingError extends Error {
  constructor(filename, error) {
    super(`Cannot delete file: ${filename}\n  ${error}`);
  }
}
