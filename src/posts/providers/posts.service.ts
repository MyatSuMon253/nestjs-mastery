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
    let post = this.postsRepository.create(createPostDto);
    post = await this.postsRepository.save(post);
    return post;
  }

  /** return all posts */
  public async findAll() {
    const posts = await this.postsRepository.find();
    return posts;
  }

  /** return all posts by user id */
  public findAllByUserId(userId: string) {
    const user = this.usersService.findByUserId(userId);

    return [
      { title: 'Title 1', content: 'Content 1', user },
      { title: 'Title 2', content: 'Content 2', user },
    ];
  }
}
