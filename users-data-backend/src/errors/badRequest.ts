import BaseHTTPError from './httpError';

class BadRequest extends BaseHTTPError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequest;