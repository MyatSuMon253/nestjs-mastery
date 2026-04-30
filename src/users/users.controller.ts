import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { PutUserDto } from './dtos/put-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get()
  getFilterUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(5), ParseIntPipe) offset: number,
  ) {
    console.log('limit', limit, 'offset', offset);
    return 'get filtered users';
  }

  @Get(':id')
  getUser(@Param() getUserDto: GetUserDto) {
    console.log(getUserDto);
    return 'get user';
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Body() putUserDto: PutUserDto) {
    console.log(putUserDto);

    return 'update user';
  }
}
