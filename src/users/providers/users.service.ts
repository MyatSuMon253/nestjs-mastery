import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { PutUserDto } from '../dtos/put.user.dto';

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
  ) {}

  /**
   * Method to get all users from the db
   * @param limit
   * @param page
   * @returns
   */
  public findAll(limit: number, page: number) {
    const isAuth = this.authService.isAuth();

    console.log('auth status', isAuth);

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
  public createUser(createUserDto: CreateUserDto) {
    return `${createUserDto.firstName}'s user account is created`;
  }

  /**
   * Method to find the specific user with id
   * @param createUserDto
   * @returns
   */
  public findByUserId(userId: string) {
    return {
      id: userId,
      name: 'myat',
      email: 'myat@gmail.com',
    };
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
