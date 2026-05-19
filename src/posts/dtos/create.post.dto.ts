import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostStatus } from '../enums/postStatus.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreatePostMetaDto } from 'src/post-meta/dtos/create.post-meta.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'This is the title of blog post',
    example: 'Test title',
  })
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'This is the slug of blog post',
    example: 'test-title-1',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug must be all small letters and users only '-' and without space",
  })
  slug!: string;

  @ApiProperty({
    description: 'Values must be enum type',
    enum: PostStatus,
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status!: PostStatus;

  @ApiProperty({
    description: 'This is the content of blog post',
    example: 'Test post content',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({
    description: 'This is the feature image of blog post',
    example: 'https://codehubmm.com/imges/logo.png',
  })
  @IsUrl()
  @IsOptional()
  featureImgUrl?: string;

  @ApiPropertyOptional({
    description: 'This is the date of blog post schedule or published time',
    example: '2026-04-26T14:30:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: string;

  @ApiPropertyOptional({
    description: 'Array of tag ids for blog post',
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  /** Required post meta (eg. readTime) */
  @ApiProperty({
    description: 'Meta options for the post',
    type: CreatePostMetaDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaDto)
  @IsNotEmpty()
  meta!: CreatePostMetaDto;

  /** Required author id for the post */
  @ApiProperty({
    description: 'Author id for the post',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  authorId!: number;
}
