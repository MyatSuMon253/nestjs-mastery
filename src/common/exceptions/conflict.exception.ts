import { ConflictException } from '@nestjs/common';

export class ResourceConflictException extends ConflictException {
  constructor(resource: string, field: string, value: string) {
    super(`${resource} with ${field} '${value}' already exists`);
  }
}
