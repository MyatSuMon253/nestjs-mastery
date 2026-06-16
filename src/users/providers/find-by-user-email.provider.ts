import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindByUserEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findByEmail(email: string) {
    let user: User | null = null;

    try {
      user = await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Cannot use this service right now',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return user;
  }
}
