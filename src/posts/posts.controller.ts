import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create.post.dto';
import { PatchPostDto } from './dtos/patch.post.dto';

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
  public getPostByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findAllByUserId(userId);
  }

  /** return all posts */
  @Get('/')
  public getAllPosts() {
    return this.postsService.findAll();
  }

  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'If you got 201 response, your post is created',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Update an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'If you got 200 response, your post is updated',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @ApiOperation({
    summary: 'Delete a blog post by id',
  })
  @ApiResponse({
    status: 200,
    description: 'If you got 200 response, your post was deleted',
  })
  @Delete('/:id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
