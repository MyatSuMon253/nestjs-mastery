import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-users.dto';

@Injectable()
export class UsersService {
  public findAll() {
    return [
      { name: 'kyaw kyaw', email: 'kyawkyaw@gmail.com' },
      { name: 'zaw zaw', email: 'zawzaw@gmail.com' },
    ];
  }

  public createUser(createUserDto: CreateUserDto) {
    return `${createUserDto.firstName}'s user account is created`;
  }
}
