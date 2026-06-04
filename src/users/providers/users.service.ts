import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { PutUserDto } from '../dtos/put.user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import authConfig from 'src/config/auth.config';
import * as config from '@nestjs/config';

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
    private userRepository: Repository<User>,
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
    console.log(this.authConfiguration.fallbackUrl)

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
    // email exist or not
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    // handle flow

    // create new user
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  /**
   * Method to find the specific user with id
   * @param createUserDto
   * @returns
   */
  public async findByUserId(userId: number) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  /**
   * Method to update existing user with given id
   * @param putUserDto
   * @returns
   */
  public updateUser(putUserDto: PutUserDto) {
    return putUserDto;
  }
}
