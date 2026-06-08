import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';
import { User } from '../user.entity';
import { DatabaseException } from 'src/common/exceptions';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createMany(createUsersDto: CreateUserDto[]) {
    let newUsers: User[] = [];
    // query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // connnect
      await queryRunner.connect();

      // start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new DatabaseException();
    }

    try {
      for (let user of createUsersDto) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      // if success -> commit
      await queryRunner.commitTransaction();
    } catch (error) {
      // if unsuccess -> rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Cannot complete this transaction', {
        description: String(error),
      });
    } finally {
      try {
        // release
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Cannot release this transaction connection',
          { description: String(error) },
        );
      }
    }

    return newUsers;
  }
}
