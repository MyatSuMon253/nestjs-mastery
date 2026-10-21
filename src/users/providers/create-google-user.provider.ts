import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from '../interfaces/google-user.interface';
import { User } from '../user.entity';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async createGoogleUser(googleUser: GoogleUser) {
    try {
      const user = this.usersRepository.create(googleUser);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Cannot create new user with this account',
      });
    }
  }
}
