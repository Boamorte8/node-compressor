export class ProcessingError extends Error {
  constructor(error) {
    super(`Compression aborted, an error has ocurred\n ${error}`);
  }
}
