import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { PostStatus } from '../enums/postStatus.enum';

export class CreatePostDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug must be all small letters and users only '-' and without space",
  })
  slug!: string;

  @IsEnum(PostStatus)
  @IsNotEmpty()
  status!: PostStatus;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsUrl()
  @IsOptional()
  featureImgUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishOn?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  tags?: string[];
}
