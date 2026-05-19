import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dtos/create.tag.dto';

@Injectable()
export class TagsService {
  constructor(
    /** Inject tagsRepository */
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>, // Replace 'any' with the actual type of your repository
  ) {}

  public async create(createTagDto: CreateTagDto) {
    let tag = await this.tagsRepository.create(createTagDto);
    tag = await this.tagsRepository.save(tag);
    return tag;
  }

  public async findMultiTags(tagIds: number[]) {
    const tags = await this.tagsRepository.find({
      where: {
        id: In(tagIds),
      },
    });
    return tags;
  }
}
