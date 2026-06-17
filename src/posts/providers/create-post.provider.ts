import { ConflictException, Injectable } from '@nestjs/common';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserData } from 'src/auth/interfaces/user-data.interface';
import { CreatePostDto } from '../dtos/create.post.dto';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,

    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto, user: UserData) {
    let author;
    let tags: undefined | Tag[];

    try {
      author = await this.usersService.findByUserId(user.sub);

      tags = await this.tagsService.findMultiTags(createPostDto.tags!);
    } catch (error) {
      throw new ConflictException(error);
    }

    let post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: "Check post's slug is unique",
      });
    }
  }
}
