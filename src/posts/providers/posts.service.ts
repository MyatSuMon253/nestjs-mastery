import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create.post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    /** inject posts repository */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    let author = await this.usersService.findByUserId(createPostDto.authorId);
    if (!author) {
      throw new Error('Author not found');
    }

    let post = this.postsRepository.create({
      ...createPostDto,
      author,
    });
    post = await this.postsRepository.save(post);
    return post;
  }

  /** return all posts */
  public async findAll() {
    const posts = await this.postsRepository.find();
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
