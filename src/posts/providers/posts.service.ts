import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from 'src/common/exceptions';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create.post.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch.post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/provider/pagination.provider';

@Injectable()
export class PostsService {
  constructor(
    /** inject users service */
    private readonly usersService: UsersService,
    /** inject tags service */
    private readonly tagsService: TagsService,
    /**inject paginationProvider */
    private readonly paginationProvider: PaginationProvider,
    /** inject posts repository */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    let author = await this.usersService.findByUserId(createPostDto.authorId);
    if (!author) {
      throw new ResourceNotFoundException('Author', createPostDto.authorId);
    }

    let tags = await this.tagsService.findMultiTags(createPostDto.tags!);
    if (!tags) {
      throw new ResourceNotFoundException('Tags');
    }

    let post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    post = await this.postsRepository.save(post);
    return post;
  }

  /** update existing blog by id */
  public async update(patchPostDto: PatchPostDto) {
    let tags = await this.tagsService.findMultiTags(patchPostDto.tags!);
    if (!tags) {
      throw new ResourceNotFoundException('Tags');
    }

    let post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    if (!post) {
      throw new ResourceNotFoundException('Post', patchPostDto.id);
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.featureImgUrl = patchPostDto.featureImgUrl ?? post.featureImgUrl;
    post.slug = patchPostDto.slug ?? post.slug;
    post.status = patchPostDto.status ?? post.status;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    if (patchPostDto.meta) {
      post.meta.readTime = patchPostDto.meta.readTime ?? post.meta.readTime;
    }

    post.tags = tags;

    post = await this.postsRepository.save(post);
    return post;
  }

  /** return all posts */
  public async findAll(postQuery: GetPostsDto) {
    const posts = this.paginationProvider.paginateQuery(
      postQuery,
      this.postsRepository,
    );
    return posts;
  }

  /** return all posts by user id */
  public findAllByUserId(userId: number) {
    const user = this.usersService.findByUserId(userId);

    return [
      { title: 'Title 1', content: 'Content 1', user },
      { title: 'Title 2', content: 'Content 2', user },
    ];
  }

  /** delete a post by id */
  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { message: 'Post deleted successfully', id };
  }
}
