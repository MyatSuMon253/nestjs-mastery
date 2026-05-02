import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-users.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { PutUserDto } from '../dtos/put-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

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

  public createUser(createUserDto: CreateUserDto) {
    return `${createUserDto.firstName}'s user account is created`;
  }

  public findByUserId(userId: string) {
    return {
      id: userId,
      name: 'myat',
      email: 'myat@gmail.com',
    };
  }

  public updateUser(putUserDto: PutUserDto) {
    return putUserDto;
  }
}
