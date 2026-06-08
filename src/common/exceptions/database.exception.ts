import { RequestTimeoutException } from '@nestjs/common';

export class DatabaseException extends RequestTimeoutException {
  constructor(description = 'Error when connecting to database') {
    super('Cannot process your request at this time', { description });
  }
}
