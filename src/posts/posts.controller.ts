import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Fetch user posts with user id',
  })
  @ApiResponse({
    status: 200,
    description: "Users' posts fetched successfully",
  })
  @Get('/:userId')
  public getPostByUserId(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
}
