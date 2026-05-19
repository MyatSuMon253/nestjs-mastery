import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create.post.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch.post.dto';

@Injectable()
export class PostsService {
  constructor(
    /** inject users service */
    private readonly usersService: UsersService,
    /** inject tags service */
    private readonly tagsService: TagsService,
    /** inject posts repository */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    let author = await this.usersService.findByUserId(createPostDto.authorId);
    if (!author) {
      throw new Error('Author not found');
    }

    let tags = await this.tagsService.findMultiTags(createPostDto.tags!);
    if (!tags) {
      throw new Error('Tags not found');
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
      throw new Error('Tags not found');
    }

    let post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    if (!post) {
      throw new Error('Post not found');
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.featureImgUrl = patchPostDto.featureImgUrl ?? post.featureImgUrl;
    post.slug = patchPostDto.slug ?? post.slug;
    post.status = patchPostDto.status ?? post.status;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // need to add meta update logic here if needed
    post.tags = tags;

    post = await this.postsRepository.save(post);
    return post;
  }

  /** return all posts */
  public async findAll() {
    const posts = await this.postsRepository.find({
      relations: {
        author: true,
      },
    });
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
