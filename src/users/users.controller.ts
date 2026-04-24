import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  //   @Get()
  //   getUsers() {
  //     return 'get all users';
  //   }

  @Get()
  getFilterUsers(@Query('limit') limit: any, @Query('offset') offset: any) {
    console.log('limit', limit, 'offset', offset);
    return 'get filtered users';
  }

  @Get(':id')
  getUser(@Param('id') id: any) {
    console.log(id);
    return 'get user';
  }

  @Post()
  updateUser(@Body() body: any) {
    console.log('body', body);
    return 'update user';
  }
}
