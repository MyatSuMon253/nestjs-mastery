import { NotFoundException } from '@nestjs/common';

export class ResourceNotFoundException extends NotFoundException {
  constructor(resource: string, identifier?: string | number) {
    const detail = identifier !== undefined ? ` with id ${identifier}` : '';
    super(`${resource}${detail} not found`);
  }
}
