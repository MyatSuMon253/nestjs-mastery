import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    const result = await repository.find({
      skip:
        paginationQuery?.page && paginationQuery.limit
          ? (paginationQuery.page - 1) * paginationQuery.limit
          : undefined,
      take: paginationQuery.limit,
    });

    return result;
  }
}
