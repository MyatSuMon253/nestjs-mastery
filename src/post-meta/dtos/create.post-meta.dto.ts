import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostMetaDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @MaxLength(256)
  readTime!: string;
}
