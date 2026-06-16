import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  DatabaseException,
  ResourceNotFoundException,
} from 'src/common/exceptions';
import { CreateUserDto } from '../dtos/create.user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { PutUserDto } from '../dtos/put.user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import authConfig from 'src/config/auth.config';
import * as config from '@nestjs/config';
import { UsersCreateManyProvider } from './users-create-many.provider.ts';
import { CreateUserProvider } from './create-user.provider';
import { FindByUserEmailProvider } from './find-by-user-email.provider';

/**
 * Class to connect with Users table and make business operations
 */
@Injectable()
export class UsersService {
  /**
   * Constructor to connect with other services to make operations
   * @param authService
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    private readonly configService: config.ConfigService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: config.ConfigType<typeof authConfig>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findByUserEmailProvider: FindByUserEmailProvider,
  ) {}

  /**
   * Method to get all users from the db
   * @param limit
   * @param page
   * @returns
   */
  public findAll(limit: number, page: number) {
    const isAuth = this.authService.isAuth();

    const env = this.configService.get('AUTH_KEY');

    console.log('env', env);
    console.log(this.authConfiguration.fallbackUrl);

    return [
      { name: 'kyaw kyaw', email: 'kyawkyaw@gmail.com' },
      { name: 'zaw zaw', email: 'zawzaw@gmail.com' },
      limit,
      page,
    ];
  }

  /**
   * Method to create a new user
   * @param createUserDto
   * @returns
   */
  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Method to find the specific user with id
   * @param createUserDto
   * @returns
   */
  public async findByUserId(userId: number) {
    let user;

    try {
      user = await this.usersRepository.findOneBy({ id: userId });
    } catch (error) {
      throw new DatabaseException();
    }

    if (!user) {
      throw new ResourceNotFoundException('User', userId);
    }
    return user;
  }

  /**
   * Method to update existing user with given id
   * @param putUserDto
   * @returns
   */
  public updateUser(putUserDto: PutUserDto) {
    return putUserDto;
  }

  public async createMany(createUsersDto: CreateUserDto[]) {
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }

  public async findUserByEmail(email: string) {
    return await this.findByUserEmailProvider.findByEmail(email);
  }
}
