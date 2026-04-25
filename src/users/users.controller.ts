import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto';

@Controller('users')
export class UsersController {
  //   @Get()
  //   getUsers() {
  //     return 'get all users';
  //   }

  @Get()
  getFilterUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(5), ParseIntPipe) offset: number,
  ) {
    console.log('limit', limit, 'offset', offset);
    return 'get filtered users';
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number | undefined) {
    console.log(id, typeof id);
    return 'get user';
  }

  @Post()
  updateUser(@Body() body: CreateUserDto) {
    console.log('body', body);
    return 'update user';
  }
}
