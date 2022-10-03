import BaseHTTPError from './httpError';

class NotFound extends BaseHTTPError {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFound;