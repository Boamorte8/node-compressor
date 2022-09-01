import { Transform } from 'stream';

export class ProgressStream extends Transform {
  constructor(progressBar) {
    super();
    this.progressBar = progressBar;
  }

  _transform(chunk, encoding, callback) {
    const size = Buffer.byteLength(chunk, encoding);
    this.progressBar.increment(size);
    callback(null, chunk);
  }

  _final(callback) {
    this.progressBar.stop();
    callback(null);
  }
}
