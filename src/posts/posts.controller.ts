import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId')
  public getPostByUserId(@Param('userId') userId: string) {
    return this.postsService.findAll(userId)
  }
}
